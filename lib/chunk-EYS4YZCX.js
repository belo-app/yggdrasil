"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class;

var _chunk5Y74JCVKjs = require('./chunk-5Y74JCVK.js');


var _chunkDQSECEBNjs = require('./chunk-DQSECEBN.js');


var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkQZ6BCM35js = require('./chunk-QZ6BCM35.js');



var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/logger/pino.ts
var import_lodash = _chunkTUYBEZEZjs.__toESM.call(void 0, _chunkDQSECEBNjs.require_lodash.call(void 0, ));
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var _pino = require('pino'); var _pino2 = _interopRequireDefault(_pino);
var _pinopretty = require('pino-pretty'); var _pinopretty2 = _interopRequireDefault(_pinopretty);
var PinoLogger = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0,  (_class =class PinoLogger2 extends _chunk5Y74JCVKjs.Logger {
  __init() {this.EVENT = "LOG_EVENT"}
  __init2() {this.queue = _chunkQZ6BCM35js.batchQueue.call(void 0, (logs) => {
    this.emitter.emit(this.EVENT, logs);
  })}
  constructor() {
    super();_class.prototype.__init.call(this);_class.prototype.__init2.call(this);;
    const streams = [
      _chunk2RIL52B7js.environment.LOCAL ? {
        stream: _pinopretty2.default.call(void 0, {})
      } : {
        stream: process.stdout
      },
      {
        stream: {
          write: (message) => {
            const payload = JSON.parse(message);
            const metadata = (0, import_lodash.omit)(payload, [
              "level",
              "time",
              "hostname",
              "service",
              "environment",
              "msg",
              "ip",
              "release",
              "pid"
            ]);
            const log = {
              level: _nullishCoalesce(_pino2.default.levels.labels[payload.level], () => ( "")),
              timestamp: _dayjs2.default.call(void 0, payload.time).toISOString(),
              hostname: payload.hostname,
              service: _nullishCoalesce(payload.service, () => ( this.service)),
              environment: _nullishCoalesce(payload.environment, () => ( _chunk2RIL52B7js.environment.DOPPLER_ENVIRONMENT)),
              message: payload.msg,
              ip: payload.ip,
              release: payload.release,
              trace_id: payload.trace_id,
              span_id: payload.span_id,
              trace_flags: payload.trace_flags,
              metadata: metadata ? JSON.stringify(metadata) : void 0
            };
            this.queue.add(log);
          }
        }
      }
    ].filter((stream) => !!stream.stream);
    this.instance = _pino2.default.call(void 0, {
      enabled: !_chunk2RIL52B7js.environment.TEST
    }, _pino2.default.multistream(streams));
  }
  info(message, data) {
    try {
      const payload = this.getData(data);
      this.instance.info(payload, message);
    } catch (e) {
    }
  }
  error(message, data) {
    try {
      const payload = this.getData(data);
      this.instance.error(payload, message);
    } catch (e2) {
    }
  }
  fatal(message, data) {
    try {
      const payload = this.getData(data);
      this.instance.fatal(payload, message);
    } catch (e3) {
    }
  }
  warn(message, data) {
    try {
      const payload = this.getData(data);
      this.instance.warn(payload, message);
    } catch (e4) {
    }
  }
  listenLogs(callback) {
    this.emitter.on(this.EVENT, callback);
  }
}, _class), "PinoLogger");
var pinoLogger = new PinoLogger();



exports.pinoLogger = pinoLogger;
//# sourceMappingURL=chunk-EYS4YZCX.js.map