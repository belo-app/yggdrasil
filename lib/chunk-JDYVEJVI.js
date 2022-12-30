"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } var _class;

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/redis-client.ts
var _redis = require('redis'); var redis = _interopRequireWildcard(_redis);
var RedisClient = (_class = class {
  __init() {this.hashScripts = {}}
  constructor(url) {;_class.prototype.__init.call(this);
    if (!url) {
      throw new Error("Can't create redis client without url\xB4s");
    }
    this.url = url;
  }
  async instance() {
    if (!this.client) {
      this.client = redis.createClient({
        url: this.url
      });
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
    } catch (e) {
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
    const data = {
      keys: [
        key
      ],
      arguments: [
        String(value)
      ]
    };
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
}, _class);
_chunkTUYBEZEZjs.__name.call(void 0, RedisClient, "RedisClient");
var redisClient = new RedisClient("mock");




exports.RedisClient = RedisClient; exports.redisClient = redisClient;
//# sourceMappingURL=chunk-JDYVEJVI.js.map