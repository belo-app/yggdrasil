"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/calc.ts
var _decimaljs = require('decimal.js'); var _decimaljs2 = _interopRequireDefault(_decimaljs);
var volumeAverage = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (prices, totalVolume, estimateVolume) => {
  if (!totalVolume) {
    return average(prices);
  }
  let volumeAccumulated = estimateVolume ? convertVolume(totalVolume, _optionalChain([prices, 'access', _ => _[0], 'optionalAccess', _2 => _2.price]), estimateVolume) : new (0, _decimaljs2.default)(totalVolume);
  const data = [];
  for (const price of prices) {
    if (volumeAccumulated.lessThanOrEqualTo(0)) {
      break;
    }
    data.push(price);
    volumeAccumulated = volumeAccumulated.minus(price.volume);
  }
  return average(data);
}, "volumeAverage");
var average = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (prices) => {
  const volume = prices.reduce((vol, next) => vol.add(next.volume), new (0, _decimaljs2.default)(0));
  const priceVolume = prices.reduce((price, next) => price.add(new (0, _decimaljs2.default)(next.price).mul(next.volume)), new (0, _decimaljs2.default)(0));
  return priceVolume.div(volume);
}, "average");
var convertVolume = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (volume, price = "0", inverted) => {
  const isNegativePrice = new (0, _decimaljs2.default)(price).lessThanOrEqualTo(0);
  if (isNegativePrice) {
    return new (0, _decimaljs2.default)(volume);
  }
  return inverted ? new (0, _decimaljs2.default)(volume).div(price) : new (0, _decimaljs2.default)(volume).mul(price);
}, "convertVolume");
var validAmount = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (amount) => {
  try {
    return new (0, _decimaljs2.default)(amount).greaterThan(0);
  } catch (e) {
    return false;
  }
}, "validAmount");
function difference(number1, number2) {
  return new (0, _decimaljs2.default)(number1).minus(number2);
}
_chunkTUYBEZEZjs.__name.call(void 0, difference, "difference");







exports.volumeAverage = volumeAverage; exports.average = average; exports.convertVolume = convertVolume; exports.validAmount = validAmount; exports.difference = difference;
//# sourceMappingURL=chunk-UMCMMHMY.js.map