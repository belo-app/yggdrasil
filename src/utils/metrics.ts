import {
  Counter,
  Histogram,
  Meter,
  MetricAttributes,
  MetricOptions,
} from "@opentelemetry/api";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import memoize from "memoizee";
import os from "os";

import { environment } from "./environment";

class PrometheusMetricService {
  private meter?: Meter;
  private metrics: any = {};

  constructor() {
    const meterProvider = !environment.LOCAL ? new MeterProvider() : undefined;

    meterProvider?.addMetricReader(
      new PrometheusExporter({
        port: 9464,
      })
    );

    this.meter = meterProvider?.getMeter("prometheus");
  }

  public getMeter() {
    return this.meter;
  }

  public getEnvironmentAttributes = memoize((attributes?: MetricAttributes) => {
    return {
      hostname: os.hostname(),
      environment: environment.DOPPLER_ENVIRONMENT,
      ...attributes,
    };
  });

  public getOrCreateCounter(
    name: string,
    options?: MetricOptions
  ): Counter | undefined {
    if (this.metrics[name]) {
      return this.metrics[name];
    }

    if (!this.meter) {
      return;
    }

    const counter = this.meter?.createCounter(name, options);

    this.metrics[name] = {
      ...Object.assign({}, counter),
      add: (value: number, attributes?: MetricAttributes) =>
        counter.add(value, this.getEnvironmentAttributes(attributes)),
    };

    return this.metrics[name];
  }

  public getOrCreateHistogram(
    name: string,
    options?: MetricOptions
  ): Histogram | undefined {
    if (this.metrics[name]) {
      return this.metrics[name];
    }

    if (!this.meter) {
      return;
    }

    const histogram = this.meter?.createHistogram(name, options);

    this.metrics[name] = {
      ...Object.assign({}, histogram),
      record: (value: number, attributes?: MetricAttributes) =>
        histogram.record(value, this.getEnvironmentAttributes(attributes)),
    };

    return this.metrics[name];
  }
}

export const prometheusMetricsService = new PrometheusMetricService();
