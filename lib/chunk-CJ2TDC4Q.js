"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkCTH5JC43js = require('./chunk-CTH5JC43.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/csv.ts
var _papaparse = require('papaparse');
var CsvHandler = class {
  jsonToCsv(data, options) {
    return Buffer.from(_papaparse.unparse.call(void 0, data, options));
  }
  async csvToJsonAsync(file, onChunk, config) {
    let chunkNumber = 1;
    const data = [];
    const errors = [];
    return new Promise((resolve, reject) => {
      _papaparse.parse.call(void 0, file, {
        error: reject,
        chunkSize: _papaparse.RemoteChunkSize,
        ...config,
        complete: (_result) => resolve({
          data,
          errors
        }),
        chunk: async (result, parse2) => {
          parse2.pause();
          _chunkCTH5JC43js.logger.info(`Chunck Number: ${chunkNumber}`);
          const process = await onChunk(result.data, result.errors);
          data.push(process.data);
          errors.push(process.error);
          chunkNumber += 1;
          parse2.resume();
        }
      });
    });
  }
  async csvToJson(file, config) {
    return new Promise((resolve, reject) => {
      _papaparse.parse.call(void 0, file, {
        error: reject,
        ...config,
        complete: (result) => resolve(result)
      });
    });
  }
};
_chunkTUYBEZEZjs.__name.call(void 0, CsvHandler, "CsvHandler");
var csvHandler = new CsvHandler();




exports.CsvHandler = CsvHandler; exports.csvHandler = csvHandler;
//# sourceMappingURL=chunk-CJ2TDC4Q.js.map