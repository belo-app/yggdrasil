"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethereumNode = void 0;
const ethers_1 = require("ethers");
class EthereumNodeProvider {
    constructor() {
        this.uri = "https://cloudflare-eth.com";
    }
    hasToInit() {
        return !this.provider;
    }
    instance() {
        const hasToInit = this.hasToInit();
        if (hasToInit) {
            this.provider = new ethers_1.ethers.providers.JsonRpcProvider(this.uri);
        }
        return this.provider;
    }
}
exports.ethereumNode = new EthereumNodeProvider();
