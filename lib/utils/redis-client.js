"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.RedisClient = void 0;
const redis = __importStar(require("redis"));
/* import { environment } from "./environment"; */
class RedisClient {
    constructor(url) {
        this.hashScripts = {};
        if (!url) {
            throw new Error("Can't create redis client without url´s");
        }
        this.url = url;
    }
    async instance() {
        if (!this.client) {
            this.client = redis.createClient({ url: this.url });
            await this.client.connect();
            return this.client;
        }
        return this.client;
    }
    async set(key, data, ttl) {
        const instance = await this.instance();
        const options = {};
        if (typeof ttl === "number" && !Number.isNaN(ttl)) {
            options["PX"] = ttl;
        }
        try {
            return instance.set(key, data, options);
        }
        catch {
            return false;
        }
    }
    async get(key) {
        const instance = await this.instance();
        return instance.get(key);
    }
    async delete(key) {
        const instance = await this.instance();
        await instance.del(key);
    }
    async decrementUntil(key, value = 0) {
        const instance = await this.instance();
        const script = this.hashScripts[key];
        const data = { keys: [key], arguments: [String(value)] };
        if (script) {
            return instance.evalSha(script, data);
        }
        const hashScript = await instance.scriptLoad(`local value = redis.call('GET', KEYS[1]) or '0'
       if value > '0' then 
       return redis.call('DECR',KEYS[1]) 
       else 
       error('Value lower than ${value}')
       end`);
        this.hashScripts[key] = hashScript;
        return instance.evalSha(hashScript, data);
    }
}
exports.RedisClient = RedisClient;
exports.redisClient = new RedisClient("mock");
