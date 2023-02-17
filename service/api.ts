import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import qs from "qs";

import { logger } from "../utils";
import { registerPlugins, registerRoutes } from "./routes";
import { BaseController } from "./routes/utils";

export function createAppInstance(options: FastifyServerOptions = {}) {
  return fastify({
    querystringParser: (value) => qs.parse(value),
    logger: logger.instance,
    trustProxy: true,
    ajv: {
      customOptions: {
        strict: "log",
        keywords: ["kind", "modifier"],
      },
    },
    ...options,
  }).withTypeProvider<TypeBoxTypeProvider>();
}

export async function start(
  name: string,
  port: number,
  controllers: BaseController[],
  appInstance?: FastifyInstance,
  options?: {
    registerPlugins?: (app: FastifyInstance) => Promise<void>;
    errorHandler?: (error, request, response) => void;
  }
) {
  const app = appInstance ?? createAppInstance();

  if (typeof options?.errorHandler === "function") {
    app.setErrorHandler(options.errorHandler);
  }

  await registerPlugins(app);

  if (typeof options?.registerPlugins === "function") {
    await options.registerPlugins(app);
  }

  registerRoutes(app, controllers);

  await app.listen({
    port,
    host: "0.0.0.0",
  });

  logger.info(`🚀 ${name} http://localhost:${port}`);

  return app;
}
