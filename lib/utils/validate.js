"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringInt = exports.intRegex = exports.isNullOrOptional = exports.streetNumberValidation = exports.isFalseValidation = exports.isTrueValidation = void 0;
const s = __importStar(require("superstruct"));
exports.isTrueValidation = s.refine(s.boolean(), "isTrueValidation", (value) => value === true);
exports.isFalseValidation = s.refine(s.boolean(), "isTrueValidation", (value) => value === false);
exports.streetNumberValidation = s.refine(s.string(), "streetNumberValidation", (value) => {
    return /^\d{1,5}$/.test(value) || value.length > 0;
});
function isNullOrOptional(shape) {
    return s.optional(s.nullable(shape));
}
exports.isNullOrOptional = isNullOrOptional;
exports.intRegex = /^\d+$/;
exports.isStringInt = s.define("stringInt", (value) => exports.intRegex.test(value));
