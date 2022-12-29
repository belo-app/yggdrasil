import { InfluxDB, Point } from "@influxdata/influxdb-client";
import dayjs from "dayjs";
import memoize from "memoizee";
import os from "os";

import { batchQueue } from "./batch-queue";
import { environment } from "./environment";

const org = "belo";
const bucket = "belo";

const getInfluxWriteApi = memoize(() => {
  const client = new InfluxDB({
    url: "https://us-east-1-1.aws.cloud2.influxdata.com",
    token: environment.INFLUX_TOKEN,
  });

  const writeApi = client.getWriteApi(org, bucket);

  writeApi.useDefaultTags({
    host: os.hostname(),
    release: environment.GIT_SHA,
    service: "core",
  });

  return writeApi;
});

const influxQueue = batchQueue<Point>((points) => {
  getInfluxWriteApi().writePoints(points);

  getInfluxWriteApi()
    .flush()
    .catch(() => void 0);
});

export const writeInfluxPoint = (point: Point) => {
  if (environment.LOCAL) {
    return;
  }

  const random = Math.random();

  if (random < 0.2) {
    return;
  }

  influxQueue.add(point);
};

export const trackTime = (
  metric: string,
  tags: Record<string, string> = {}
) => {
  const start = dayjs();

  return () => {
    const elapsed = dayjs().diff(start, "milliseconds");
    let point = new Point(metric).uintField("elapsed", elapsed);

    for (const [key, value] of Object.entries(tags)) {
      if (key && value) {
        point = point.tag(key, value);
      }
    }

    writeInfluxPoint(point);
  };
};

export type InstrumentDecorator = (
  metric: string,
  data?: Record<string, string>
) => MethodDecorator;

export const instrument: InstrumentDecorator =
  (metric, data = {}) =>
  <T>(target, key, descriptor) => {
    const originalMethod = descriptor?.value ?? target[key];

    const handler = function (...parameters: any[]) {
      const endTrackTime = trackTime(metric, data);

      const result = originalMethod.apply(target, parameters) as Promise<T>;
      const isPromise = typeof result.then === "function";

      if (isPromise) {
        return result.finally(endTrackTime);
      }

      endTrackTime();

      return result;
    };

    if (descriptor.value) {
      descriptor.value = handler;

      return descriptor;
    }

    target[key] = handler;
  };
