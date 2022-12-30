"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// node_modules/ms/index.js
var require_ms = _chunkTUYBEZEZjs.__commonJS.call(void 0, {
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    _chunkTUYBEZEZjs.__name.call(void 0, parse, "parse");
    function fmtShort(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return Math.round(ms2 / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms2 / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms2 / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms2 / s) + "s";
      }
      return ms2 + "ms";
    }
    _chunkTUYBEZEZjs.__name.call(void 0, fmtShort, "fmtShort");
    function fmtLong(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return plural(ms2, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms2, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms2, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms2, msAbs, s, "second");
      }
      return ms2 + " ms";
    }
    _chunkTUYBEZEZjs.__name.call(void 0, fmtLong, "fmtLong");
    function plural(ms2, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
    }
    _chunkTUYBEZEZjs.__name.call(void 0, plural, "plural");
  }
});

// src/service/routes/rate-limit.ts
var import_ms = _chunkTUYBEZEZjs.__toESM.call(void 0, require_ms());
var rateLimitGlobal = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (redis) => ({
  max: (request) => request.user ? 10 : 50,
  keyGenerator: (request) => {
    const userId = _nullishCoalesce(_nullishCoalesce(_optionalChain([request, 'optionalAccess', _ => _.user, 'optionalAccess', _2 => _2.id]), () => ( _optionalChain([request, 'optionalAccess', _3 => _3.user, 'optionalAccess', _4 => _4.email]))), () => ( _optionalChain([request, 'optionalAccess', _5 => _5.user, 'optionalAccess', _6 => _6.sub])));
    return userId ? `user-${userId}` : `ip-${request.ip}`;
  },
  timeWindow: (0, import_ms.default)("1 second"),
  redis
}), "rateLimitGlobal");
var rateLimitToVerifyPin = {
  max: 1,
  keyGenerator: (request) => {
    const userId = _optionalChain([request, 'optionalAccess', _7 => _7.user, 'optionalAccess', _8 => _8.id]);
    return `user-auth-${userId}`;
  },
  timeWindow: (0, import_ms.default)("1 second")
};
var rateLimitTo404 = {
  max: 1,
  keyGenerator: (request) => `404-ip-${request.ip}`,
  timeWindow: (0, import_ms.default)("1 second")
};





exports.rateLimitGlobal = rateLimitGlobal; exports.rateLimitToVerifyPin = rateLimitToVerifyPin; exports.rateLimitTo404 = rateLimitTo404;
//# sourceMappingURL=chunk-T6ADDANQ.js.map