"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkJKO3S2VDjs = require('./chunk-JKO3S2VD.js');


var _chunkBF66JPXHjs = require('./chunk-BF66JPXH.js');


var _chunkQYJIZV3Gjs = require('./chunk-QYJIZV3G.js');


var _chunkCTH5JC43js = require('./chunk-CTH5JC43.js');


var _chunkDQSECEBNjs = require('./chunk-DQSECEBN.js');



var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/async.ts
var import_lodash = _chunkTUYBEZEZjs.__toESM.call(void 0, _chunkDQSECEBNjs.require_lodash.call(void 0, ));
var _influxdbclient = require('@influxdata/influxdb-client');
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
function to(promise) {
  return promise.then((data) => [
    void 0,
    data
  ]).catch((error) => {
    return [
      error,
      void 0
    ];
  });
}
_chunkTUYBEZEZjs.__name.call(void 0, to, "to");
var logAxiosError = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (error) => {
  _chunkCTH5JC43js.logger.error(`axios error ${_nullishCoalesce(_optionalChain([error, 'optionalAccess', _ => _.response, 'optionalAccess', _2 => _2.data, 'optionalAccess', _3 => _3.message]), () => ( ""))}`, {
    code: error.code,
    config: {
      ...error.config,
      data: typeof _optionalChain([error, 'access', _4 => _4.config, 'optionalAccess', _5 => _5.data]) === "string" ? _optionalChain([error, 'access', _6 => _6.config, 'optionalAccess', _7 => _7.data]) : JSON.stringify((0, import_lodash.cloneDeep)(_optionalChain([error, 'access', _8 => _8.config, 'optionalAccess', _9 => _9.data])))
    },
    response: (0, import_lodash.pick)(error.response, [
      "data",
      "status",
      "statusText",
      "headers"
    ])
  });
}, "logAxiosError");
var handleAxiosError = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (error) => {
  logAxiosError(error);
  throw error;
}, "handleAxiosError");
var setupAxios = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (instance) => {
  instance.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0"
  };
  instance.interceptors.request.use((config) => {
    config.metadata = {
      start: _dayjs2.default.call(void 0, )
    };
    config.headers["x-belo-request-id"] = _chunkJKO3S2VDjs.uuid.call(void 0, );
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  instance.interceptors.response.use((response) => {
    try {
      const url = new URL(_nullishCoalesce(response.config.url, () => ( "")), response.config.baseURL);
      const elapsed = _dayjs2.default.call(void 0, ).diff(response.config.metadata.start, "milliseconds");
      _chunkQYJIZV3Gjs.writeInfluxPoint.call(void 0, new (0, _influxdbclient.Point)("rest_client_response").tag("url", url.toString()).tag("status", String(response.status)).uintField("elapsed", elapsed));
      _optionalChain([_chunkBF66JPXHjs.prometheusMetricsService, 'access', _10 => _10.getOrCreateHistogram, 'call', _11 => _11("rest_client_response", {
        unit: "milliseconds"
      }), 'optionalAccess', _12 => _12.record, 'call', _13 => _13(elapsed, {
        status: response.status,
        url: response.config.baseURL
      })]);
    } catch (e) {
    }
    return response;
  }, (error) => {
    try {
      const url = new URL(_nullishCoalesce(_optionalChain([error, 'access', _14 => _14.response, 'optionalAccess', _15 => _15.config, 'access', _16 => _16.url]), () => ( "")), _optionalChain([error, 'access', _17 => _17.response, 'optionalAccess', _18 => _18.config, 'access', _19 => _19.baseURL]));
      const elapsed = _dayjs2.default.call(void 0, ).diff(error.config.metadata.start, "milliseconds");
      _chunkQYJIZV3Gjs.writeInfluxPoint.call(void 0, new (0, _influxdbclient.Point)("rest_client_response").tag("url", url.toString()).tag("status", String(_optionalChain([error, 'access', _20 => _20.response, 'optionalAccess', _21 => _21.status]))).uintField("elapsed", elapsed));
      _optionalChain([_chunkBF66JPXHjs.prometheusMetricsService, 'access', _22 => _22.getOrCreateHistogram, 'call', _23 => _23("rest_client_response", {
        unit: "milliseconds"
      }), 'optionalAccess', _24 => _24.record, 'call', _25 => _25(elapsed, {
        status: _optionalChain([error, 'access', _26 => _26.response, 'optionalAccess', _27 => _27.status]),
        url: _optionalChain([error, 'access', _28 => _28.response, 'optionalAccess', _29 => _29.config, 'access', _30 => _30.baseURL])
      })]);
    } catch (e2) {
    }
    logAxiosError(error);
    return Promise.reject(error);
  });
}, "setupAxios");
setupAxios(_axios2.default);






exports.to = to; exports.logAxiosError = logAxiosError; exports.handleAxiosError = handleAxiosError; exports.setupAxios = setupAxios;
//# sourceMappingURL=chunk-LBLTYMB4.js.map