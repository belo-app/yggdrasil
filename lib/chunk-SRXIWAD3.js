"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/objects.ts
function removeUndefinedValues(object_) {
  return Object.keys(object_).reduce((object, key) => object_[key] !== void 0 ? {
    ...object,
    [key]: object_[key]
  } : object, {});
}
_chunkTUYBEZEZjs.__name.call(void 0, removeUndefinedValues, "removeUndefinedValues");
function removeFalsyValues(object_) {
  return Object.keys(object_).reduce((object, key) => object_[key] ? {
    ...object,
    [key]: object_[key]
  } : object, {});
}
_chunkTUYBEZEZjs.__name.call(void 0, removeFalsyValues, "removeFalsyValues");
function replaceElement(object, newElement, condition) {
  return object.map((value) => condition(value, newElement) ? newElement : value);
}
_chunkTUYBEZEZjs.__name.call(void 0, replaceElement, "replaceElement");
function mergeArrays(objectA, objectB, condition) {
  return objectA.map((value) => {
    const newElement = objectB.find((element) => condition(element, value));
    return _nullishCoalesce(newElement, () => ( value));
  });
}
_chunkTUYBEZEZjs.__name.call(void 0, mergeArrays, "mergeArrays");






exports.removeUndefinedValues = removeUndefinedValues; exports.removeFalsyValues = removeFalsyValues; exports.replaceElement = replaceElement; exports.mergeArrays = mergeArrays;
//# sourceMappingURL=chunk-SRXIWAD3.js.map