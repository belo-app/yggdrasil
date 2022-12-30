"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const events_1 = __importDefault(require("events"));
const lodash_1 = require("lodash");
const redact_secrets_1 = __importDefault(require("redact-secrets"));
const environment_1 = require("../environment");
const redact = (0, redact_secrets_1.default)("<***>");
class Logger {
    constructor() {
        this.emitter = new events_1.default();
        this.service = "";
        this.release = environment_1.environment.GIT_SHA;
        this.environment = environment_1.environment.DOPPLER_ENVIRONMENT;
        this.setService = (service) => {
            this.service = service;
        };
        process.on("uncaughtException", (error) => {
            this.fatal("uncaught exception: ", error);
        });
        process.on("unhandledRejection", (error) => {
            this.fatal("unhandled rejection: ", error);
        });
    }
    getData(data = {}) {
        const safeData = (0, lodash_1.cloneDeep)(typeof data === "string" ? { message: data } : data);
        const message = data?.message ?? "";
        safeData.service = this.service;
        safeData.release = this.release;
        safeData.environment = this.environment;
        safeData.stack = data?.stack;
        safeData.message =
            typeof message === "string" ? message : JSON.stringify(message);
        try {
            // eslint-disable-next-line unicorn/no-array-callback-reference
            return (0, lodash_1.pickBy)(redact.map(safeData), (value) => !!value);
        }
        catch {
            return safeData;
        }
    }
    info(message, data) {
        console.log(message, this.getData(data));
    }
    error(message, data) {
        console.error(message, this.getData(data));
    }
    fatal(message, data) {
        console.error(message, this.getData(data));
    }
    warn(message, data) {
        console.warn(message, this.getData(data));
    }
}
exports.Logger = Logger;
