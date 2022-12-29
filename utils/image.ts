import { Readable } from "stream";
import * as s from "superstruct";

export const multerFileSchema = s.object({
  fieldname: s.string(),
  originalname: s.string(),
  encoding: s.string(),
  mimetype: s.string(),
  buffer: s.instance(Buffer),
  size: s.integer(),
});

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
