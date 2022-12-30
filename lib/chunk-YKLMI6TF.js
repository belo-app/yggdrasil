"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/combination.ts
function combinations(values, mapper = (a, b) => [
  a,
  b
]) {
  const result = [];
  for (const value1 of values) {
    const index = values.indexOf(value1) + 1;
    for (const value2 of values.slice(index)) {
      result.push(mapper(value1, value2));
    }
  }
  return result;
}
_chunkTUYBEZEZjs.__name.call(void 0, combinations, "combinations");



exports.combinations = combinations;
//# sourceMappingURL=chunk-YKLMI6TF.js.map