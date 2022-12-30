"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/ethereum-node/provider.ts
var _ethers = require('ethers');
var EthereumNodeProvider = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0,  (_class =class EthereumNodeProvider2 {constructor() { _class.prototype.__init.call(this); }
  __init() {this.uri = "https://cloudflare-eth.com"}
  hasToInit() {
    return !this.provider;
  }
  instance() {
    const hasToInit = this.hasToInit();
    if (hasToInit) {
      this.provider = new _ethers.ethers.providers.JsonRpcProvider(this.uri);
    }
    return this.provider;
  }
}, _class), "EthereumNodeProvider");
var ethereumNode = new EthereumNodeProvider();



exports.ethereumNode = ethereumNode;
//# sourceMappingURL=chunk-Q4JTHNWO.js.map