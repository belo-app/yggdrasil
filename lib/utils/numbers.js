"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZero = void 0;
const decimal_js_1 = require("decimal.js");
function isZero(value) {
    return new decimal_js_1.Decimal(value).isZero();
}
exports.isZero = isZero;
