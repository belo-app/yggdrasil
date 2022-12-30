"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/metrics.ts
var _exporterprometheus = require('@opentelemetry/exporter-prometheus');
var _sdkmetrics = require('@opentelemetry/sdk-metrics');
var _memoizee = require('memoizee'); var _memoizee2 = _interopRequireDefault(_memoizee);
var _os = require('os'); var _os2 = _interopRequireDefault(_os);
var PrometheusMetricService = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0,  (_class =class PrometheusMetricService2 {
  __init() {this.metrics = {}}
  constructor() {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    const meterProvider = !_chunk2RIL52B7js.environment.LOCAL ? new (0, _sdkmetrics.MeterProvider)() : void 0;
    _optionalChain([meterProvider, 'optionalAccess', _ => _.addMetricReader, 'call', _2 => _2(new (0, _exporterprometheus.PrometheusExporter)({
      port: 9464
    }))]);
    this.meter = _optionalChain([meterProvider, 'optionalAccess', _3 => _3.getMeter, 'call', _4 => _4("prometheus")]);
  }
  getMeter() {
    return this.meter;
  }
  __init2() {this.getEnvironmentAttributes = _memoizee2.default.call(void 0, (attributes) => {
    return {
      hostname: _os2.default.hostname(),
      environment: _chunk2RIL52B7js.environment.DOPPLER_ENVIRONMENT,
      ...attributes
    };
  })}
  getOrCreateCounter(name, options) {
    if (this.metrics[name]) {
      return this.metrics[name];
    }
    if (!this.meter) {
      return;
    }
    const counter = _optionalChain([this, 'access', _5 => _5.meter, 'optionalAccess', _6 => _6.createCounter, 'call', _7 => _7(name, options)]);
    this.metrics[name] = {
      ...Object.assign({}, counter),
      add: (value, attributes) => counter.add(value, this.getEnvironmentAttributes(attributes))
    };
    return this.metrics[name];
  }
  getOrCreateHistogram(name, options) {
    if (this.metrics[name]) {
      return this.metrics[name];
    }
    if (!this.meter) {
      return;
    }
    const histogram = _optionalChain([this, 'access', _8 => _8.meter, 'optionalAccess', _9 => _9.createHistogram, 'call', _10 => _10(name, options)]);
    this.metrics[name] = {
      ...Object.assign({}, histogram),
      record: (value, attributes) => histogram.record(value, this.getEnvironmentAttributes(attributes))
    };
    return this.metrics[name];
  }
}, _class), "PrometheusMetricService");
var prometheusMetricsService = new PrometheusMetricService();



exports.prometheusMetricsService = prometheusMetricsService;
//# sourceMappingURL=chunk-BF66JPXH.js.map