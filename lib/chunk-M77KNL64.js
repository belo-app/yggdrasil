"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/time.ts
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var getBinDateRanges = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (startDate, endDate, rangeLengthInDays) => {
  const range = Number(rangeLengthInDays);
  const isEndDateBeforeRangeEnd = _dayjs2.default.call(void 0, endDate).diff(startDate, "day") <= range;
  const result = [];
  if (isEndDateBeforeRangeEnd) {
    return [
      [
        startDate,
        endDate
      ]
    ];
  }
  let totalDuration = _dayjs2.default.call(void 0, endDate).diff(startDate, "day");
  let start = startDate;
  let to = startDate;
  while (totalDuration > 0 && _dayjs2.default.call(void 0, to).isBefore(endDate)) {
    const from = start;
    to = _dayjs2.default.call(void 0, start).add(range, "day").format("YYYY-MM-DD");
    result.push([
      from,
      _dayjs2.default.call(void 0, to).isAfter(endDate) ? endDate : to
    ]);
    start = _dayjs2.default.call(void 0, to).add(1, "day").format("YYYY-MM-DD");
    totalDuration = totalDuration - range;
  }
  return result;
}, "getBinDateRanges");



exports.getBinDateRanges = getBinDateRanges;
//# sourceMappingURL=chunk-M77KNL64.js.map