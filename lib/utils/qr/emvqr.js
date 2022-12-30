"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const checksum_1 = require("./checksum");
const decoder_1 = require("./decoder");
function decode(emvString, spec = "data") {
    if (!(0, checksum_1.validateChecksum)(emvString)) {
        throw new Error("checksum validation failed.");
    }
    return (0, decoder_1.decode)(emvString, spec);
}
exports.decode = decode;
