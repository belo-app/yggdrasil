import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import * as opentelemetry from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import { environment } from "./environment";

class Opentelemetry {
  private sdk?: opentelemetry.NodeSDK;

  constructor(resourceName: string) {
    this.sdk =
      !environment.LOCAL && !environment.DISABLE_TRACE
        ? new opentelemetry.NodeSDK({
            resource: new Resource({
              [SemanticResourceAttributes.SERVICE_NAME]: resourceName,
            }),
            spanProcessor: new BatchSpanProcessor(
              new OTLPTraceExporter({
                url: environment.OTLP_TRACE_EXPORTER_URL,
              })
            ),
          })
        : undefined;
  }

  public async start() {
    return this.sdk?.start();
  }
}

type AsyncFunction<T> = () => Promise<T>;

export async function withTelemetry<T>(
  name: string,
  asyncFunction: AsyncFunction<T>
): Promise<T> {
  const opentelemetry = new Opentelemetry(name);

  return opentelemetry.start().then(() => asyncFunction());
}
