import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import multer from "fastify-multer";
import { Options } from "fastify-multer/lib/interfaces";
import rawBody from "fastify-raw-body";

import { AppInstance } from "../types";
import beloBoom from "./belo-boom";

export async function registerPlugins(fastify: AppInstance) {
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
