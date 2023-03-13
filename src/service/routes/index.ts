import { AppInstance } from "../types";
import { BaseController } from "./utils";

export function registerRoutes(
  fastify: AppInstance,
  controllers: BaseController[]
) {
  fastify.get("/health-check", async () => {
    return { data: true };
  });

  for (const controller of controllers) {
    fastify.register(controller.router, { prefix: controller.path });
  }
}

export * from "./plugins";
export * from "./utils";
