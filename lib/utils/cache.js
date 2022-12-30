"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const redis_client_1 = require("./redis-client");
class Cache {
    constructor(prefix = "") {
        this.client = new redis_client_1.RedisClient("mock");
        this.prefix = prefix;
    }
    getKey(key) {
        return `${this.prefix}-${key}`;
    }
    async set(key, value, options) {
        try {
            const cacheKey = this.getKey(key);
            return await this.client.set(cacheKey, JSON.stringify(value), options?.maxAge);
        }
        catch {
            //
        }
    }
    async get(key) {
        try {
            const cacheKey = this.getKey(key);
            const value = await this.client.get(cacheKey);
            if (!value) {
                return;
            }
            return JSON.parse(value);
        }
        catch {
            //
        }
    }
    async has(key) {
        try {
            const cacheKey = this.getKey(key);
            const value = await this.client.get(cacheKey);
            return !!value;
        }
        catch {
            return false;
        }
    }
    delete(key) {
        const cacheKey = Array.isArray(key)
            ? key.map((item) => this.getKey(item))
            : this.getKey(key);
        return this.client.delete(cacheKey);
    }
    async decrementUntil(key, value = 0) {
        const cacheKey = this.getKey(key);
        return this.client.decrementUntil(cacheKey, value);
    }
}
exports.Cache = Cache;
