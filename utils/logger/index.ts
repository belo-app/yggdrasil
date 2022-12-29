import { Handler, Request, Response } from "express";
import { omit, pick } from "lodash";

import { bigQuery } from "../../utils copy/src/bigquery";
import { grafanaLoki } from "../../utils copy/src/grafana-loki";
import { pinoLogger } from "./pino";

export const logger = pinoLogger;

logger.listenLogs((logs) => {
  void grafanaLoki.pushLogs(logs).catch(() => void 0);

  void bigQuery
    .get()
    ?.dataset("applogs")
    .table("prodlogs")
    .insert(
      logs.map((log) => omit(log, ["trace_id", "span_id", "trace_flags"]))
    )
    .catch(() => void 0);
});

export function getRequestLog(request: Request, response: Response) {
  const data: Record<string, any> = pick(request, [
    "method",
    "url",
    "headers",
    "body",
    "params",
    "ip",
  ]);

  data.queryParams = request.query;
  data.applicationName = (request as any)?.user?.username;
  data.userId = data.applicationName ? "" : (request as any)?.user?.id;
  data.status = response.statusCode;

  return data;
}

export function loggerMiddleware(): Handler {
  return (request, response, next) => {
    const invalidUrl = ["/graphql"].includes(request.originalUrl);

    if (invalidUrl) {
      return next();
    }

    const message = `${request.method} ${request.originalUrl}`;
    const log = getRequestLog(request, response);

    logger.info(message, log);

    return next();
  };
}
