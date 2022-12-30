"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prometheusMetricsService = void 0;
const exporter_prometheus_1 = require("@opentelemetry/exporter-prometheus");
const sdk_metrics_1 = require("@opentelemetry/sdk-metrics");
const memoizee_1 = __importDefault(require("memoizee"));
const os_1 = __importDefault(require("os"));
const environment_1 = require("./environment");
class PrometheusMetricService {
    constructor() {
        this.metrics = {};
        this.getEnvironmentAttributes = (0, memoizee_1.default)((attributes) => {
            return {
                hostname: os_1.default.hostname(),
                environment: environment_1.environment.DOPPLER_ENVIRONMENT,
                ...attributes,
            };
        });
        const meterProvider = !environment_1.environment.LOCAL ? new sdk_metrics_1.MeterProvider() : undefined;
        meterProvider?.addMetricReader(new exporter_prometheus_1.PrometheusExporter({
            port: 9464,
        }));
        this.meter = meterProvider?.getMeter("prometheus");
    }
    getMeter() {
        return this.meter;
    }
    getOrCreateCounter(name, options) {
        if (this.metrics[name]) {
            return this.metrics[name];
        }
        if (!this.meter) {
            return;
        }
        const counter = this.meter?.createCounter(name, options);
        this.metrics[name] = {
            ...Object.assign({}, counter),
            add: (value, attributes) => counter.add(value, this.getEnvironmentAttributes(attributes)),
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
        const histogram = this.meter?.createHistogram(name, options);
        this.metrics[name] = {
            ...Object.assign({}, histogram),
            record: (value, attributes) => histogram.record(value, this.getEnvironmentAttributes(attributes)),
        };
        return this.metrics[name];
    }
}
exports.prometheusMetricsService = new PrometheusMetricService();
