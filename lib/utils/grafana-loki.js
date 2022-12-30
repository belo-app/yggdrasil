"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grafanaLoki = void 0;
const axios_1 = __importDefault(require("axios"));
const dayjs_1 = __importDefault(require("dayjs"));
const environment_1 = require("./environment");
class GrafanaLoki {
    constructor(baseUrl, username, password) {
        this.canUse = !environment_1.environment.LOCAL;
        this.handleError = (error) => {
            if (error.response) {
                return console.error(`Attempting to send log to Loki failed with status '${error.response.status}: ${error.response.statusText}' returned reason: ${JSON.stringify(error.response.data)}`);
            }
            if (error.isAxiosError === true) {
                return console.error(`Attempting to send log to Loki failed. Got an axios error, error code: '${error.code}' message: ${error.message}`);
            }
            console.error("Got unknown error when trying to send log to Loki, error output:", error);
        };
        this.pushLogs = async (logs) => {
            if (!this.canUse) {
                return;
            }
            const mappedLogs = logs.map((log) => {
                return {
                    stream: {
                        service: log.service,
                        environment: log.environment,
                        level: log.level,
                        hostname: log.hostname,
                    },
                    values: [
                        [
                            ((0, dayjs_1.default)(log.timestamp).toDate().getTime() * 1000000).toString(),
                            JSON.stringify(log),
                        ],
                    ],
                };
            });
            await this.client
                .post("/loki/api/v1/push", { streams: mappedLogs })
                .catch((error) => this.handleError(error));
        };
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
        this.client = axios_1.default.create({
            baseURL: this.baseUrl,
            auth: {
                username: this.username,
                password: this.password,
            },
        });
    }
}
exports.grafanaLoki = new GrafanaLoki(environment_1.environment.LOKI_HOST, environment_1.environment.LOKI_USER, environment_1.environment.LOKI_PASSWORD);
