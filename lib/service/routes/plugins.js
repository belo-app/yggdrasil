"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFastifyMulter = exports.registerPlugins = void 0;
/* import { environment } from "@belo/utils"; */
const cors_1 = __importDefault(require("@fastify/cors"));
const formbody_1 = __importDefault(require("@fastify/formbody"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
/* import rateLimit from "@fastify/rate-limit"; */
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const fastify_raw_body_1 = __importDefault(require("fastify-raw-body"));
const belo_boom_1 = __importDefault(require("./belo-boom"));
/* import { rateLimitGlobal, rateLimitTo404 } from "./rate-limit"; */
async function registerPlugins(fastify) {
    /*   if (!environment.LOCAL) {
      await fastify.register(
        rateLimit,
        rateLimitGlobal(new Redis(environment.REDIS_URL))
      );
  
      fastify.setNotFoundHandler(
        {
          preHandler: fastify.rateLimit(rateLimitTo404),
        },
        function (_request, response) {
          response.boom.notFound();
        }
      );
    }
   */
    fastify.register(cors_1.default);
    fastify.register(helmet_1.default);
    fastify.register(formbody_1.default);
    fastify.register(belo_boom_1.default);
    fastify.register(fastify_multer_1.default.contentParser);
    await fastify.register(fastify_raw_body_1.default, {
        field: "rawBody",
        global: false,
        encoding: false,
        runFirst: true,
    });
}
exports.registerPlugins = registerPlugins;
const uploadFastifyMulter = (options) => (0, fastify_multer_1.default)(options);
exports.uploadFastifyMulter = uploadFastifyMulter;
