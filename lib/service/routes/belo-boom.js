"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyBeloBoom = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const helperMethods = new Set(["wrap", "create"]);
function addBoomToReply(reply) {
    for (const key of Object.getOwnPropertyNames(boom_1.default)) {
        if (typeof boom_1.default[key] !== "function") {
            continue;
        }
        if (helperMethods.has(key)) {
            reply.boom[key] = function (...inputs) {
                return boom_1.default[key](...inputs);
            };
        }
        else {
            reply.boom[key] = function (...inputs) {
                const boomed = boom_1.default[key](...inputs);
                const boomedPayloadAndAdditionalResponse = Object.assign(boomed.output.payload, inputs[1]);
                return reply
                    .status(boomed.output.statusCode)
                    .type("application/json")
                    .headers(boomed.output.headers)
                    .send(boomedPayloadAndAdditionalResponse);
            };
        }
    }
}
const beloBoomPlugin = async (fastify, _options) => {
    fastify.addHook("onRequest", async (_request, reply) => {
        if (!fastify.hasReplyDecorator("boom")) {
            reply.boom = {};
            addBoomToReply(reply);
        }
    });
};
exports.fastifyBeloBoom = (0, fastify_plugin_1.default)(beloBoomPlugin, {
    fastify: "4.x",
    name: "@fastify/belo-boom",
});
exports.default = exports.fastifyBeloBoom;
