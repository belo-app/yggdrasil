"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSha256Hash = exports.generateRandomPassword = exports.generateRandomSecret = exports.generateRandomToken = exports.randomInt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const randomInt = (min = 1, max = 1000) => Math.floor(Math.random() * (max - min) + min);
exports.randomInt = randomInt;
const generateRandomToken = () => {
    const buffer = crypto_1.default.randomBytes(256);
    return crypto_1.default.createHash("sha1").update(buffer).digest("hex");
};
exports.generateRandomToken = generateRandomToken;
const generateRandomSecret = () => {
    const buffer = crypto_1.default.randomBytes(256);
    return crypto_1.default.createHash("sha256").update(buffer).digest("hex");
};
exports.generateRandomSecret = generateRandomSecret;
const generateRandomPassword = () => {
    const buffer = crypto_1.default.randomBytes(256);
    return crypto_1.default.createHash("sha256").update(buffer).digest("base64");
};
exports.generateRandomPassword = generateRandomPassword;
const generateSha256Hash = (value) => {
    return crypto_1.default.createHash("sha256").update(value).digest("base64");
};
exports.generateSha256Hash = generateSha256Hash;
