"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstNCharacters = exports.toFixedDecimals = exports.getUuidFormat = exports.satoshisToBitcoin = exports.bitcoinToSatoshis = exports.checkIp = exports.cleanSpecialCharacters = exports.removeAccents = exports.replace = exports.emptyStringToUndefined = exports.startCase = exports.getDNIfromCUIT = exports.formatCurrencyAmount = void 0;
const decimal_js_1 = require("decimal.js");
const ip_range_check_1 = __importDefault(require("ip-range-check"));
const lodash_1 = require("lodash");
function formatCurrencyAmount({ amount, code, symbol, locale = "es", options = {}, }) {
    const formatNumber = new Intl.NumberFormat(locale, options).format(amount);
    return symbol ? `${symbol}${formatNumber}` : `${formatNumber} ${code ?? ""}`;
}
exports.formatCurrencyAmount = formatCurrencyAmount;
function getDNIfromCUIT(cuit) {
    return cuit.slice(2, -1);
}
exports.getDNIfromCUIT = getDNIfromCUIT;
function startCase(value) {
    return value
        .trim()
        .split(" ")
        .map((word) => (0, lodash_1.capitalize)(word))
        .filter(Boolean)
        .join(" ");
}
exports.startCase = startCase;
function emptyStringToUndefined(value, trim = true) {
    const data = trim ? value.trim() : value;
    return data ? data : undefined;
}
exports.emptyStringToUndefined = emptyStringToUndefined;
function replace(value, regex) {
    return value ? value.replaceAll(regex, "") : undefined;
}
exports.replace = replace;
function removeAccents(value) {
    return replace(value.normalize("NFD"), /[\u0300-\u036F]/g);
}
exports.removeAccents = removeAccents;
function cleanSpecialCharacters(value) {
    return replace(removeAccents(value.trim()) ?? "", /[^ A-Za-z]/g);
}
exports.cleanSpecialCharacters = cleanSpecialCharacters;
function checkIp(ip, ips) {
    return (0, ip_range_check_1.default)(ip, ips);
}
exports.checkIp = checkIp;
const bitcoinToSatoshis = (value) => {
    return new decimal_js_1.Decimal(value).mul(100000000).floor();
};
exports.bitcoinToSatoshis = bitcoinToSatoshis;
const satoshisToBitcoin = (value) => {
    return new decimal_js_1.Decimal(value).div(100000000);
};
exports.satoshisToBitcoin = satoshisToBitcoin;
const getUuidFormat = (value) => {
    const normalizedValue = String(value).trim().replaceAll("-", "");
    if (normalizedValue.length > 32) {
        throw new Error("The value length must be lower than 32");
    }
    const result = normalizedValue.padStart(32, "0");
    let skippedCharacter = 0;
    return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x-]/g, (match, index) => {
        if (match !== "x") {
            skippedCharacter++;
            return match;
        }
        return result[index - skippedCharacter] ?? "";
    });
};
exports.getUuidFormat = getUuidFormat;
function toFixedDecimals(value, decimalPlaces) {
    return new decimal_js_1.Decimal(value).toDP(decimalPlaces).toString();
}
exports.toFixedDecimals = toFixedDecimals;
const getFirstNCharacters = (value, n) => {
    return value.slice(0, n);
};
exports.getFirstNCharacters = getFirstNCharacters;
