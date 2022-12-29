import dayjs from "dayjs";
import { omit } from "lodash";
import pino from "pino";
import pretty from "pino-pretty";

import { batchQueue } from "../../utils copy/src/batch-queue";
import { environment } from "../../utils copy/src/environment";
import { Logger } from "./logger";

export interface Log {
  service: string;
  release: string;
  environment: string;
  message: string;
  timestamp: string;
  hostname: string;
  ip: string;
  level: string;
  metadata?: string;
  trace_id?: string;
  span_id?: string;
  trace_flags?: string;
}

class PinoLogger extends Logger {
  private EVENT = "LOG_EVENT";
  private queue = batchQueue<Log>((logs) => {
    this.emitter.emit(this.EVENT, logs);
  });

  public instance;

  constructor() {
    super();

    const streams = [
      environment.LOCAL ? { stream: pretty({}) } : { stream: process.stdout },
      {
        stream: {
          write: (message: string) => {
            const payload = JSON.parse(message);

            const metadata = omit(payload, [
              "level",
              "time",
              "hostname",
              "service",
              "environment",
              "msg",
              "ip",
              "release",
              "pid",
            ]);

            const log: Log = {
              level: pino.levels.labels[payload.level] ?? "",
              timestamp: dayjs(payload.time).toISOString(),
              hostname: payload.hostname,
              service: payload.service ?? this.service,
              environment:
                payload.environment ?? environment.DOPPLER_ENVIRONMENT,
              message: payload.msg,
              ip: payload.ip,
              release: payload.release,
              trace_id: payload.trace_id,
              span_id: payload.span_id,
              trace_flags: payload.trace_flags,
              metadata: metadata ? JSON.stringify(metadata) : undefined,
            };

            this.queue.add(log);
          },
        },
      },
    ].filter((stream) => !!stream.stream);

    this.instance = pino(
      {
        enabled: !environment.TEST,
      },
      pino.multistream(streams)
    );
  }

  public info(message: string, data?: Record<string, any>) {
    try {
      const payload = this.getData(data);

      this.instance.info(payload, message);
    } catch {
      //
    }
  }

  public error(message: string, data?: Record<string, any>) {
    try {
      const payload = this.getData(data);

      this.instance.error(payload, message);
    } catch {
      //
    }
  }

  public fatal(message: string, data?: Record<string, any>) {
    try {
      const payload = this.getData(data);

      this.instance.fatal(payload, message);
    } catch {
      //
    }
  }

  public warn(message: string, data?: Record<string, any>) {
    try {
      const payload = this.getData(data);

      this.instance.warn(payload, message);
    } catch {
      //
    }
  }

  public listenLogs(callback: (logs: Log[]) => void) {
    this.emitter.on(this.EVENT, callback);
  }
}

export const pinoLogger = new PinoLogger();
