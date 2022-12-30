"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterS3Storage = exports.BaseController = void 0;
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const openapi_snippet_1 = __importDefault(require("openapi-snippet"));
const utils_1 = require("../../utils");
const targets = [
    "shell_curl",
    "node_fetch",
    "python_requests",
    "go_native",
    "java_okhttp",
];
const httpRequestMethods = new Set([
    "get",
    "head",
    "post",
    "put",
    "delete",
    "options",
    "trace",
    "patch",
]);
const addRequestSamples = (openApiSpec) => {
    const openApi = JSON.parse(JSON.stringify(openApiSpec));
    for (const singlePath in openApi.paths) {
        for (const method of Object.keys(openApi.paths[singlePath]).filter((method) => httpRequestMethods.has(method))) {
            try {
                const snippets = openapi_snippet_1.default.getEndpointSnippets(openApi, singlePath, method, targets);
                const samples = [];
                for (const snippet of snippets.snippets) {
                    samples.push({
                        lang: snippet.title.split(" ")[0],
                        source: snippet.content,
                    });
                }
                openApi.paths[singlePath][method]["x-codeSamples"] = samples;
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    return openApi;
};
const openApiOptions = (tags) => ({
    openapi: {
        info: {
            title: "belo API docs",
            description: "belo API",
            version: "1.0.0",
            "x-logo": {
                url: "https://www.belo.app/image/referrals.jpg",
                altText: "logo",
            },
        },
        tags: tags,
        servers: [
            {
                url: "https://api.belo.app",
                description: "Production API",
            },
            {
                url: "https://sandbox.belo.app",
                description: "Sandbox API",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
});
class BaseController {
    constructor(path = "", controllers, tags = [], extend) {
        this.path = path;
        this.controllers = controllers;
        this.tags = tags;
        this.extend = extend;
        this.router = (instance, _, next) => {
            this.configDocs(instance, _, next);
            this.extend?.(instance, _, next);
            for (const controller of this.controllers) {
                instance.register(controller.router, { prefix: controller.path });
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
            instance.register(swagger_1.default, openApiOptions(this.tags));
            instance.register(swagger_ui_1.default, {
                routePrefix: "/docs",
            });
        };
    }
}
exports.BaseController = BaseController;
class MulterS3Storage {
    constructor(options) {
        this.getDefaultKey = (file) => {
            const fileExtension = (0, utils_1.getFileExtension)(file.originalname) ?? "";
            return `${(0, utils_1.uuid)()}.${fileExtension}`;
        };
        this._handleFile = (_request, file, done) => {
            if (!file.stream) {
                done(new Error(`Invalid file ${file.originalname}`));
            }
            const key = this.getKey?.(file) ?? this.getDefaultKey(file);
            this.client
                .uploadFile(file.stream, key, undefined, {
                ContentType: file.mimetype,
                ACL: this.acl,
            })
                .then((url) => {
                done(undefined, { url, key });
            })
                .catch((error) => done(error));
        };
        this._removeFile = (_request, file, done) => {
            this.client.deleteFile(file.key, done);
        };
        this.client = new utils_1.S3Bucket(options.bucket);
        this.getKey = options.getKey;
    }
}
exports.MulterS3Storage = MulterS3Storage;
