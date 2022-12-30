"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAxios = exports.handleAxiosError = exports.logAxiosError = exports.to = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const axios_1 = __importDefault(require("axios"));
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const influx_1 = require("./influx");
const logger_1 = require("./logger");
const metrics_1 = require("./metrics");
const uuid_1 = require("./uuid");
function to(promise) {
    return promise
        .then((data) => [undefined, data])
        .catch((error) => {
        return [error, undefined];
    });
}
exports.to = to;
const logAxiosError = (error) => {
    logger_1.logger.error(`axios error ${error?.response?.data?.message ?? ""}`, {
        code: error.code,
        config: {
            ...error.config,
            data: typeof error.config?.data === "string"
                ? error.config?.data
                : JSON.stringify((0, lodash_1.cloneDeep)(error.config?.data)),
        },
        response: (0, lodash_1.pick)(error.response, ["data", "status", "statusText", "headers"]),
    });
};
exports.logAxiosError = logAxiosError;
const handleAxiosError = (error) => {
    (0, exports.logAxiosError)(error);
    throw error;
};
exports.handleAxiosError = handleAxiosError;
const setupAxios = (instance) => {
    instance.defaults.headers = {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
    };
    instance.interceptors.request.use((config) => {
        config.metadata = { start: (0, dayjs_1.default)() };
        config.headers["x-belo-request-id"] = (0, uuid_1.uuid)();
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    instance.interceptors.response.use((response) => {
        try {
            const url = new URL(response.config.url ?? "", response.config.baseURL);
            const elapsed = (0, dayjs_1.default)().diff(response.config.metadata.start, "milliseconds");
            (0, influx_1.writeInfluxPoint)(new influxdb_client_1.Point("rest_client_response")
                .tag("url", url.toString())
                .tag("status", String(response.status))
                .uintField("elapsed", elapsed));
            metrics_1.prometheusMetricsService
                .getOrCreateHistogram("rest_client_response", {
                unit: "milliseconds",
            })
                ?.record(elapsed, {
                status: response.status,
                url: response.config.baseURL,
            });
        }
        catch {
            //
        }
        return response;
    }, (error) => {
        try {
            const url = new URL(error.response?.config.url ?? "", error.response?.config.baseURL);
            const elapsed = (0, dayjs_1.default)().diff(error.config.metadata.start, "milliseconds");
            (0, influx_1.writeInfluxPoint)(new influxdb_client_1.Point("rest_client_response")
                .tag("url", url.toString())
                .tag("status", String(error.response?.status))
                .uintField("elapsed", elapsed));
            metrics_1.prometheusMetricsService
                .getOrCreateHistogram("rest_client_response", {
                unit: "milliseconds",
            })
                ?.record(elapsed, {
                status: error.response?.status,
                url: error.response?.config.baseURL,
            });
        }
        catch {
            //
        }
        (0, exports.logAxiosError)(error);
        return Promise.reject(error);
    });
};
exports.setupAxios = setupAxios;
(0, exports.setupAxios)(axios_1.default);
