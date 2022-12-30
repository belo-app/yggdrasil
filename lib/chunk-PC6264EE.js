"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/random.ts
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var randomInt = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (min = 1, max = 1e3) => Math.floor(Math.random() * (max - min) + min), "randomInt");
var generateRandomToken = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, () => {
  const buffer = _crypto2.default.randomBytes(256);
  return _crypto2.default.createHash("sha1").update(buffer).digest("hex");
}, "generateRandomToken");
var generateRandomSecret = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, () => {
  const buffer = _crypto2.default.randomBytes(256);
  return _crypto2.default.createHash("sha256").update(buffer).digest("hex");
}, "generateRandomSecret");
var generateRandomPassword = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, () => {
  const buffer = _crypto2.default.randomBytes(256);
  return _crypto2.default.createHash("sha256").update(buffer).digest("base64");
}, "generateRandomPassword");
var generateSha256Hash = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (value) => {
  return _crypto2.default.createHash("sha256").update(value).digest("base64");
}, "generateSha256Hash");







exports.randomInt = randomInt; exports.generateRandomToken = generateRandomToken; exports.generateRandomSecret = generateRandomSecret; exports.generateRandomPassword = generateRandomPassword; exports.generateSha256Hash = generateSha256Hash;
//# sourceMappingURL=chunk-PC6264EE.js.map