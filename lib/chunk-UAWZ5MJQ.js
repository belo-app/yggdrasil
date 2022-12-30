"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }// src/utils/image.ts
var _superstruct = require('superstruct'); var s = _interopRequireWildcard(_superstruct);
var multerFileSchema = s.object({
  fieldname: s.string(),
  originalname: s.string(),
  encoding: s.string(),
  mimetype: s.string(),
  buffer: s.instance(Buffer),
  size: s.integer()
});



exports.multerFileSchema = multerFileSchema;
//# sourceMappingURL=chunk-UAWZ5MJQ.js.map