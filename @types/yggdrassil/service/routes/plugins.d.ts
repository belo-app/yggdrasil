import { preHandlerHookHandler } from "fastify";
import { contentParser } from "fastify-multer";
import { Field, FileFilter, Options, StorageEngine } from "fastify-multer/lib/interfaces";
import { AppInstance } from "../types";
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
export declare function registerPlugins(fastify: AppInstance): Promise<void>;
export declare const uploadFastifyMulter: (options?: Options) => Multer;
export {};
//# sourceMappingURL=plugins.d.ts.map