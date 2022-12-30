"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunk5JBMGMBFjs = require('./chunk-5JBMGMBF.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/service/routes/plugins.ts
var _cors = require('@fastify/cors'); var _cors2 = _interopRequireDefault(_cors);
var _formbody = require('@fastify/formbody'); var _formbody2 = _interopRequireDefault(_formbody);
var _helmet = require('@fastify/helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _fastifymulter = require('fastify-multer'); var _fastifymulter2 = _interopRequireDefault(_fastifymulter);
var _fastifyrawbody = require('fastify-raw-body'); var _fastifyrawbody2 = _interopRequireDefault(_fastifyrawbody);
async function registerPlugins(fastify) {
  fastify.register(_cors2.default);
  fastify.register(_helmet2.default);
  fastify.register(_formbody2.default);
  fastify.register(_chunk5JBMGMBFjs.belo_boom_default);
  fastify.register(_fastifymulter2.default.contentParser);
  await fastify.register(_fastifyrawbody2.default, {
    field: "rawBody",
    global: false,
    encoding: false,
    runFirst: true
  });
}
_chunkTUYBEZEZjs.__name.call(void 0, registerPlugins, "registerPlugins");
var uploadFastifyMulter = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (options) => _fastifymulter2.default.call(void 0, options), "uploadFastifyMulter");




exports.registerPlugins = registerPlugins; exports.uploadFastifyMulter = uploadFastifyMulter;
//# sourceMappingURL=chunk-2JWLDCE5.js.map