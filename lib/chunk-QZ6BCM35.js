"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/batch-queue.ts
var BatchQueue = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, class BatchQueue2 {
  constructor(handler, size = 10) {
    this.handler = handler;
    this.size = size;
    this.queue = [];
    this.processing = false;
    this.process = () => {
      this.processing = true;
      try {
        this.handler([
          ...this.queue
        ]);
        this.queue = [];
      } finally {
        this.processing = false;
      }
    };
  }
  add(item) {
    this.queue.push(item);
    if (this.queue.length >= this.size && !this.processing) {
      this.process();
    }
  }
}, "BatchQueue");
var batchQueue = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (callback) => new BatchQueue(callback), "batchQueue");



exports.batchQueue = batchQueue;
//# sourceMappingURL=chunk-QZ6BCM35.js.map