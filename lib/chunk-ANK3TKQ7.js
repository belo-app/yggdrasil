"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/lambda.ts
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);
var _https = require('https'); var _https2 = _interopRequireDefault(_https);
var lambda = new _awssdk2.default.Lambda({
  apiVersion: "2015-03-31",
  httpOptions: {
    agent: new _https2.default.Agent({
      keepAlive: true,
      maxSockets: 1024
    })
  }
});
var invoke = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (parameters) => {
  return new Promise((resolve, reject) => {
    lambda.invoke(parameters, function(error, data) {
      if (error) {
        return reject(error);
      }
      try {
        const result = JSON.parse(_optionalChain([data, 'optionalAccess', _ => _.Payload]));
        resolve(result);
      } catch (e) {
        resolve(_optionalChain([data, 'optionalAccess', _2 => _2.Payload]));
      }
    });
  });
}, "invoke");



exports.invoke = invoke;
//# sourceMappingURL=chunk-ANK3TKQ7.js.map