import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import boom from "@hapi/boom";
import fastify from "fastify";

import { logger } from "../utils";
import { registerPlugins, registerRoutes } from "./routes";
import { BaseController } from "./routes/utils";

export async function start(
  name: string,
  port: number,
  controllers: BaseController[]
) {
  const app = fastify({
    logger: logger.instance,
    trustProxy: true,
    ajv: {
      customOptions: {
        strict: "log",
        keywords: ["kind", "modifier"],
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  app.setErrorHandler((error, _, response) => {
    logger.error("GlobalErrorHandler", error);

    if (error.validation) {
      const payload = boom.badRequest().output.payload;

      return response
        .code(400)
        .type("application/json")
        .send({ ...payload, message: error.message });
    }

    if (error.statusCode) {
      return response.code(error.statusCode).type("application/json").send({
        code: error.statusCode,
        error: error.name,
        message: error.message,
      });
    }

    return response
      .code(500)
      .type("application/json")
      .send(boom.internal().output.payload);
  });

  await registerPlugins(app);
  registerRoutes(app, controllers);

  await app.listen({
    port,
    host: "0.0.0.0",
  });

  logger.info(`🚀 ${name} http://localhost:${port}`);

  return app;
}
