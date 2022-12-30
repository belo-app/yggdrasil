"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/card-pin.ts
var createRandomPin = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (length = 4) => {
  let pin = "";
  for (let counter = 1; counter <= length; counter++) {
    pin = pin + Math.floor(Math.random() * 10).toString();
  }
  return pin;
}, "createRandomPin");



exports.createRandomPin = createRandomPin;
//# sourceMappingURL=chunk-2CU3BZ62.js.map