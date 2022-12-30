"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkEYS4YZCXjs = require('./chunk-EYS4YZCX.js');


var _chunkDQSECEBNjs = require('./chunk-DQSECEBN.js');


var _chunkDAO6HSI2js = require('./chunk-DAO6HSI2.js');


var _chunkZMNV2GWSjs = require('./chunk-ZMNV2GWS.js');



var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/logger/index.ts
var import_lodash = _chunkTUYBEZEZjs.__toESM.call(void 0, _chunkDQSECEBNjs.require_lodash.call(void 0, ));
var logger = _chunkEYS4YZCXjs.pinoLogger;
logger.listenLogs((logs) => {
  void _chunkDAO6HSI2js.grafanaLoki.pushLogs(logs).catch(() => void 0);
  void _optionalChain([_chunkZMNV2GWSjs.bigQuery, 'access', _ => _.get, 'call', _2 => _2(), 'optionalAccess', _3 => _3.dataset, 'call', _4 => _4("applogs"), 'access', _5 => _5.table, 'call', _6 => _6("prodlogs"), 'access', _7 => _7.insert, 'call', _8 => _8(logs.map((log) => (0, import_lodash.omit)(log, [
    "trace_id",
    "span_id",
    "trace_flags"
  ]))), 'access', _9 => _9.catch, 'call', _10 => _10(() => void 0)]);
});
function getRequestLog(request, response) {
  const data = (0, import_lodash.pick)(request, [
    "method",
    "url",
    "headers",
    "body",
    "params",
    "ip"
  ]);
  data.queryParams = request.query;
  data.applicationName = _optionalChain([request, 'optionalAccess', _11 => _11.user, 'optionalAccess', _12 => _12.username]);
  data.userId = data.applicationName ? "" : _optionalChain([request, 'optionalAccess', _13 => _13.user, 'optionalAccess', _14 => _14.id]);
  data.status = response.statusCode;
  return data;
}
_chunkTUYBEZEZjs.__name.call(void 0, getRequestLog, "getRequestLog");
function loggerMiddleware() {
  return (request, response, next) => {
    const invalidUrl = [
      "/graphql"
    ].includes(request.originalUrl);
    if (invalidUrl) {
      return next();
    }
    const message = `${request.method} ${request.originalUrl}`;
    const log = getRequestLog(request, response);
    logger.info(message, log);
    return next();
  };
}
_chunkTUYBEZEZjs.__name.call(void 0, loggerMiddleware, "loggerMiddleware");





exports.logger = logger; exports.getRequestLog = getRequestLog; exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=chunk-CTH5JC43.js.map