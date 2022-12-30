"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/service/routes/index.ts
function registerRoutes(fastify, controllers) {
  fastify.get("/health-check", async () => {
    return {
      data: true
    };
  });
  for (const controller of controllers) {
    fastify.register(controller.router, {
      prefix: controller.path
    });
  }
}
_chunkTUYBEZEZjs.__name.call(void 0, registerRoutes, "registerRoutes");



exports.registerRoutes = registerRoutes;
//# sourceMappingURL=chunk-GL7YG343.js.map