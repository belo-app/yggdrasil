"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkPC6264EEjs = require('./chunk-PC6264EE.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/reward.ts
var getRewardSampleV2 = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, () => {
  const random = _chunkPC6264EEjs.randomInt.call(void 0, 1, 1e4);
  if (random < 9700) {
    return 0.02;
  }
  if (random < 9750) {
    return 0.04;
  }
  if (random < 9800) {
    return 0.06;
  }
  if (random < 9850) {
    return 0.08;
  }
  if (random < 9900) {
    return 0.12;
  }
  return 0.21;
}, "getRewardSampleV2");
var getRewardRate = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (_amount) => getRewardSampleV2(), "getRewardRate");




exports.getRewardSampleV2 = getRewardSampleV2; exports.getRewardRate = getRewardRate;
//# sourceMappingURL=chunk-KT2LO5QT.js.map