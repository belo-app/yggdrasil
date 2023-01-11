import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import * as opentelemetry from "@opentelemetry/sdk-node";
import {
  BatchSpanProcessor,
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import { environment, getEnvironment } from "./environment";
import { logger } from "./logger";
import { isBetween } from "./numbers";

export class Opentelemetry {
  private sdk?: opentelemetry.NodeSDK;

  constructor(
    resourceName: string,
    traceExporterUrl: string,
    resourceTracingSampleRate: any
  ) {
    const shouldTrace = !environment.LOCAL && !getEnvironment("DISABLE_TRACE");

    if (!shouldTrace) {
      logger.warn(`Tracing disabled`);
      return;
    }

    const sampleRate = resourceTracingSampleRate[resourceName];

    if (sampleRate && !isBetween(Number(sampleRate), 0, 1)) {
      logger.error(
        `Invalid sample rate for resource ${resourceName}: ${sampleRate}`
      );
      return;
    }

    this.sdk = new opentelemetry.NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: resourceName,
      }),
      spanProcessor: new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: traceExporterUrl,
        })
      ),
      sampler: new ParentBasedSampler({
        root: new TraceIdRatioBasedSampler(sampleRate ?? 1),
      }),
    });
  }

  public async start() {
    return this.sdk?.start();
  }
}
