"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/argon.ts
var _argon2 = require('argon2'); var _argon22 = _interopRequireDefault(_argon2);
var Argon = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, class Argon2 {
  hash(password) {
    return _argon22.default.hash(password);
  }
  verify(hash, password) {
    return _argon22.default.verify(hash, password);
  }
}, "Argon");
var argon = new Argon();



exports.argon = argon;
//# sourceMappingURL=chunk-XJYQKN47.js.map