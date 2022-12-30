"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrument = exports.trackTime = exports.writeInfluxPoint = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const dayjs_1 = __importDefault(require("dayjs"));
const memoizee_1 = __importDefault(require("memoizee"));
const os_1 = __importDefault(require("os"));
const batch_queue_1 = require("./batch-queue");
const environment_1 = require("./environment");
const org = "belo";
const bucket = "belo";
const getInfluxWriteApi = (0, memoizee_1.default)(() => {
    const client = new influxdb_client_1.InfluxDB({
        url: "https://us-east-1-1.aws.cloud2.influxdata.com",
        token: environment_1.environment.INFLUX_TOKEN,
    });
    const writeApi = client.getWriteApi(org, bucket);
    writeApi.useDefaultTags({
        host: os_1.default.hostname(),
        release: environment_1.environment.GIT_SHA,
        service: "core",
    });
    return writeApi;
});
const influxQueue = (0, batch_queue_1.batchQueue)((points) => {
    getInfluxWriteApi().writePoints(points);
    getInfluxWriteApi()
        .flush()
        .catch(() => void 0);
});
const writeInfluxPoint = (point) => {
    if (environment_1.environment.LOCAL) {
        return;
    }
    const random = Math.random();
    if (random < 0.2) {
        return;
    }
    influxQueue.add(point);
};
exports.writeInfluxPoint = writeInfluxPoint;
const trackTime = (metric, tags = {}) => {
    const start = (0, dayjs_1.default)();
    return () => {
        const elapsed = (0, dayjs_1.default)().diff(start, "milliseconds");
        let point = new influxdb_client_1.Point(metric).uintField("elapsed", elapsed);
        for (const [key, value] of Object.entries(tags)) {
            if (key && value) {
                point = point.tag(key, value);
            }
        }
        (0, exports.writeInfluxPoint)(point);
    };
};
exports.trackTime = trackTime;
const instrument = (metric, data = {}) => (target, key, descriptor) => {
    const originalMethod = descriptor?.value ?? target[key];
    const handler = function (...parameters) {
        const endTrackTime = (0, exports.trackTime)(metric, data);
        const result = originalMethod.apply(target, parameters);
        const isPromise = typeof result.then === "function";
        if (isPromise) {
            return result.finally(endTrackTime);
        }
        endTrackTime();
        return result;
    };
    if (descriptor.value) {
        descriptor.value = handler;
        return descriptor;
    }
    target[key] = handler;
};
exports.instrument = instrument;
