/* import { environment } from "@belo/utils"; */
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import multer from "fastify-multer";
import { Options } from "fastify-multer/lib/interfaces";
import rawBody from "fastify-raw-body";
import Redis from "ioredis";

import { AppInstance } from "../types";
import beloBoom from "./belo-boom";
import { rateLimitGlobal, rateLimitTo404 } from "./rate-limit";

export async function registerPlugins(fastify: AppInstance) {
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
  fastify.register(cors);

  fastify.register(helmet);

  fastify.register(formBody);

  fastify.register(beloBoom);

  fastify.register(multer.contentParser);

  await fastify.register(rawBody, {
    field: "rawBody",
    global: false,
    encoding: false,
    runFirst: true,
  });
}

export const uploadFastifyMulter = (options?: Options) => multer(options);
