import { RateLimitPluginOptions } from "@fastify/rate-limit";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import boom from "@hapi/boom";
import { Static, TSchema } from "@sinclair/typebox";
import {
  ContextConfigDefault,
  FastifyInstance,
  FastifyPluginCallback,
  FastifySchema,
  onRequestHookHandler,
  preHandlerAsyncHookHandler,
  preHandlerHookHandler,
  RouteHandlerMethod,
} from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

import { MulterFile, Type } from "../../utils";

declare module "fastify" {
  interface FastifyRequest {
    file?: MulterFile;
    files?: MulterFile[] | Record<string, MulterFile[]>;
  }

  interface FastifyReply {
    boom: typeof boom;
  }
}

export interface Schema {
  summary: string;
  description?: string;
  tags: string[];
  response: { 200: TSchema };
  body?: TSchema;
  querystring?: TSchema;
  params?: TSchema;
  headers?: TSchema;
}

export interface RouteSchema<S extends Schema> {
  Reply: Static<S["response"][200]>;
  Body: S["body"] extends TSchema ? Static<S["body"]> : undefined;
  Querystring: S["querystring"] extends TSchema
    ? Static<S["querystring"]>
    : undefined;
  Params: S["params"] extends TSchema ? Static<S["params"]> : undefined;
  Headers: S["headers"] extends TSchema ? Static<S["headers"]> : undefined;
}

type ContextConfig = ContextConfigDefault & {
  permissions?: string[];
  rawBody?: boolean;
  rateLimit?: RateLimitPluginOptions;
};

export type RouteHandler<S extends Schema> = RouteHandlerMethod<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteSchema<S>,
  ContextConfig,
  FastifySchema,
  TypeBoxTypeProvider
>;

export const ResponseWithoutData = <Data extends TSchema>(data: Data) => ({
  200: Type.Optional(data),
});

export const Response = <Data extends TSchema>(data: Data) => ({
  200: Type.Object(
    {
      data: Type.Optional(data),
    },
    {
      description: "Successful response",
    }
  ),
});

export const PagedResponse = <Data extends TSchema>(data: Data) => ({
  200: Type.Object(
    {
      data: Type.Optional(data),
      hasMore: Type.Optional(Type.Boolean()),
    },
    {
      description: "Successful response",
    }
  ),
});

export const withAuth = <T extends Schema>(schema: T) => {
  return {
    ...schema,
    security: [
      {
        bearerAuth: [],
      },
    ],
  };
};

export type AppInstance = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  any,
  TypeBoxTypeProvider
>;

export type AppPluginCallback = FastifyPluginCallback<
  any,
  Server,
  TypeBoxTypeProvider
>;

export type AppPreHandlerHookHandler = preHandlerHookHandler<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteSchema<any>,
  ContextConfig,
  FastifySchema,
  TypeBoxTypeProvider
>;

export type AppPreHandlerAsyncHookHandler = preHandlerAsyncHookHandler<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteSchema<any>,
  ContextConfig,
  FastifySchema,
  TypeBoxTypeProvider
>;

export type AppOnRequestHookHandler = onRequestHookHandler<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteSchema<any>,
  ContextConfig,
  FastifySchema,
  TypeBoxTypeProvider
>;
