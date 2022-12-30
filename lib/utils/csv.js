"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvHandler = exports.CsvHandler = void 0;
const papaparse_1 = require("papaparse");
const logger_1 = require("./logger");
class CsvHandler {
    jsonToCsv(data, options) {
        return Buffer.from((0, papaparse_1.unparse)(data, options));
    }
    async csvToJsonAsync(file, onChunk, config) {
        let chunkNumber = 1;
        const data = [];
        const errors = [];
        return new Promise((resolve, reject) => {
            (0, papaparse_1.parse)(file, {
                error: reject,
                chunkSize: papaparse_1.RemoteChunkSize,
                ...config,
                complete: (_result) => resolve({ data, errors }),
                chunk: async (result, parse) => {
                    parse.pause();
                    logger_1.logger.info(`Chunck Number: ${chunkNumber}`);
                    const process = await onChunk(result.data, result.errors);
                    data.push(process.data);
                    errors.push(process.error);
                    chunkNumber += 1;
                    parse.resume();
                },
            });
        });
    }
    async csvToJson(file, config) {
        return new Promise((resolve, reject) => {
            (0, papaparse_1.parse)(file, {
                error: reject,
                ...config,
                complete: (result) => resolve(result),
            });
        });
    }
}
exports.CsvHandler = CsvHandler;
exports.csvHandler = new CsvHandler();
