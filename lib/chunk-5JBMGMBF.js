"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/service/routes/belo-boom.ts
var _boom = require('@hapi/boom'); var _boom2 = _interopRequireDefault(_boom);
var _fastifyplugin = require('fastify-plugin'); var _fastifyplugin2 = _interopRequireDefault(_fastifyplugin);
var helperMethods = /* @__PURE__ */ new Set([
  "wrap",
  "create"
]);
function addBoomToReply(reply) {
  for (const key of Object.getOwnPropertyNames(_boom2.default)) {
    if (typeof _boom2.default[key] !== "function") {
      continue;
    }
    if (helperMethods.has(key)) {
      reply.boom[key] = function(...inputs) {
        return _boom2.default[key](...inputs);
      };
    } else {
      reply.boom[key] = function(...inputs) {
        const boomed = _boom2.default[key](...inputs);
        const boomedPayloadAndAdditionalResponse = Object.assign(boomed.output.payload, inputs[1]);
        return reply.status(boomed.output.statusCode).type("application/json").headers(boomed.output.headers).send(boomedPayloadAndAdditionalResponse);
      };
    }
  }
}
_chunkTUYBEZEZjs.__name.call(void 0, addBoomToReply, "addBoomToReply");
var beloBoomPlugin = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, async (fastify, _options) => {
  fastify.addHook("onRequest", async (_request, reply) => {
    if (!fastify.hasReplyDecorator("boom")) {
      reply.boom = {};
      addBoomToReply(reply);
    }
  });
}, "beloBoomPlugin");
var fastifyBeloBoom = _fastifyplugin2.default.call(void 0, beloBoomPlugin, {
  fastify: "4.x",
  name: "@fastify/belo-boom"
});
var belo_boom_default = fastifyBeloBoom;




exports.fastifyBeloBoom = fastifyBeloBoom; exports.belo_boom_default = belo_boom_default;
//# sourceMappingURL=chunk-5JBMGMBF.js.map