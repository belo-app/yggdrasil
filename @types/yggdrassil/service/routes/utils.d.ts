import { FastifyRequest } from "fastify";
import { File, StorageEngine } from "fastify-multer/lib/interfaces";
import { AppPluginCallback } from "../types";
export interface Controller {
    path: string;
    router: AppPluginCallback;
}
export interface Tag {
    name: string;
    "x-displayName": string;
    description: string;
}
export declare class BaseController implements Controller {
    path: string;
    private controllers;
    private tags;
    private plugins;
    constructor(path: string, controllers: Controller[], tags?: Tag[], plugins?: AppPluginCallback[]);
    router: AppPluginCallback;
    private configDocs;
}
type S3File = File & {
    key: string;
    url: string;
};
export declare class MulterS3Storage implements StorageEngine {
    private client;
    private acl?;
    private getKey?;
    constructor(options: {
        bucket: string;
        getKey?: (file: File) => string;
        acl: string;
    });
    private getDefaultKey;
    _handleFile: (_request: FastifyRequest, file: File, done: (error?: Error | null, info?: any) => void) => void;
    _removeFile: (_request: FastifyRequest, file: S3File, done: (error?: Error | null, info?: Partial<S3File>) => void) => void;
}
export {};
//# sourceMappingURL=utils.d.ts.map