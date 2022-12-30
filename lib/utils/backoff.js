"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backoff = void 0;
const delay_1 = require("./delay");
const error_1 = require("./error");
async function backoff(handler, { maxAttempts, delayInMilliseconds, }) {
    const attempts = Array.from({ length: maxAttempts }).map((_, index) => index);
    for (const attempt of attempts) {
        const totalDelay = (2 ** attempt - 1) * delayInMilliseconds;
        await (0, delay_1.delay)(totalDelay);
        try {
            const data = await handler();
            return { data, attempt };
        }
        catch {
            //
        }
    }
    throw error_1.Errors.backoffFailed();
}
exports.backoff = backoff;
