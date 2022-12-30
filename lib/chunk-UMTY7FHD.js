"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/files.ts
var _stream = require('stream');
var streamToBuffer = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (stream) => {
  const bufferData = [];
  stream.on("data", (data) => {
    bufferData.push(data);
  });
  return new Promise((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(bufferData));
    });
  });
}, "streamToBuffer");
var bufferToStream = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (buffer) => {
  const stream = new (0, _stream.Duplex)();
  stream.push(buffer);
  stream.push(null);
  return stream;
}, "bufferToStream");
function getFileExtension(filename) {
  return filename.split(".").pop();
}
_chunkTUYBEZEZjs.__name.call(void 0, getFileExtension, "getFileExtension");





exports.streamToBuffer = streamToBuffer; exports.bufferToStream = bufferToStream; exports.getFileExtension = getFileExtension;
//# sourceMappingURL=chunk-UMTY7FHD.js.map