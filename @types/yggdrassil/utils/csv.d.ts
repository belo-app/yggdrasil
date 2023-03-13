/// <reference types="node" />
/// <reference types="node" />
import { ParseConfig, ParseError, ParseResult, ParseWorkerConfig, UnparseConfig } from "papaparse";
import { Stream } from "stream";
export declare class CsvHandler {
    jsonToCsv(data: Record<string, any>[], options?: UnparseConfig): Buffer;
    csvToJsonAsync<Input, Output>(file: Stream, onChunk: (data: Input[], errors: ParseError[]) => Promise<{
        data: Output;
        error: any;
    }>, config?: Partial<ParseWorkerConfig>): Promise<{
        data: Output[];
        errors: any[];
    }>;
    csvToJson<Input>(file: Stream, config?: ParseConfig): Promise<ParseResult<Input>>;
}
export declare const csvHandler: CsvHandler;
//# sourceMappingURL=csv.d.ts.map