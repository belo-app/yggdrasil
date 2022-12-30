"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkCTH5JC43js = require('./chunk-CTH5JC43.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/cron.ts
var _cron = require('cron');
var CronManager = (_class = class {constructor() { _class.prototype.__init.call(this); }
  __init() {this.jobs = {}}
  get(key) {
    return this.jobs[key];
  }
  exists(key) {
    return !!this.jobs[key];
  }
  add({ key, options }) {
    this.jobs[key] = new (0, _cron.CronJob)(options);
  }
  addMany(data) {
    for (const cronData of data) {
      this.add(cronData);
    }
  }
  delete(key) {
    if (this.exists(key)) {
      delete this.jobs[key];
    }
  }
  updateJobTime(key, cronTime) {
    try {
      const time = new (0, _cron.CronTime)(cronTime);
      _optionalChain([this, 'access', _ => _.jobs, 'access', _2 => _2[key], 'optionalAccess', _3 => _3.setTime, 'call', _4 => _4(time)]);
      return true;
    } catch (error) {
      _chunkCTH5JC43js.logger.error(`Could not update job time: ${key}`, {
        error
      });
    }
    return false;
  }
  start(key) {
    try {
      if (!_optionalChain([this, 'access', _5 => _5.jobs, 'access', _6 => _6[key], 'optionalAccess', _7 => _7.running])) {
        _optionalChain([this, 'access', _8 => _8.jobs, 'access', _9 => _9[key], 'optionalAccess', _10 => _10.start, 'call', _11 => _11()]);
      }
      return true;
    } catch (error) {
      _chunkCTH5JC43js.logger.fatal(`Cron job ${key} failed to start`, {
        error
      });
    }
    return false;
  }
  stop(key) {
    try {
      if (_optionalChain([this, 'access', _12 => _12.jobs, 'access', _13 => _13[key], 'optionalAccess', _14 => _14.running])) {
        _optionalChain([this, 'access', _15 => _15.jobs, 'access', _16 => _16[key], 'optionalAccess', _17 => _17.stop, 'call', _18 => _18()]);
      }
      return true;
    } catch (error) {
      _chunkCTH5JC43js.logger.fatal(`Cron job ${key} failed to stop`, {
        error
      });
    }
    return false;
  }
  startMany(keys) {
    return keys.map((key) => this.start(key));
  }
  stopMany(keys) {
    return keys.map((key) => this.stop(key));
  }
}, _class);
_chunkTUYBEZEZjs.__name.call(void 0, CronManager, "CronManager");



exports.CronManager = CronManager;
//# sourceMappingURL=chunk-BVCFZ4GC.js.map