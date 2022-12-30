"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkDQSECEBNjs = require('./chunk-DQSECEBN.js');


var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');



var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/logger/logger.ts
var import_lodash = _chunkTUYBEZEZjs.__toESM.call(void 0, _chunkDQSECEBNjs.require_lodash.call(void 0, ));
var _events = require('events'); var _events2 = _interopRequireDefault(_events);
var _redactsecrets = require('redact-secrets'); var _redactsecrets2 = _interopRequireDefault(_redactsecrets);
var redact = _redactsecrets2.default.call(void 0, "<***>");
var Logger = (_class = class {
  __init() {this.emitter = new (0, _events2.default)()}
  __init2() {this.service = ""}
  __init3() {this.release = _chunk2RIL52B7js.environment.GIT_SHA}
  __init4() {this.environment = _chunk2RIL52B7js.environment.DOPPLER_ENVIRONMENT}
  constructor() {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);
    process.on("uncaughtException", (error) => {
      this.fatal("uncaught exception: ", error);
    });
    process.on("unhandledRejection", (error) => {
      this.fatal("unhandled rejection: ", error);
    });
  }
  __init5() {this.setService = (service) => {
    this.service = service;
  }}
  getData(data = {}) {
    const safeData = (0, import_lodash.cloneDeep)(typeof data === "string" ? {
      message: data
    } : data);
    const message = _nullishCoalesce(_optionalChain([data, 'optionalAccess', _ => _.message]), () => ( ""));
    safeData.service = this.service;
    safeData.release = this.release;
    safeData.environment = this.environment;
    safeData.stack = _optionalChain([data, 'optionalAccess', _2 => _2.stack]);
    safeData.message = typeof message === "string" ? message : JSON.stringify(message);
    try {
      return (0, import_lodash.pickBy)(redact.map(safeData), (value) => !!value);
    } catch (e) {
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
}, _class);
_chunkTUYBEZEZjs.__name.call(void 0, Logger, "Logger");



exports.Logger = Logger;
//# sourceMappingURL=chunk-5Y74JCVK.js.map