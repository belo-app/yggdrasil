"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4FYEUNKOjs = require('./chunk-4FYEUNKO.js');


var _chunkL7QBLI6Rjs = require('./chunk-L7QBLI6R.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/qr/emvqr.ts
function decode2(emvString, spec = "data") {
  if (!_chunk4FYEUNKOjs.validateChecksum.call(void 0, emvString)) {
    throw new Error("checksum validation failed.");
  }
  return _chunkL7QBLI6Rjs.decode.call(void 0, emvString, spec);
}
_chunkTUYBEZEZjs.__name.call(void 0, decode2, "decode");



exports.decode = decode2;
//# sourceMappingURL=chunk-RERCJBWJ.js.map