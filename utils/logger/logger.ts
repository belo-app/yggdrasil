import EventEmitter from "events";
import { cloneDeep, pickBy } from "lodash";
import Redact from "redact-secrets";

import { getEnvironment } from "../environment";

export type LoggerFunction = (
  message: string,
  data?: Record<string, any>
) => void;

const redact = Redact("<***>");

export class Logger {
  public emitter = new EventEmitter();

  constructor(
    public release = getEnvironment("LOGGER_RELEASE", ""),
    public environment = getEnvironment("LOGGER_ENVIRONMENT", ""),
    public service = getEnvironment("LOGGER_SERVICE", "")
  ) {
    process.on("uncaughtException", (error) => {
      this.fatal("uncaught exception: ", error);
    });

    process.on("unhandledRejection", (error) => {
      this.fatal("unhandled rejection: ", error as any);
    });
  }

  public setService = (service: string) => {
    this.service = service;
  };

  protected getData(data: Record<string, any> = {}) {
    const safeData = cloneDeep(
      typeof data === "string" ? { message: data } : data
    );
    const message = data?.message ?? "";

    safeData.service = this.service;
    safeData.release = this.release;
    safeData.environment = this.environment;
    safeData.stack = data?.stack;
    safeData.message =
      typeof message === "string" ? message : JSON.stringify(message);

    try {
      // eslint-disable-next-line unicorn/no-array-callback-reference
      return pickBy(redact.map(safeData), (value) => !!value);
    } catch {
      return safeData;
    }
  }

  public info(message: string, data?: Record<string, any>) {
    console.log(message, this.getData(data));
  }

  public error(message: string, data?: Record<string, any>) {
    console.error(message, this.getData(data));
  }

  public fatal(message: string, data?: Record<string, any>) {
    console.error(message, this.getData(data));
  }

  public warn(message: string, data?: Record<string, any>) {
    console.warn(message, this.getData(data));
  }
}
