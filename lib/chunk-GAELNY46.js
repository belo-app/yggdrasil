"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkJDYVEJVIjs = require('./chunk-JDYVEJVI.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/cache.ts
var Cache = (_class = class {
  __init() {this.client = new (0, _chunkJDYVEJVIjs.RedisClient)("mock")}
  constructor(prefix = "") {;_class.prototype.__init.call(this);
    this.prefix = prefix;
  }
  getKey(key) {
    return `${this.prefix}-${key}`;
  }
  async set(key, value, options) {
    try {
      const cacheKey = this.getKey(key);
      return await this.client.set(cacheKey, JSON.stringify(value), _optionalChain([options, 'optionalAccess', _ => _.maxAge]));
    } catch (e) {
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
    } catch (e2) {
    }
  }
  async has(key) {
    try {
      const cacheKey = this.getKey(key);
      const value = await this.client.get(cacheKey);
      return !!value;
    } catch (e3) {
      return false;
    }
  }
  delete(key) {
    const cacheKey = Array.isArray(key) ? key.map((item) => this.getKey(item)) : this.getKey(key);
    return this.client.delete(cacheKey);
  }
  async decrementUntil(key, value = 0) {
    const cacheKey = this.getKey(key);
    return this.client.decrementUntil(cacheKey, value);
  }
}, _class);
_chunkTUYBEZEZjs.__name.call(void 0, Cache, "Cache");



exports.Cache = Cache;
//# sourceMappingURL=chunk-GAELNY46.js.map