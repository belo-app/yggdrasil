"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkSWZSYCIOjs = require('./chunk-SWZSYCIO.js');


var _chunkUMTY7FHDjs = require('./chunk-UMTY7FHD.js');


var _chunkJKO3S2VDjs = require('./chunk-JKO3S2VD.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/service/routes/utils.ts
var _swagger = require('@fastify/swagger'); var _swagger2 = _interopRequireDefault(_swagger);
var _swaggerui = require('@fastify/swagger-ui'); var _swaggerui2 = _interopRequireDefault(_swaggerui);
var _openapisnippet = require('openapi-snippet'); var _openapisnippet2 = _interopRequireDefault(_openapisnippet);
var targets = [
  "shell_curl",
  "node_fetch",
  "python_requests",
  "go_native",
  "java_okhttp"
];
var httpRequestMethods = /* @__PURE__ */ new Set([
  "get",
  "head",
  "post",
  "put",
  "delete",
  "options",
  "trace",
  "patch"
]);
var addRequestSamples = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (openApiSpec) => {
  const openApi = JSON.parse(JSON.stringify(openApiSpec));
  for (const singlePath in openApi.paths) {
    for (const method of Object.keys(openApi.paths[singlePath]).filter((method2) => httpRequestMethods.has(method2))) {
      try {
        const snippets = _openapisnippet2.default.getEndpointSnippets(openApi, singlePath, method, targets);
        const samples = [];
        for (const snippet of snippets.snippets) {
          samples.push({
            lang: snippet.title.split(" ")[0],
            source: snippet.content
          });
        }
        openApi.paths[singlePath][method]["x-codeSamples"] = samples;
      } catch (error) {
        console.log(error);
      }
    }
  }
  return openApi;
}, "addRequestSamples");
var openApiOptions = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (tags) => ({
  openapi: {
    info: {
      title: "belo API docs",
      description: "belo API",
      version: "1.0.0",
      "x-logo": {
        url: "https://www.belo.app/image/referrals.jpg",
        altText: "logo"
      }
    },
    tags,
    servers: [
      {
        url: "https://api.belo.app",
        description: "Production API"
      },
      {
        url: "https://sandbox.belo.app",
        description: "Sandbox API"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
}), "openApiOptions");
var BaseController = class {
  constructor(path = "", controllers, tags = [], extend) {
    this.path = path;
    this.controllers = controllers;
    this.tags = tags;
    this.extend = extend;
    this.router = (instance, _, next) => {
      this.configDocs(instance, _, next);
      _optionalChain([this, 'access', _2 => _2.extend, 'optionalCall', _3 => _3(instance, _, next)]);
      for (const controller of this.controllers) {
        instance.register(controller.router, {
          prefix: controller.path
        });
      }
      next();
    };
    this.configDocs = (instance) => {
      instance.addHook("preHandler", (request, response, next) => {
        if (request.url.includes("docs/static")) {
          return response.boom.notFound();
        }
        next();
      });
      instance.addHook("preSerialization", async (request, _, payload) => {
        if (request.url.includes("docs/json")) {
          console.log("boom");
          return addRequestSamples(payload);
        }
        return payload;
      });
      instance.register(_swagger2.default, openApiOptions(this.tags));
      instance.register(_swaggerui2.default, {
        routePrefix: "/docs"
      });
    };
  }
};
_chunkTUYBEZEZjs.__name.call(void 0, BaseController, "BaseController");
var MulterS3Storage = (_class = class {
  constructor(options) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.client = new (0, _chunkSWZSYCIOjs.S3Bucket)(options.bucket);
    this.getKey = options.getKey;
  }
  __init() {this.getDefaultKey = (file) => {
    const fileExtension = _nullishCoalesce(_chunkUMTY7FHDjs.getFileExtension.call(void 0, file.originalname), () => ( ""));
    return `${_chunkJKO3S2VDjs.uuid.call(void 0, )}.${fileExtension}`;
  }}
  __init2() {this._handleFile = (_request, file, done) => {
    if (!file.stream) {
      done(new Error(`Invalid file ${file.originalname}`));
    }
    const key = _nullishCoalesce(_optionalChain([this, 'access', _6 => _6.getKey, 'optionalCall', _7 => _7(file)]), () => ( this.getDefaultKey(file)));
    this.client.uploadFile(file.stream, key, void 0, {
      ContentType: file.mimetype,
      ACL: this.acl
    }).then((url) => {
      done(void 0, {
        url,
        key
      });
    }).catch((error) => done(error));
  }}
  __init3() {this._removeFile = (_request, file, done) => {
    this.client.deleteFile(file.key, done);
  }}
}, _class);
_chunkTUYBEZEZjs.__name.call(void 0, MulterS3Storage, "MulterS3Storage");




exports.BaseController = BaseController; exports.MulterS3Storage = MulterS3Storage;
//# sourceMappingURL=chunk-A2GEBSXO.js.map