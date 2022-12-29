import { Point } from "@influxdata/influxdb-client";
import axios, { AxiosError, AxiosInstance } from "axios";
import dayjs from "dayjs";
import { cloneDeep, pick } from "lodash";

import { writeInfluxPoint } from "./influx";
import { logger } from "./logger";
import { prometheusMetricsService } from "./metrics";
import { uuid } from "./uuid";

export function to<T, U = Error>(
  promise: Promise<T>
): Promise<[U, undefined] | [undefined, T]> {
  return promise
    .then<[undefined, T]>((data: T) => [undefined, data])
    .catch<[U, undefined]>((error: U) => {
      return [error, undefined];
    });
}

export const logAxiosError = (error: AxiosError<any>): any => {
  logger.error(`axios error ${error?.response?.data?.message ?? ""}`, {
    code: error.code,
    config: {
      ...error.config,
      data:
        typeof error.config?.data === "string"
          ? error.config?.data
          : JSON.stringify(cloneDeep(error.config?.data)),
    },
    response: pick(error.response, ["data", "status", "statusText", "headers"]),
  });
};

export const handleAxiosError = (error: AxiosError<any>): any => {
  logAxiosError(error);

  throw error;
};

export const setupAxios = (instance: AxiosInstance) => {
  instance.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  } as any;

  instance.interceptors.request.use(
    (config: any) => {
      config.metadata = { start: dayjs() };
      config.headers["x-belo-request-id"] = uuid();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      try {
        const url = new URL(response.config.url ?? "", response.config.baseURL);
        const elapsed = dayjs().diff(
          (response.config as any).metadata.start,
          "milliseconds"
        );

        writeInfluxPoint(
          new Point("rest_client_response")
            .tag("url", url.toString())
            .tag("status", String(response.status))
            .uintField("elapsed", elapsed)
        );

        prometheusMetricsService
          .getOrCreateHistogram("rest_client_response", {
            unit: "milliseconds",
          })
          ?.record(elapsed, {
            status: response.status,
            url: response.config.baseURL,
          });
      } catch {
        //
      }

      return response;
    },
    (error: AxiosError<any>) => {
      try {
        const url = new URL(
          error.response?.config.url ?? "",
          error.response?.config.baseURL
        );
        const elapsed = dayjs().diff(
          (error.config as any).metadata.start,
          "milliseconds"
        );

        writeInfluxPoint(
          new Point("rest_client_response")
            .tag("url", url.toString())
            .tag("status", String(error.response?.status))
            .uintField("elapsed", elapsed)
        );

        prometheusMetricsService
          .getOrCreateHistogram("rest_client_response", {
            unit: "milliseconds",
          })
          ?.record(elapsed, {
            status: error.response?.status,
            url: error.response?.config.baseURL,
          });
      } catch {
        //
      }

      logAxiosError(error);

      return Promise.reject(error);
    }
  );
};

setupAxios(axios);
