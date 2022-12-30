"use strict";Object.defineProperty(exports, "__esModule", {value: true});




var _chunkFVIXOHHUjs = require('./chunk-FVIXOHHU.js');


var _chunkJMG4H2BFjs = require('./chunk-JMG4H2BF.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/qr/decoder.ts
function decode(emvString, spec = "data") {
  const emvObject = {};
  let inputText = emvString;
  while (inputText.length > 0) {
    const { emvItem, remainingText } = readNext(inputText, spec);
    let emvResult = emvItem;
    if (spec === "data") {
      emvResult = addMetaData(emvItem);
    } else if (spec == "additionalFields") {
      emvResult = addMetaDataForAdditionalFields(emvItem);
    }
    emvObject[emvResult.id] = emvResult;
    inputText = remainingText;
  }
  return emvObject;
}
_chunkTUYBEZEZjs.__name.call(void 0, decode, "decode");
function readNext(inputText, spec) {
  const id = inputText.slice(0, 2);
  const stringLength = inputText.slice(2, 4);
  const length = Number.parseInt(stringLength);
  if (Number.isNaN(length)) {
    throw new TypeError(`Length definition expect a number. Incorrect length definition for value: ${inputText}.`);
  }
  const data2 = inputText.slice(4, length + 4);
  const emvItem = {
    id,
    name: getNameData(spec, id),
    len: length,
    data: data2,
    rawData: data2
  };
  const remainingText = inputText.slice(Math.max(0, length + 4));
  return {
    emvItem,
    remainingText
  };
}
_chunkTUYBEZEZjs.__name.call(void 0, readNext, "readNext");
var functionGetName = {
  data: _chunkFVIXOHHUjs.getName,
  subData: _chunkFVIXOHHUjs.getNameSubData,
  additionalFields: _chunkFVIXOHHUjs.getNameAdditionalFields,
  paymentSpecific: _chunkFVIXOHHUjs.getNamePaymentSpecific
};
function getNameData(spec, id) {
  return functionGetName[spec](id);
}
_chunkTUYBEZEZjs.__name.call(void 0, getNameData, "getNameData");
function addMetaData(emvItem) {
  if (emvItem.name == "Merchant Account Information") {
    emvItem.data = decode(emvItem.data, "subData");
  }
  if (emvItem.id == 62) {
    emvItem.data = decode(emvItem.data, "subData");
  }
  if (emvItem.id == 80) {
    emvItem.data = decode(emvItem.data, "subData");
  }
  if (emvItem.id == 52) {
    const mcc_code = _chunkJMG4H2BFjs.data.mcc.find((item) => item.mcc === emvItem.data);
    mcc_code && (emvItem.data = `${emvItem.data} (${mcc_code.usda_description})`);
  }
  if (emvItem.id == 53) {
    const currency = _chunkJMG4H2BFjs.data.currencies.find((item) => item.number === emvItem.data);
    currency && (emvItem.data = `${currency.code}`);
  }
  if (emvItem.id == 58) {
    const country = _chunkJMG4H2BFjs.data.countries.find((item) => item.code === emvItem.data);
    country && (emvItem.data = `${emvItem.data} (${country.name})`);
  }
  return emvItem;
}
_chunkTUYBEZEZjs.__name.call(void 0, addMetaData, "addMetaData");
function addMetaDataForAdditionalFields(emvItem) {
  if (emvItem.id == "60") {
    emvItem.data = decode(emvItem.data, "paymentSpecific");
  }
  return emvItem;
}
_chunkTUYBEZEZjs.__name.call(void 0, addMetaDataForAdditionalFields, "addMetaDataForAdditionalFields");



exports.decode = decode;
//# sourceMappingURL=chunk-L7QBLI6R.js.map