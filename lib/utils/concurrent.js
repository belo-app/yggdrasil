"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concurrent = void 0;
const p_map_1 = __importDefault(require("p-map"));
function concurrent(input, mapper, options) {
    return (0, p_map_1.default)(input, mapper, { concurrency: 5, ...options });
}
exports.concurrent = concurrent;
