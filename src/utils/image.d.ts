/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
import * as s from "superstruct";
export declare const multerFileSchema: s.Struct<{
    buffer: Buffer;
    encoding: string;
    size: number;
    fieldname: string;
    originalname: string;
    mimetype: string;
}, {
    fieldname: s.Struct<string, null>;
    originalname: s.Struct<string, null>;
    encoding: s.Struct<string, null>;
    mimetype: s.Struct<string, null>;
    buffer: s.Struct<Buffer, null>;
    size: s.Struct<number, null>;
}>;
export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
    stream?: NodeJS.ReadableStream;
    [key: string]: any;
}
export interface BeloFile {
    filename: string;
    mimetype: string;
    stream: Readable | NodeJS.ReadableStream;
}
