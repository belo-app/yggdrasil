import boom from "@hapi/boom";
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyReply,
} from "fastify";
import fp from "fastify-plugin";

const helperMethods = new Set(["wrap", "create"]);

function addBoomToReply(reply: FastifyReply) {
  for (const key of Object.getOwnPropertyNames(boom)) {
    if (typeof boom[key] !== "function") {
      continue;
    }

    if (helperMethods.has(key)) {
      reply.boom[key] = function (...inputs) {
        return boom[key](...inputs);
      };
    } else {
      reply.boom[key] = function (...inputs) {
        const boomed = boom[key](...inputs);

        const boomedPayloadAndAdditionalResponse = Object.assign(
          boomed.output.payload,
          inputs[1]
        );
        return reply
          .status(boomed.output.statusCode)
          .type("application/json")
          .headers(boomed.output.headers)
          .send(boomedPayloadAndAdditionalResponse);
      };
    }
  }
}

const beloBoomPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) => {
  fastify.addHook("onRequest", async (_request, reply) => {
    if (!fastify.hasReplyDecorator("boom")) {
      reply.boom = {} as any;
      addBoomToReply(reply);
    }
  });
};

export const fastifyBeloBoom = fp(beloBoomPlugin, {
  fastify: "4.x",
  name: "@fastify/belo-boom",
});

export default fastifyBeloBoom;
