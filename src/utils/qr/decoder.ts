import { data } from "../../utils/data";
import {
  getName,
  getNameAdditionalFields,
  getNamePaymentSpecific,
  getNameSubData,
} from "./models";

export type SpecQrData =
  | "data"
  | "subData"
  | "additionalFields"
  | "paymentSpecific";

export function decode(emvString: string, spec: SpecQrData = "data") {
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

function readNext(inputText: string, spec: SpecQrData) {
  const id = inputText.slice(0, 2);
  const stringLength = inputText.slice(2, 4);
  const length = Number.parseInt(stringLength);
  if (Number.isNaN(length)) {
    throw new TypeError(
      `Length definition expect a number. Incorrect length definition for value: ${inputText}.`
    );
  }
  const data = inputText.slice(4, length + 4);
  const emvItem = {
    id,
    name: getNameData(spec, id),
    len: length,
    data,
    rawData: data,
  };
  const remainingText = inputText.slice(Math.max(0, length + 4));
  return {
    emvItem,
    remainingText,
  };
}

const functionGetName = {
  data: getName,
  subData: getNameSubData,
  additionalFields: getNameAdditionalFields,
  paymentSpecific: getNamePaymentSpecific,
};

function getNameData(spec: SpecQrData, id: string) {
  return functionGetName[spec](id);
}

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
    const mcc_code = data.mcc.find((item) => item.mcc === emvItem.data);
    mcc_code &&
      (emvItem.data = `${emvItem.data} (${mcc_code.usda_description})`);
  }
  if (emvItem.id == 53) {
    const currency = data.currencies.find(
      (item) => item.number === emvItem.data
    );
    currency && (emvItem.data = `${currency.code}`);
  }
  if (emvItem.id == 58) {
    const country = data.countries.find((item) => item.code === emvItem.data);
    country && (emvItem.data = `${emvItem.data} (${country.name})`);
  }
  return emvItem;
}

function addMetaDataForAdditionalFields(emvItem) {
  if (emvItem.id == "60") {
    emvItem.data = decode(emvItem.data, "paymentSpecific");
  }
  return emvItem;
}
