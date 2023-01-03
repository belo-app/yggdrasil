import {
  parse,
  ParseConfig,
  ParseError,
  Parser,
  ParseResult,
  ParseWorkerConfig,
  RemoteChunkSize,
  unparse,
  UnparseConfig,
} from "papaparse";
import { Stream } from "stream";

import { logger } from "./logger";

export class CsvHandler {
  public jsonToCsv(data: Record<string, any>[], options?: UnparseConfig) {
    return Buffer.from(unparse(data, options));
  }

  public async csvToJsonAsync<Input, Output>(
    file: Stream,
    onChunk: (
      data: Input[],
      errors: ParseError[]
    ) => Promise<{ data: Output; error: any }>,
    config?: Partial<ParseWorkerConfig>
  ): Promise<{ data: Output[]; errors: any[] }> {
    let chunkNumber = 1;
    const data: Output[] = [];
    const errors: any[] = [];

    return new Promise((resolve, reject) => {
      parse(file as any, {
        error: reject,
        chunkSize: RemoteChunkSize,
        ...config,
        complete: (_result: ParseResult<Input>) => resolve({ data, errors }),
        chunk: async (result: ParseResult<Input>, parse: Parser) => {
          parse.pause();
          logger.info(`Chunck Number: ${chunkNumber}`);

          const process = await onChunk(result.data, result.errors);

          data.push(process.data);
          errors.push(process.error);

          chunkNumber += 1;
          parse.resume();
        },
      });
    });
  }

  public async csvToJson<Input>(
    file: Stream,
    config?: ParseConfig
  ): Promise<ParseResult<Input>> {
    return new Promise((resolve, reject) => {
      parse(file as any, {
        error: reject,
        ...config,
        complete: (result: ParseResult<Input>) => resolve(result),
      });
    });
  }
}

export const csvHandler = new CsvHandler();
