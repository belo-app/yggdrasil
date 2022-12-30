"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBinDateRanges = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const getBinDateRanges = (startDate, endDate, rangeLengthInDays) => {
    const range = Number(rangeLengthInDays);
    const isEndDateBeforeRangeEnd = (0, dayjs_1.default)(endDate).diff(startDate, "day") <= range;
    const result = [];
    if (isEndDateBeforeRangeEnd) {
        return [[startDate, endDate]];
    }
    let totalDuration = (0, dayjs_1.default)(endDate).diff(startDate, "day");
    let start = startDate;
    let to = startDate;
    while (totalDuration > 0 && (0, dayjs_1.default)(to).isBefore(endDate)) {
        const from = start;
        to = (0, dayjs_1.default)(start).add(range, "day").format("YYYY-MM-DD");
        result.push([from, (0, dayjs_1.default)(to).isAfter(endDate) ? endDate : to]);
        start = (0, dayjs_1.default)(to).add(1, "day").format("YYYY-MM-DD");
        totalDuration = totalDuration - range;
    }
    return result;
};
exports.getBinDateRanges = getBinDateRanges;
