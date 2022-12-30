"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkYQBDX6NYjs = require('./chunk-YQBDX6NY.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/service/types/route.ts
var ResponseWithoutData = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (data) => ({
  200: _chunkYQBDX6NYjs.Type.Optional(data)
}), "ResponseWithoutData");
var Response = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (data) => ({
  200: _chunkYQBDX6NYjs.Type.Object({
    data: _chunkYQBDX6NYjs.Type.Optional(data)
  }, {
    description: "Successful response"
  })
}), "Response");
var PagedResponse = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (data) => ({
  200: _chunkYQBDX6NYjs.Type.Object({
    data: _chunkYQBDX6NYjs.Type.Optional(data),
    hasMore: _chunkYQBDX6NYjs.Type.Optional(_chunkYQBDX6NYjs.Type.Boolean())
  }, {
    description: "Successful response"
  })
}), "PagedResponse");
var withAuth = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (schema) => {
  return {
    ...schema,
    security: [
      {
        bearerAuth: []
      }
    ]
  };
}, "withAuth");






exports.ResponseWithoutData = ResponseWithoutData; exports.Response = Response; exports.PagedResponse = PagedResponse; exports.withAuth = withAuth;
//# sourceMappingURL=chunk-J3GLYJFF.js.map