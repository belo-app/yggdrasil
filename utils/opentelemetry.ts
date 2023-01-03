import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import * as opentelemetry from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import { environment } from "./environment";

export class Opentelemetry {
  private sdk?: opentelemetry.NodeSDK;

  constructor(resourceName: string, traceExporterUrl: string) {
    this.sdk = !environment.LOCAL
      ? new opentelemetry.NodeSDK({
          resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: resourceName,
          }),
          spanProcessor: new BatchSpanProcessor(
            new OTLPTraceExporter({
              url: traceExporterUrl,
            })
          ),
        })
      : undefined;
  }

  public async start() {
    return this.sdk?.start();
  }
}
