"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argon = void 0;
const argon2_1 = __importDefault(require("argon2"));
class Argon {
    hash(password) {
        return argon2_1.default.hash(password);
    }
    verify(hash, password) {
        return argon2_1.default.verify(hash, password);
    }
}
exports.argon = new Argon();
