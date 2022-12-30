"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkCTH5JC43js = require('./chunk-CTH5JC43.js');


var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkJHDA7UZFjs = require('./chunk-JHDA7UZF.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/lock.ts
var _ioredis = require('ioredis'); var _ioredis2 = _interopRequireDefault(_ioredis);
var _memoizee = require('memoizee'); var _memoizee2 = _interopRequireDefault(_memoizee);
var _redlock = require('redlock'); var _redlock2 = _interopRequireDefault(_redlock);
var getRedis = _memoizee2.default.call(void 0, () => {
  return new (0, _ioredis2.default)(_chunk2RIL52B7js.environment.REDIS_URL, {
    enableOfflineQueue: false
  });
});
var Lock = class {
  constructor(key, options) {
    this.key = key;
    const redis = getRedis();
    this.redlock = new (0, _redlock2.default)([
      redis
    ], {
      driftFactor: 0.01,
      retryCount: _nullishCoalesce(_optionalChain([options, 'optionalAccess', _ => _.retryLimit]), () => ( 20)),
      retryDelay: _nullishCoalesce(_optionalChain([options, 'optionalAccess', _2 => _2.retryInterval]), () => ( 500)),
      retryJitter: 100,
      automaticExtensionThreshold: 500
    });
    this.acquireDuration = _nullishCoalesce(_optionalChain([options, 'optionalAccess', _3 => _3.acquireDuration]), () => ( 5e4));
  }
  async isFree() {
    try {
      await this.redlock.using(this.keys, 1e3, {
        retryCount: 0
      }, () => Promise.resolve());
    } catch (e) {
      return false;
    }
    return true;
  }
  async acquire(asyncFunction, throwError = false) {
    let lock;
    try {
      lock = await this.redlock.acquire(this.keys, this.acquireDuration);
    } catch (error) {
      _chunkCTH5JC43js.logger.error(`Could not acquire lock ${this.key}`, {
        error,
        key: this.key
      });
      if (throwError) {
        throw _chunkJHDA7UZFjs.Errors.lockCouldNotAcquireKeys("Could not acquire keys", {
          keys: this.key,
          error
        });
      }
    }
    return asyncFunction().finally(() => _optionalChain([lock, 'optionalAccess', _4 => _4.release, 'call', _5 => _5(), 'access', _6 => _6.catch, 'call', _7 => _7((error) => _chunkCTH5JC43js.logger.error(`Could not release lock for key ${this.key}`, {
      error,
      key: this.key
    }))]));
  }
  get keys() {
    return Array.isArray(this.key) ? this.key : [
      this.key
    ];
  }
};
_chunkTUYBEZEZjs.__name.call(void 0, Lock, "Lock");



exports.Lock = Lock;
//# sourceMappingURL=chunk-ZAAT56CB.js.map