"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinoLogger = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const batch_queue_1 = require("../batch-queue");
const environment_1 = require("../environment");
const logger_1 = require("./logger");
class PinoLogger extends logger_1.Logger {
    constructor() {
        super();
        this.EVENT = "LOG_EVENT";
        this.queue = (0, batch_queue_1.batchQueue)((logs) => {
            this.emitter.emit(this.EVENT, logs);
        });
        const streams = [
            environment_1.environment.LOCAL ? { stream: (0, pino_pretty_1.default)({}) } : { stream: process.stdout },
            {
                stream: {
                    write: (message) => {
                        const payload = JSON.parse(message);
                        const metadata = (0, lodash_1.omit)(payload, [
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
                        const log = {
                            level: pino_1.default.levels.labels[payload.level] ?? "",
                            timestamp: (0, dayjs_1.default)(payload.time).toISOString(),
                            hostname: payload.hostname,
                            service: payload.service ?? this.service,
                            environment: payload.environment ?? environment_1.environment.DOPPLER_ENVIRONMENT,
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
        this.instance = (0, pino_1.default)({
            enabled: !environment_1.environment.TEST,
        }, pino_1.default.multistream(streams));
    }
    info(message, data) {
        try {
            const payload = this.getData(data);
            this.instance.info(payload, message);
        }
        catch {
            //
        }
    }
    error(message, data) {
        try {
            const payload = this.getData(data);
            this.instance.error(payload, message);
        }
        catch {
            //
        }
    }
    fatal(message, data) {
        try {
            const payload = this.getData(data);
            this.instance.fatal(payload, message);
        }
        catch {
            //
        }
    }
    warn(message, data) {
        try {
            const payload = this.getData(data);
            this.instance.warn(payload, message);
        }
        catch {
            //
        }
    }
    listenLogs(callback) {
        this.emitter.on(this.EVENT, callback);
    }
}
exports.pinoLogger = new PinoLogger();
