"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = void 0;
function toBase64(value) {
    return Buffer.from(value, "utf8").toString("base64");
}
exports.toBase64 = toBase64;
