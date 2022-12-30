"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.difference = exports.validAmount = exports.convertVolume = exports.average = exports.volumeAverage = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const volumeAverage = (prices, totalVolume, estimateVolume) => {
    if (!totalVolume) {
        return (0, exports.average)(prices);
    }
    let volumeAccumulated = estimateVolume
        ? (0, exports.convertVolume)(totalVolume, prices[0]?.price, estimateVolume)
        : new decimal_js_1.default(totalVolume);
    const data = [];
    for (const price of prices) {
        if (volumeAccumulated.lessThanOrEqualTo(0)) {
            break;
        }
        data.push(price);
        volumeAccumulated = volumeAccumulated.minus(price.volume);
    }
    return (0, exports.average)(data);
};
exports.volumeAverage = volumeAverage;
const average = (prices) => {
    const volume = prices.reduce((vol, next) => vol.add(next.volume), new decimal_js_1.default(0));
    const priceVolume = prices.reduce((price, next) => price.add(new decimal_js_1.default(next.price).mul(next.volume)), new decimal_js_1.default(0));
    return priceVolume.div(volume);
};
exports.average = average;
const convertVolume = (volume, price = "0", inverted) => {
    const isNegativePrice = new decimal_js_1.default(price).lessThanOrEqualTo(0);
    if (isNegativePrice) {
        return new decimal_js_1.default(volume);
    }
    return inverted
        ? new decimal_js_1.default(volume).div(price)
        : new decimal_js_1.default(volume).mul(price);
};
exports.convertVolume = convertVolume;
const validAmount = (amount) => {
    try {
        return new decimal_js_1.default(amount).greaterThan(0);
    }
    catch {
        return false;
    }
};
exports.validAmount = validAmount;
function difference(number1, number2) {
    return new decimal_js_1.default(number1).minus(number2);
}
exports.difference = difference;
