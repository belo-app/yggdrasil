import http from "http";
import memoize from "memoizee";
import os from "os";
import client, { Histogram, HistogramConfiguration } from "prom-client";

import { environment, getEnvironment } from "./environment";
import { logger } from "./logger";

class PrometheusMetricService {
  private client?: any;
  private metrics: any = {};
  private service!: string;
  private canUse = !environment.LOCAL;

  constructor() {
    if (!this.canUse) {
      logger.warn("Metrics are disabled");
      return;
    }
    this.client = client;
  }

  public setUpServer() {
    const server = http.createServer(async (request, response) => {
      if (request.url === "/metrics") {
        response.writeHead(200, {
          "Content-Type": this.client.register.contentType,
        });
        return response.end(await this.client.register.metrics());
      }

      response.writeHead(404);
      return response.end();
    });

    server.listen("9464", () => {
      logger.info(`${this.service} Metrics server listening on port 9464`);
    });
  }

  public setService(service: string, dopplerEnviroment: string) {
    this.service = service;
    this.client?.register.setDefaultLabels(
      this.getEnvironmentAttributes(dopplerEnviroment)
    );

    const shouldCollectDefaultMetrics =
      getEnvironment("COLLECT_DEFAULT_METRICS") === "true";

    if (shouldCollectDefaultMetrics) {
      this.client?.collectDefaultMetrics();
    }

    this.setUpServer();
  }

  public getEnvironmentAttributes = memoize(
    (dopplerEnviroment: string, attributes?: Record<string, string>) => {
      return {
        hostname: os.hostname(),
        environment: dopplerEnviroment,
        service: attributes?.service ?? this.service,
        ...attributes,
      };
    }
  );

  public getOrCreateHistogram(
    name: string,
    options: Omit<HistogramConfiguration<string>, "name">
  ):
    | (Histogram & {
        record: (value: number, attributes: Record<string, any>) => void;
      })
    | undefined {
    if (!this.client) {
      return;
    }

    if (this.metrics[name]) {
      return this.metrics[name];
    }

    const histogram: Histogram = new this.client.Histogram({
      name,
      ...options,
    });

    this.metrics[name] = {
      ...Object.assign({}, histogram),
      record: (value: number, attributes: Record<string, any>) => {
        histogram.observe(attributes, value);
      },
    };

    return this.metrics[name];
  }
}

export const prometheusMetricsService = new PrometheusMetricService();
