"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lock = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const memoizee_1 = __importDefault(require("memoizee"));
const redlock_1 = __importDefault(require("redlock"));
const environment_1 = require("./environment");
const error_1 = require("./error");
const logger_1 = require("./logger");
const getRedis = (0, memoizee_1.default)(() => {
    return new ioredis_1.default(environment_1.environment.REDIS_URL, {
        enableOfflineQueue: false,
    });
});
class Lock {
    constructor(key, options) {
        this.key = key;
        const redis = getRedis();
        this.redlock = new redlock_1.default([redis], {
            driftFactor: 0.01,
            retryCount: options?.retryLimit ?? 20,
            retryDelay: options?.retryInterval ?? 500,
            retryJitter: 100,
            automaticExtensionThreshold: 500,
        });
        this.acquireDuration = options?.acquireDuration ?? 50000;
    }
    async isFree() {
        try {
            await this.redlock.using(this.keys, 1000, { retryCount: 0 }, () => Promise.resolve());
        }
        catch {
            return false;
        }
        return true;
    }
    async acquire(asyncFunction, throwError = false) {
        let lock;
        try {
            lock = await this.redlock.acquire(this.keys, this.acquireDuration);
        }
        catch (error) {
            logger_1.logger.error(`Could not acquire lock ${this.key}`, {
                error,
                key: this.key,
            });
            if (throwError) {
                throw error_1.Errors.lockCouldNotAcquireKeys("Could not acquire keys", {
                    keys: this.key,
                    error,
                });
            }
        }
        return asyncFunction().finally(() => lock?.release().catch((error) => logger_1.logger.error(`Could not release lock for key ${this.key}`, {
            error,
            key: this.key,
        })));
    }
    get keys() {
        return Array.isArray(this.key) ? this.key : [this.key];
    }
}
exports.Lock = Lock;
