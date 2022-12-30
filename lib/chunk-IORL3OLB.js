"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// node_modules/mimic-fn/index.js
var require_mimic_fn = _chunkTUYBEZEZjs.__commonJS.call(void 0, {
  "node_modules/mimic-fn/index.js"(exports, module) {
    "use strict";
    var mimicFn2 = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (to, from) => {
      for (const prop of Reflect.ownKeys(from)) {
        Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
      }
      return to;
    }, "mimicFn");
    module.exports = mimicFn2;
    module.exports.default = mimicFn2;
  }
});

// src/utils/p-memoize.ts
var import_mimic_fn = _chunkTUYBEZEZjs.__toESM.call(void 0, require_mimic_fn());
function pMemoize(function_, { cacheKey, cache = /* @__PURE__ */ new Map(), maxAge } = {}) {
  const memoized = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, async function(...arguments_) {
    const key = cacheKey ? cacheKey(...arguments_) : arguments_[0];
    const isCached = await cache.has(key);
    if (isCached) {
      return cache.get(key);
    }
    const promise = function_.apply(this, arguments_);
    try {
      const result = await promise;
      cache.set(key, result, {
        maxAge
      });
      return result;
    } catch (error) {
      throw error;
    }
  }, "memoized");
  (0, import_mimic_fn.default)(memoized, function_);
  return memoized;
}
_chunkTUYBEZEZjs.__name.call(void 0, pMemoize, "pMemoize");



exports.pMemoize = pMemoize;
//# sourceMappingURL=chunk-IORL3OLB.js.map