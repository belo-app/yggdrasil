"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeEmvQr = void 0;
const emvqr_1 = require("./emvqr");
function decodeEmvQr(qrData) {
    return (0, emvqr_1.decode)(qrData);
}
exports.decodeEmvQr = decodeEmvQr;
