import dataObjectsSchema from "./schema";
import additionalFieldsObjectsSchema from "./schema-additional-fields";
import paymentSpecificObjectsSchema from "./schema-payment-specific";
import subDataObjectsSchema from "./schema-sub-data";

export function getName(stringId: string) {
  let dataObject = dataObjectsSchema[stringId];
  if (!dataObject) {
    const id = Number.parseInt(stringId);
    id >= 2 && id <= 51 && (dataObject = dataObjectsSchema["02-51"]);
    id >= 65 && id <= 79 && (dataObject = dataObjectsSchema["65-79"]);
    id >= 80 && id <= 99 && (dataObject = dataObjectsSchema["80-99"]);
  }
  return dataObject?.name;
}

export function getNameSubData(stringId) {
  const dataObject = subDataObjectsSchema[stringId];
  return dataObject?.name;
}

export function getNameAdditionalFields(stringId) {
  let dataObject = additionalFieldsObjectsSchema[stringId];
  if (!dataObject) {
    const id = Number.parseInt(stringId);
    id >= 10 &&
      id <= 49 &&
      (dataObject = additionalFieldsObjectsSchema["10-49"]);
    id >= 50 &&
      id <= 99 &&
      (dataObject = additionalFieldsObjectsSchema["50-99"]);
  }
  return dataObject?.name;
}

export function getNamePaymentSpecific(stringId) {
  let dataObject = paymentSpecificObjectsSchema[stringId];
  if (!dataObject) {
    const id = Number.parseInt(stringId);
    id >= 1 && id <= 99 && (dataObject = paymentSpecificObjectsSchema["01-99"]);
  }
  return dataObject?.name;
}
