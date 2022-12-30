"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinations = void 0;
function combinations(values, mapper = (a, b) => [a, b]) {
    const result = [];
    for (const value1 of values) {
        const index = values.indexOf(value1) + 1;
        for (const value2 of values.slice(index)) {
            result.push(mapper(value1, value2));
        }
    }
    return result;
}
exports.combinations = combinations;
