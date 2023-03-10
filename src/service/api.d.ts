/// <reference types="node" />
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance, FastifyServerOptions } from "fastify";
import { BaseController } from "./routes/utils";
export declare function createAppInstance(options?: FastifyServerOptions): FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, any, TypeBoxTypeProvider>;
export declare function start(name: string, port: number, controllers: BaseController[], appInstance?: FastifyInstance, options?: {
    registerPlugins?: (app: FastifyInstance) => Promise<void>;
    errorHandler?: (error: any, request: any, response: any) => void;
}): Promise<FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault> | FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, any, TypeBoxTypeProvider>>;
