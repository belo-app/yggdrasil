"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/utils/index.ts
require('dayjs/locale/es');
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var _customParseFormat = require('dayjs/plugin/customParseFormat'); var _customParseFormat2 = _interopRequireDefault(_customParseFormat);
var _localizedFormat = require('dayjs/plugin/localizedFormat'); var _localizedFormat2 = _interopRequireDefault(_localizedFormat);
var _timezone = require('dayjs/plugin/timezone'); var _timezone2 = _interopRequireDefault(_timezone);
var _utc = require('dayjs/plugin/utc'); var _utc2 = _interopRequireDefault(_utc);
var _decimaljs = require('decimal.js'); var _decimaljs2 = _interopRequireDefault(_decimaljs);
_dayjs2.default.extend(_customParseFormat2.default);
_dayjs2.default.extend(_localizedFormat2.default);
_dayjs2.default.extend(_utc2.default);
_dayjs2.default.extend(_timezone2.default);
_decimaljs2.default.set({
  rounding: _decimaljs2.default.ROUND_FLOOR
});
//# sourceMappingURL=chunk-73H5OZR6.js.map