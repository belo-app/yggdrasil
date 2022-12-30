"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomPin = void 0;
const createRandomPin = (length = 4) => {
    let pin = "";
    for (let counter = 1; counter <= length; counter++) {
        pin = pin + Math.floor(Math.random() * 10).toString();
    }
    return pin;
};
exports.createRandomPin = createRandomPin;
