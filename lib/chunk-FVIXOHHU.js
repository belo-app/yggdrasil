"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkDEHBC6CMjs = require('./chunk-DEHBC6CM.js');


var _chunkUVP75QAPjs = require('./chunk-UVP75QAP.js');


var _chunkO6DT33SPjs = require('./chunk-O6DT33SP.js');


var _chunkVDH3TZU4js = require('./chunk-VDH3TZU4.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/qr/models/models.ts
function getName(stringId) {
  let dataObject = _chunkVDH3TZU4js.schema_default[stringId];
  if (!dataObject) {
    const id = Number.parseInt(stringId);
    id >= 2 && id <= 51 && (dataObject = _chunkVDH3TZU4js.schema_default["02-51"]);
    id >= 65 && id <= 79 && (dataObject = _chunkVDH3TZU4js.schema_default["65-79"]);
    id >= 80 && id <= 99 && (dataObject = _chunkVDH3TZU4js.schema_default["80-99"]);
  }
  return _optionalChain([dataObject, 'optionalAccess', _ => _.name]);
}
_chunkTUYBEZEZjs.__name.call(void 0, getName, "getName");
function getNameSubData(stringId) {
  const dataObject = _chunkO6DT33SPjs.schema_sub_data_default[stringId];
  return _optionalChain([dataObject, 'optionalAccess', _2 => _2.name]);
}
_chunkTUYBEZEZjs.__name.call(void 0, getNameSubData, "getNameSubData");
function getNameAdditionalFields(stringId) {
  let dataObject = _chunkDEHBC6CMjs.schema_additional_fields_default[stringId];
  if (!dataObject) {
    const id = Number.parseInt(stringId);
    id >= 10 && id <= 49 && (dataObject = _chunkDEHBC6CMjs.schema_additional_fields_default["10-49"]);
    id >= 50 && id <= 99 && (dataObject = _chunkDEHBC6CMjs.schema_additional_fields_default["50-99"]);
  }
  return _optionalChain([dataObject, 'optionalAccess', _3 => _3.name]);
}
_chunkTUYBEZEZjs.__name.call(void 0, getNameAdditionalFields, "getNameAdditionalFields");
function getNamePaymentSpecific(stringId) {
  let dataObject = _chunkUVP75QAPjs.schema_payment_specific_default[stringId];
  if (!dataObject) {
    const id = Number.parseInt(stringId);
    id >= 1 && id <= 99 && (dataObject = _chunkUVP75QAPjs.schema_payment_specific_default["01-99"]);
  }
  return _optionalChain([dataObject, 'optionalAccess', _4 => _4.name]);
}
_chunkTUYBEZEZjs.__name.call(void 0, getNamePaymentSpecific, "getNamePaymentSpecific");






exports.getName = getName; exports.getNameSubData = getNameSubData; exports.getNameAdditionalFields = getNameAdditionalFields; exports.getNamePaymentSpecific = getNamePaymentSpecific;
//# sourceMappingURL=chunk-FVIXOHHU.js.map