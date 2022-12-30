"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkDQSECEBNjs = require('./chunk-DQSECEBN.js');



var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/format.ts
var import_lodash = _chunkTUYBEZEZjs.__toESM.call(void 0, _chunkDQSECEBNjs.require_lodash.call(void 0, ));
var _decimaljs = require('decimal.js');
var _iprangecheck = require('ip-range-check'); var _iprangecheck2 = _interopRequireDefault(_iprangecheck);
function formatCurrencyAmount({ amount, code, symbol, locale = "es", options = {} }) {
  const formatNumber = new Intl.NumberFormat(locale, options).format(amount);
  return symbol ? `${symbol}${formatNumber}` : `${formatNumber} ${_nullishCoalesce(code, () => ( ""))}`;
}
_chunkTUYBEZEZjs.__name.call(void 0, formatCurrencyAmount, "formatCurrencyAmount");
function getDNIfromCUIT(cuit) {
  return cuit.slice(2, -1);
}
_chunkTUYBEZEZjs.__name.call(void 0, getDNIfromCUIT, "getDNIfromCUIT");
function startCase(value) {
  return value.trim().split(" ").map((word) => (0, import_lodash.capitalize)(word)).filter(Boolean).join(" ");
}
_chunkTUYBEZEZjs.__name.call(void 0, startCase, "startCase");
function emptyStringToUndefined(value, trim = true) {
  const data = trim ? value.trim() : value;
  return data ? data : void 0;
}
_chunkTUYBEZEZjs.__name.call(void 0, emptyStringToUndefined, "emptyStringToUndefined");
function replace(value, regex) {
  return value ? value.replaceAll(regex, "") : void 0;
}
_chunkTUYBEZEZjs.__name.call(void 0, replace, "replace");
function removeAccents(value) {
  return replace(value.normalize("NFD"), /[\u0300-\u036F]/g);
}
_chunkTUYBEZEZjs.__name.call(void 0, removeAccents, "removeAccents");
function cleanSpecialCharacters(value) {
  return replace(_nullishCoalesce(removeAccents(value.trim()), () => ( "")), /[^ A-Za-z]/g);
}
_chunkTUYBEZEZjs.__name.call(void 0, cleanSpecialCharacters, "cleanSpecialCharacters");
function checkIp(ip, ips) {
  return _iprangecheck2.default.call(void 0, ip, ips);
}
_chunkTUYBEZEZjs.__name.call(void 0, checkIp, "checkIp");
var bitcoinToSatoshis = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (value) => {
  return new (0, _decimaljs.Decimal)(value).mul(1e8).floor();
}, "bitcoinToSatoshis");
var satoshisToBitcoin = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (value) => {
  return new (0, _decimaljs.Decimal)(value).div(1e8);
}, "satoshisToBitcoin");
var getUuidFormat = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (value) => {
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
    return _nullishCoalesce(result[index - skippedCharacter], () => ( ""));
  });
}, "getUuidFormat");
function toFixedDecimals(value, decimalPlaces) {
  return new (0, _decimaljs.Decimal)(value).toDP(decimalPlaces).toString();
}
_chunkTUYBEZEZjs.__name.call(void 0, toFixedDecimals, "toFixedDecimals");
var getFirstNCharacters = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (value, n) => {
  return value.slice(0, n);
}, "getFirstNCharacters");















exports.formatCurrencyAmount = formatCurrencyAmount; exports.getDNIfromCUIT = getDNIfromCUIT; exports.startCase = startCase; exports.emptyStringToUndefined = emptyStringToUndefined; exports.replace = replace; exports.removeAccents = removeAccents; exports.cleanSpecialCharacters = cleanSpecialCharacters; exports.checkIp = checkIp; exports.bitcoinToSatoshis = bitcoinToSatoshis; exports.satoshisToBitcoin = satoshisToBitcoin; exports.getUuidFormat = getUuidFormat; exports.toFixedDecimals = toFixedDecimals; exports.getFirstNCharacters = getFirstNCharacters;
//# sourceMappingURL=chunk-JIJJXZGG.js.map