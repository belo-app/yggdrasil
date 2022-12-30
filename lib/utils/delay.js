"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
const delay = async (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
exports.delay = delay;
