"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = void 0;
const hyperid_1 = __importDefault(require("hyperid"));
exports.uuid = (0, hyperid_1.default)({ fixedLength: true, urlSafe: true });
