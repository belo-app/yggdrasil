"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.getRequestLog = exports.logger = void 0;
const lodash_1 = require("lodash");
const bigquery_1 = require("../bigquery");
const grafana_loki_1 = require("../grafana-loki");
const pino_1 = require("./pino");
exports.logger = pino_1.pinoLogger;
exports.logger.listenLogs((logs) => {
    void grafana_loki_1.grafanaLoki.pushLogs(logs).catch(() => void 0);
    void bigquery_1.bigQuery
        .get()
        ?.dataset("applogs")
        .table("prodlogs")
        .insert(logs.map((log) => (0, lodash_1.omit)(log, ["trace_id", "span_id", "trace_flags"])))
        .catch(() => void 0);
});
function getRequestLog(request, response) {
    const data = (0, lodash_1.pick)(request, [
        "method",
        "url",
        "headers",
        "body",
        "params",
        "ip",
    ]);
    data.queryParams = request.query;
    data.applicationName = request?.user?.username;
    data.userId = data.applicationName ? "" : request?.user?.id;
    data.status = response.statusCode;
    return data;
}
exports.getRequestLog = getRequestLog;
function loggerMiddleware() {
    return (request, response, next) => {
        const invalidUrl = ["/graphql"].includes(request.originalUrl);
        if (invalidUrl) {
            return next();
        }
        const message = `${request.method} ${request.originalUrl}`;
        const log = getRequestLog(request, response);
        exports.logger.info(message, log);
        return next();
    };
}
exports.loggerMiddleware = loggerMiddleware;
