"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitTo404 = exports.rateLimitToVerifyPin = exports.rateLimitGlobal = void 0;
const ms_1 = __importDefault(require("ms"));
const rateLimitGlobal = (redis) => ({
    max: (request) => (request.user ? 10 : 50),
    keyGenerator: (request) => {
        const userId = request?.user?.id ?? request?.user?.email ?? request?.user?.sub;
        return userId ? `user-${userId}` : `ip-${request.ip}`;
    },
    timeWindow: (0, ms_1.default)("1 second"),
    redis,
});
exports.rateLimitGlobal = rateLimitGlobal;
exports.rateLimitToVerifyPin = {
    max: 1,
    keyGenerator: (request) => {
        const userId = request?.user?.id;
        return `user-auth-${userId}`;
    },
    timeWindow: (0, ms_1.default)("1 second"),
};
exports.rateLimitTo404 = {
    max: 1,
    keyGenerator: (request) => `404-ip-${request.ip}`,
    timeWindow: (0, ms_1.default)("1 second"),
};
