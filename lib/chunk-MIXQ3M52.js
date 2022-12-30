"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/concurrent.ts
var _pmap = require('p-map'); var _pmap2 = _interopRequireDefault(_pmap);
function concurrent(input, mapper, options) {
  return _pmap2.default.call(void 0, input, mapper, {
    concurrency: 5,
    ...options
  });
}
_chunkTUYBEZEZjs.__name.call(void 0, concurrent, "concurrent");



exports.concurrent = concurrent;
//# sourceMappingURL=chunk-MIXQ3M52.js.map