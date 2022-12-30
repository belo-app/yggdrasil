"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk5DQHPPHGjs = require('./chunk-5DQHPPHG.js');


var _chunkJHDA7UZFjs = require('./chunk-JHDA7UZF.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/backoff.ts
async function backoff(handler, { maxAttempts, delayInMilliseconds }) {
  const attempts = Array.from({
    length: maxAttempts
  }).map((_, index) => index);
  for (const attempt of attempts) {
    const totalDelay = (2 ** attempt - 1) * delayInMilliseconds;
    await _chunk5DQHPPHGjs.delay.call(void 0, totalDelay);
    try {
      const data = await handler();
      return {
        data,
        attempt
      };
    } catch (e) {
    }
  }
  throw _chunkJHDA7UZFjs.Errors.backoffFailed();
}
_chunkTUYBEZEZjs.__name.call(void 0, backoff, "backoff");



exports.backoff = backoff;
//# sourceMappingURL=chunk-7L5X64DS.js.map