"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/validate.ts
var _superstruct = require('superstruct'); var s = _interopRequireWildcard(_superstruct);
var isTrueValidation = s.refine(s.boolean(), "isTrueValidation", (value) => value === true);
var isFalseValidation = s.refine(s.boolean(), "isTrueValidation", (value) => value === false);
var streetNumberValidation = s.refine(s.string(), "streetNumberValidation", (value) => {
  return /^\d{1,5}$/.test(value) || value.length > 0;
});
function isNullOrOptional(shape) {
  return s.optional(s.nullable(shape));
}
_chunkTUYBEZEZjs.__name.call(void 0, isNullOrOptional, "isNullOrOptional");
var intRegex = /^\d+$/;
var isStringInt = s.define("stringInt", (value) => intRegex.test(value));








exports.isTrueValidation = isTrueValidation; exports.isFalseValidation = isFalseValidation; exports.streetNumberValidation = streetNumberValidation; exports.isNullOrOptional = isNullOrOptional; exports.intRegex = intRegex; exports.isStringInt = isStringInt;
//# sourceMappingURL=chunk-DJY4774A.js.map