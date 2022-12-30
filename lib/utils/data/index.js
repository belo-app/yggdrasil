"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const countries_1 = __importDefault(require("./countries"));
const currencies_1 = __importDefault(require("./currencies"));
const mcc_1 = require("./mcc");
exports.data = {
    mcc: mcc_1.mccData,
    countries: countries_1.default,
    currencies: currencies_1.default,
};
