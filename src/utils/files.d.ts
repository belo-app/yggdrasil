/// <reference types="node" />
/// <reference types="node" />
import { Duplex, Stream } from "stream";
export declare const streamToBuffer: (stream: Stream) => Promise<Buffer>;
export declare const bufferToStream: (buffer: Buffer) => Duplex;
export declare function getFileExtension(filename: string): string;
