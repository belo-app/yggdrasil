import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import { preHandlerHookHandler } from "fastify";
import multer, { contentParser } from "fastify-multer";
import {
  Field,
  FileFilter,
  Options,
  StorageEngine,
} from "fastify-multer/lib/interfaces";
import rawBody from "fastify-raw-body";

import { AppInstance } from "../types";
import beloBoom from "./belo-boom";

declare class Multer {
  storage: StorageEngine;
  limits: Options["limits"];
  preservePath: Options["preservePath"];
  fileFilter: FileFilter;
  contentParser: typeof contentParser;
  constructor(options: Options);
  private _makePreHandler;
  single(name: string): preHandlerHookHandler;
  array(name: string, maxCount?: number): preHandlerHookHandler;
  fields(fields: Field[]): preHandlerHookHandler;
  none(): preHandlerHookHandler;
  any(): preHandlerHookHandler;
}

export async function registerPlugins(fastify: AppInstance) {
  fastify.register(cors);

  fastify.register(helmet);

  fastify.register(formBody);

  fastify.register(beloBoom);

  fastify.register(contentParser);

  await fastify.register(rawBody, {
    field: "rawBody",
    global: false,
    encoding: false,
    runFirst: true,
  });
}

export const uploadFastifyMulter = (options?: Options): Multer =>
  multer(options) as unknown as Multer;
