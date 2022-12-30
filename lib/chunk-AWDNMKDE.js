"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/opentelemetry.ts
var _exportertraceotlphttp = require('@opentelemetry/exporter-trace-otlp-http');
var _resources = require('@opentelemetry/resources');
var _sdknode = require('@opentelemetry/sdk-node'); var opentelemetry = _interopRequireWildcard(_sdknode);

// node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
var _api = require('@opentelemetry/api');
var SUPPRESS_TRACING_KEY = _api.createContextKey.call(void 0, "OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function suppressTracing(context2) {
  return context2.setValue(SUPPRESS_TRACING_KEY, true);
}
_chunkTUYBEZEZjs.__name.call(void 0, suppressTracing, "suppressTracing");

// node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js

function loggingErrorHandler() {
  return function(ex) {
    _api.diag.error(stringifyException(ex));
  };
}
_chunkTUYBEZEZjs.__name.call(void 0, loggingErrorHandler, "loggingErrorHandler");
function stringifyException(ex) {
  if (typeof ex === "string") {
    return ex;
  } else {
    return JSON.stringify(flattenException(ex));
  }
}
_chunkTUYBEZEZjs.__name.call(void 0, stringifyException, "stringifyException");
function flattenException(ex) {
  var result = {};
  var current = ex;
  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach(function(propertyName) {
      if (result[propertyName])
        return;
      var value = current[propertyName];
      if (value) {
        result[propertyName] = String(value);
      }
    });
    current = Object.getPrototypeOf(current);
  }
  return result;
}
_chunkTUYBEZEZjs.__name.call(void 0, flattenException, "flattenException");

// node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
var delegateHandler = loggingErrorHandler();
function globalErrorHandler(ex) {
  try {
    delegateHandler(ex);
  } catch (_a) {
  }
}
_chunkTUYBEZEZjs.__name.call(void 0, globalErrorHandler, "globalErrorHandler");

// node_modules/@opentelemetry/core/build/esm/platform/node/environment.js
var _os = require('os'); var os = _interopRequireWildcard(_os);

// node_modules/@opentelemetry/core/build/esm/utils/environment.js


// node_modules/@opentelemetry/core/build/esm/utils/sampling.js
var TracesSamplerValues;
(function(TracesSamplerValues2) {
  TracesSamplerValues2["AlwaysOff"] = "always_off";
  TracesSamplerValues2["AlwaysOn"] = "always_on";
  TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
  TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
  TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
  TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
})(TracesSamplerValues || (TracesSamplerValues = {}));

// node_modules/@opentelemetry/core/build/esm/utils/environment.js
var DEFAULT_LIST_SEPARATOR = ",";
var ENVIRONMENT_NUMBERS_KEYS = [
  "OTEL_BSP_EXPORT_TIMEOUT",
  "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
  "OTEL_BSP_MAX_QUEUE_SIZE",
  "OTEL_BSP_SCHEDULE_DELAY",
  "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
  "OTEL_ATTRIBUTE_COUNT_LIMIT",
  "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
  "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
  "OTEL_SPAN_EVENT_COUNT_LIMIT",
  "OTEL_SPAN_LINK_COUNT_LIMIT",
  "OTEL_EXPORTER_OTLP_TIMEOUT",
  "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
  "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
  "OTEL_EXPORTER_JAEGER_AGENT_PORT"
];
function isEnvVarANumber(key) {
  return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
}
_chunkTUYBEZEZjs.__name.call(void 0, isEnvVarANumber, "isEnvVarANumber");
var ENVIRONMENT_LISTS_KEYS = [
  "OTEL_NO_PATCH_MODULES",
  "OTEL_PROPAGATORS"
];
function isEnvVarAList(key) {
  return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
}
_chunkTUYBEZEZjs.__name.call(void 0, isEnvVarAList, "isEnvVarAList");
var DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
var DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
var DEFAULT_ENVIRONMENT = {
  CONTAINER_NAME: "",
  ECS_CONTAINER_METADATA_URI_V4: "",
  ECS_CONTAINER_METADATA_URI: "",
  HOSTNAME: "",
  KUBERNETES_SERVICE_HOST: "",
  NAMESPACE: "",
  OTEL_BSP_EXPORT_TIMEOUT: 3e4,
  OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
  OTEL_BSP_MAX_QUEUE_SIZE: 2048,
  OTEL_BSP_SCHEDULE_DELAY: 5e3,
  OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
  OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
  OTEL_EXPORTER_JAEGER_ENDPOINT: "",
  OTEL_EXPORTER_JAEGER_PASSWORD: "",
  OTEL_EXPORTER_JAEGER_USER: "",
  OTEL_EXPORTER_OTLP_ENDPOINT: "",
  OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
  OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
  OTEL_EXPORTER_OTLP_HEADERS: "",
  OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
  OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
  OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
  OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
  OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
  OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
  OTEL_LOG_LEVEL: _api.DiagLogLevel.INFO,
  OTEL_NO_PATCH_MODULES: [],
  OTEL_PROPAGATORS: [
    "tracecontext",
    "baggage"
  ],
  OTEL_RESOURCE_ATTRIBUTES: "",
  OTEL_SERVICE_NAME: "",
  OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
  OTEL_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
  OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
  OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
  OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
  OTEL_SPAN_LINK_COUNT_LIMIT: 128,
  OTEL_TRACES_EXPORTER: "otlp",
  OTEL_TRACES_SAMPLER: TracesSamplerValues.ParentBasedAlwaysOn,
  OTEL_TRACES_SAMPLER_ARG: "",
  OTEL_EXPORTER_OTLP_INSECURE: "",
  OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
  OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
  OTEL_EXPORTER_OTLP_CERTIFICATE: "",
  OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
  OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
  OTEL_EXPORTER_OTLP_COMPRESSION: "",
  OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
  OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
  OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
  OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
  OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
  OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
  OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
  OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
  OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
};
function parseNumber(name, environment2, values, min, max) {
  if (min === void 0) {
    min = -Infinity;
  }
  if (max === void 0) {
    max = Infinity;
  }
  if (typeof values[name] !== "undefined") {
    var value = Number(values[name]);
    if (!isNaN(value)) {
      if (value < min) {
        environment2[name] = min;
      } else if (value > max) {
        environment2[name] = max;
      } else {
        environment2[name] = value;
      }
    }
  }
}
_chunkTUYBEZEZjs.__name.call(void 0, parseNumber, "parseNumber");
function parseStringList(name, output, input, separator) {
  if (separator === void 0) {
    separator = DEFAULT_LIST_SEPARATOR;
  }
  var givenValue = input[name];
  if (typeof givenValue === "string") {
    output[name] = givenValue.split(separator).map(function(v) {
      return v.trim();
    });
  }
}
_chunkTUYBEZEZjs.__name.call(void 0, parseStringList, "parseStringList");
var logLevelMap = {
  ALL: _api.DiagLogLevel.ALL,
  VERBOSE: _api.DiagLogLevel.VERBOSE,
  DEBUG: _api.DiagLogLevel.DEBUG,
  INFO: _api.DiagLogLevel.INFO,
  WARN: _api.DiagLogLevel.WARN,
  ERROR: _api.DiagLogLevel.ERROR,
  NONE: _api.DiagLogLevel.NONE
};
function setLogLevelFromEnv(key, environment2, values) {
  var value = values[key];
  if (typeof value === "string") {
    var theLevel = logLevelMap[value.toUpperCase()];
    if (theLevel != null) {
      environment2[key] = theLevel;
    }
  }
}
_chunkTUYBEZEZjs.__name.call(void 0, setLogLevelFromEnv, "setLogLevelFromEnv");
function parseEnvironment(values) {
  var environment2 = {};
  for (var env in DEFAULT_ENVIRONMENT) {
    var key = env;
    switch (key) {
      case "OTEL_LOG_LEVEL":
        setLogLevelFromEnv(key, environment2, values);
        break;
      default:
        if (isEnvVarANumber(key)) {
          parseNumber(key, environment2, values);
        } else if (isEnvVarAList(key)) {
          parseStringList(key, environment2, values);
        } else {
          var value = values[key];
          if (typeof value !== "undefined" && value !== null) {
            environment2[key] = String(value);
          }
        }
    }
  }
  return environment2;
}
_chunkTUYBEZEZjs.__name.call(void 0, parseEnvironment, "parseEnvironment");

// node_modules/@opentelemetry/core/build/esm/platform/node/environment.js
function getEnv() {
  var processEnv = parseEnvironment(process.env);
  return Object.assign({
    HOSTNAME: os.hostname()
  }, DEFAULT_ENVIRONMENT, processEnv);
}
_chunkTUYBEZEZjs.__name.call(void 0, getEnv, "getEnv");

// node_modules/@opentelemetry/core/build/esm/platform/node/timer-util.js
function unrefTimer(timer) {
  timer.unref();
}
_chunkTUYBEZEZjs.__name.call(void 0, unrefTimer, "unrefTimer");

// node_modules/@opentelemetry/core/build/esm/ExportResult.js
var ExportResultCode;
(function(ExportResultCode2) {
  ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
  ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
})(ExportResultCode || (ExportResultCode = {}));

// node_modules/@opentelemetry/core/build/esm/utils/promise.js
var Deferred = function() {
  function Deferred2() {
    var _this = this;
    this._promise = new Promise(function(resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
  }
  _chunkTUYBEZEZjs.__name.call(void 0, Deferred2, "Deferred");
  Object.defineProperty(Deferred2.prototype, "promise", {
    get: function() {
      return this._promise;
    },
    enumerable: false,
    configurable: true
  });
  Deferred2.prototype.resolve = function(val) {
    this._resolve(val);
  };
  Deferred2.prototype.reject = function(err) {
    this._reject(err);
  };
  return Deferred2;
}();

// node_modules/@opentelemetry/core/build/esm/utils/callback.js
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = {
      error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var BindOnceFuture = function() {
  function BindOnceFuture2(_callback, _that) {
    this._callback = _callback;
    this._that = _that;
    this._isCalled = false;
    this._deferred = new Deferred();
  }
  _chunkTUYBEZEZjs.__name.call(void 0, BindOnceFuture2, "BindOnceFuture");
  Object.defineProperty(BindOnceFuture2.prototype, "isCalled", {
    get: function() {
      return this._isCalled;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BindOnceFuture2.prototype, "promise", {
    get: function() {
      return this._deferred.promise;
    },
    enumerable: false,
    configurable: true
  });
  BindOnceFuture2.prototype.call = function() {
    var _a;
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (!this._isCalled) {
      this._isCalled = true;
      try {
        Promise.resolve((_a = this._callback).call.apply(_a, __spreadArray([
          this._that
        ], __read(args), false))).then(function(val) {
          return _this._deferred.resolve(val);
        }, function(err) {
          return _this._deferred.reject(err);
        });
      } catch (err) {
        this._deferred.reject(err);
      }
    }
    return this._deferred.promise;
  };
  return BindOnceFuture2;
}();

// node_modules/@opentelemetry/sdk-trace-base/build/esm/export/BatchSpanProcessorBase.js

var BatchSpanProcessorBase = function() {
  function BatchSpanProcessorBase2(_exporter, config) {
    this._exporter = _exporter;
    this._finishedSpans = [];
    var env = getEnv();
    this._maxExportBatchSize = typeof (config === null || config === void 0 ? void 0 : config.maxExportBatchSize) === "number" ? config.maxExportBatchSize : env.OTEL_BSP_MAX_EXPORT_BATCH_SIZE;
    this._maxQueueSize = typeof (config === null || config === void 0 ? void 0 : config.maxQueueSize) === "number" ? config.maxQueueSize : env.OTEL_BSP_MAX_QUEUE_SIZE;
    this._scheduledDelayMillis = typeof (config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) === "number" ? config.scheduledDelayMillis : env.OTEL_BSP_SCHEDULE_DELAY;
    this._exportTimeoutMillis = typeof (config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) === "number" ? config.exportTimeoutMillis : env.OTEL_BSP_EXPORT_TIMEOUT;
    this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
    if (this._maxExportBatchSize > this._maxQueueSize) {
      _api.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
      this._maxExportBatchSize = this._maxQueueSize;
    }
  }
  _chunkTUYBEZEZjs.__name.call(void 0, BatchSpanProcessorBase2, "BatchSpanProcessorBase");
  BatchSpanProcessorBase2.prototype.forceFlush = function() {
    if (this._shutdownOnce.isCalled) {
      return this._shutdownOnce.promise;
    }
    return this._flushAll();
  };
  BatchSpanProcessorBase2.prototype.onStart = function(_span, _parentContext) {
  };
  BatchSpanProcessorBase2.prototype.onEnd = function(span) {
    if (this._shutdownOnce.isCalled) {
      return;
    }
    if ((span.spanContext().traceFlags & _api.TraceFlags.SAMPLED) === 0) {
      return;
    }
    this._addToBuffer(span);
  };
  BatchSpanProcessorBase2.prototype.shutdown = function() {
    return this._shutdownOnce.call();
  };
  BatchSpanProcessorBase2.prototype._shutdown = function() {
    var _this = this;
    return Promise.resolve().then(function() {
      return _this.onShutdown();
    }).then(function() {
      return _this._flushAll();
    }).then(function() {
      return _this._exporter.shutdown();
    });
  };
  BatchSpanProcessorBase2.prototype._addToBuffer = function(span) {
    if (this._finishedSpans.length >= this._maxQueueSize) {
      return;
    }
    this._finishedSpans.push(span);
    this._maybeStartTimer();
  };
  BatchSpanProcessorBase2.prototype._flushAll = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
      var promises = [];
      var count = Math.ceil(_this._finishedSpans.length / _this._maxExportBatchSize);
      for (var i = 0, j = count; i < j; i++) {
        promises.push(_this._flushOneBatch());
      }
      Promise.all(promises).then(function() {
        resolve();
      }).catch(reject);
    });
  };
  BatchSpanProcessorBase2.prototype._flushOneBatch = function() {
    var _this = this;
    this._clearTimer();
    if (this._finishedSpans.length === 0) {
      return Promise.resolve();
    }
    return new Promise(function(resolve, reject) {
      var timer = setTimeout(function() {
        reject(new Error("Timeout"));
      }, _this._exportTimeoutMillis);
      _api.context.with(suppressTracing(_api.context.active()), function() {
        _this._exporter.export(_this._finishedSpans.splice(0, _this._maxExportBatchSize), function(result) {
          var _a;
          clearTimeout(timer);
          if (result.code === ExportResultCode.SUCCESS) {
            resolve();
          } else {
            reject((_a = result.error) !== null && _a !== void 0 ? _a : new Error("BatchSpanProcessor: span export failed"));
          }
        });
      });
    });
  };
  BatchSpanProcessorBase2.prototype._maybeStartTimer = function() {
    var _this = this;
    if (this._timer !== void 0)
      return;
    this._timer = setTimeout(function() {
      _this._flushOneBatch().then(function() {
        if (_this._finishedSpans.length > 0) {
          _this._clearTimer();
          _this._maybeStartTimer();
        }
      }).catch(function(e) {
        globalErrorHandler(e);
      });
    }, this._scheduledDelayMillis);
    unrefTimer(this._timer);
  };
  BatchSpanProcessorBase2.prototype._clearTimer = function() {
    if (this._timer !== void 0) {
      clearTimeout(this._timer);
      this._timer = void 0;
    }
  };
  return BatchSpanProcessorBase2;
}();

// node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/node/export/BatchSpanProcessor.js
var __extends = function() {
  var extendStatics = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  }, "extendStatics");
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    _chunkTUYBEZEZjs.__name.call(void 0, __, "__");
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var BatchSpanProcessor = function(_super) {
  __extends(BatchSpanProcessor2, _super);
  function BatchSpanProcessor2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  _chunkTUYBEZEZjs.__name.call(void 0, BatchSpanProcessor2, "BatchSpanProcessor");
  BatchSpanProcessor2.prototype.onShutdown = function() {
  };
  return BatchSpanProcessor2;
}(BatchSpanProcessorBase);

// src/utils/opentelemetry.ts
var _semanticconventions = require('@opentelemetry/semantic-conventions');
var Opentelemetry = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, class Opentelemetry2 {
  constructor(resourceName) {
    this.sdk = !_chunk2RIL52B7js.environment.LOCAL && !_chunk2RIL52B7js.environment.DISABLE_TRACE ? new opentelemetry.NodeSDK({
      resource: new (0, _resources.Resource)({
        [_semanticconventions.SemanticResourceAttributes.SERVICE_NAME]: resourceName
      }),
      spanProcessor: new BatchSpanProcessor(new (0, _exportertraceotlphttp.OTLPTraceExporter)({
        url: _chunk2RIL52B7js.environment.OTLP_TRACE_EXPORTER_URL
      }))
    }) : void 0;
  }
  async start() {
    return _optionalChain([this, 'access', _ => _.sdk, 'optionalAccess', _2 => _2.start, 'call', _3 => _3()]);
  }
}, "Opentelemetry");
async function withTelemetry(name, asyncFunction) {
  const opentelemetry2 = new Opentelemetry(name);
  return opentelemetry2.start().then(() => asyncFunction());
}
_chunkTUYBEZEZjs.__name.call(void 0, withTelemetry, "withTelemetry");



exports.withTelemetry = withTelemetry;
//# sourceMappingURL=chunk-AWDNMKDE.js.map