"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = exports.bufferToStream = exports.streamToBuffer = void 0;
const stream_1 = require("stream");
const streamToBuffer = (stream) => {
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
};
exports.streamToBuffer = streamToBuffer;
const bufferToStream = (buffer) => {
    const stream = new stream_1.Duplex();
    stream.push(buffer);
    // eslint-disable-next-line unicorn/no-null
    stream.push(null);
    return stream;
};
exports.bufferToStream = bufferToStream;
function getFileExtension(filename) {
    return filename.split(".").pop();
}
exports.getFileExtension = getFileExtension;
