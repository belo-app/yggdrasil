"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkQZ6BCM35js = require('./chunk-QZ6BCM35.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/influx.ts
var _influxdbclient = require('@influxdata/influxdb-client');
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var _memoizee = require('memoizee'); var _memoizee2 = _interopRequireDefault(_memoizee);
var _os = require('os'); var _os2 = _interopRequireDefault(_os);
var org = "belo";
var bucket = "belo";
var getInfluxWriteApi = _memoizee2.default.call(void 0, () => {
  const client = new (0, _influxdbclient.InfluxDB)({
    url: "https://us-east-1-1.aws.cloud2.influxdata.com",
    token: _chunk2RIL52B7js.environment.INFLUX_TOKEN
  });
  const writeApi = client.getWriteApi(org, bucket);
  writeApi.useDefaultTags({
    host: _os2.default.hostname(),
    release: _chunk2RIL52B7js.environment.GIT_SHA,
    service: "core"
  });
  return writeApi;
});
var influxQueue = _chunkQZ6BCM35js.batchQueue.call(void 0, (points) => {
  getInfluxWriteApi().writePoints(points);
  getInfluxWriteApi().flush().catch(() => void 0);
});
var writeInfluxPoint = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (point) => {
  if (_chunk2RIL52B7js.environment.LOCAL) {
    return;
  }
  const random = Math.random();
  if (random < 0.2) {
    return;
  }
  influxQueue.add(point);
}, "writeInfluxPoint");
var trackTime = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (metric, tags = {}) => {
  const start = _dayjs2.default.call(void 0, );
  return () => {
    const elapsed = _dayjs2.default.call(void 0, ).diff(start, "milliseconds");
    let point = new (0, _influxdbclient.Point)(metric).uintField("elapsed", elapsed);
    for (const [key, value] of Object.entries(tags)) {
      if (key && value) {
        point = point.tag(key, value);
      }
    }
    writeInfluxPoint(point);
  };
}, "trackTime");
var instrument = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (metric, data = {}) => (target, key, descriptor) => {
  const originalMethod = _nullishCoalesce(_optionalChain([descriptor, 'optionalAccess', _ => _.value]), () => ( target[key]));
  const handler = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, function(...parameters) {
    const endTrackTime = trackTime(metric, data);
    const result = originalMethod.apply(target, parameters);
    const isPromise = typeof result.then === "function";
    if (isPromise) {
      return result.finally(endTrackTime);
    }
    endTrackTime();
    return result;
  }, "handler");
  if (descriptor.value) {
    descriptor.value = handler;
    return descriptor;
  }
  target[key] = handler;
}, "instrument");





exports.writeInfluxPoint = writeInfluxPoint; exports.trackTime = trackTime; exports.instrument = instrument;
//# sourceMappingURL=chunk-QYJIZV3G.js.map