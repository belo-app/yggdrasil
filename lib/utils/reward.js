"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRewardRate = exports.getRewardSampleV2 = void 0;
const random_1 = require("./random");
const getRewardSampleV2 = () => {
    const random = (0, random_1.randomInt)(1, 10000);
    if (random < 9700) {
        return 0.02;
    }
    if (random < 9750) {
        return 0.04;
    }
    if (random < 9800) {
        return 0.06;
    }
    if (random < 9850) {
        return 0.08;
    }
    if (random < 9900) {
        return 0.12;
    }
    return 0.21;
};
exports.getRewardSampleV2 = getRewardSampleV2;
const getRewardRate = (_amount) => (0, exports.getRewardSampleV2)();
exports.getRewardRate = getRewardRate;
