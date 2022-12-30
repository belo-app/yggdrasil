"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTelemetry = void 0;
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const resources_1 = require("@opentelemetry/resources");
const opentelemetry = __importStar(require("@opentelemetry/sdk-node"));
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const environment_1 = require("./environment");
class Opentelemetry {
    constructor(resourceName) {
        this.sdk =
            !environment_1.environment.LOCAL && !environment_1.environment.DISABLE_TRACE
                ? new opentelemetry.NodeSDK({
                    resource: new resources_1.Resource({
                        [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: resourceName,
                    }),
                    spanProcessor: new sdk_trace_base_1.BatchSpanProcessor(new exporter_trace_otlp_http_1.OTLPTraceExporter({
                        url: environment_1.environment.OTLP_TRACE_EXPORTER_URL,
                    })),
                })
                : undefined;
    }
    async start() {
        return this.sdk?.start();
    }
}
async function withTelemetry(name, asyncFunction) {
    const opentelemetry = new Opentelemetry(name);
    return opentelemetry.start().then(() => asyncFunction());
}
exports.withTelemetry = withTelemetry;
