"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pMemoize = void 0;
const mimic_fn_1 = __importDefault(require("mimic-fn"));
function pMemoize(function_, { cacheKey, cache = new Map(), maxAge, } = {}) {
    const memoized = async function (...arguments_) {
        const key = cacheKey
            ? cacheKey(...arguments_)
            : arguments_[0];
        const isCached = await cache.has(key);
        if (isCached) {
            return cache.get(key);
        }
        const promise = function_.apply(this, arguments_);
        try {
            const result = await promise;
            cache.set(key, result, { maxAge });
            return result;
        }
        catch (error) {
            throw error;
        }
    };
    (0, mimic_fn_1.default)(memoized, function_);
    return memoized;
}
exports.pMemoize = pMemoize;
