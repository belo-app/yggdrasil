"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNamePaymentSpecific = exports.getNameAdditionalFields = exports.getNameSubData = exports.getName = void 0;
const schema_1 = __importDefault(require("./schema"));
const schema_additional_fields_1 = __importDefault(require("./schema-additional-fields"));
const schema_payment_specific_1 = __importDefault(require("./schema-payment-specific"));
const schema_sub_data_1 = __importDefault(require("./schema-sub-data"));
function getName(stringId) {
    let dataObject = schema_1.default[stringId];
    if (!dataObject) {
        const id = Number.parseInt(stringId);
        id >= 2 && id <= 51 && (dataObject = schema_1.default["02-51"]);
        id >= 65 && id <= 79 && (dataObject = schema_1.default["65-79"]);
        id >= 80 && id <= 99 && (dataObject = schema_1.default["80-99"]);
    }
    return dataObject?.name;
}
exports.getName = getName;
function getNameSubData(stringId) {
    const dataObject = schema_sub_data_1.default[stringId];
    return dataObject?.name;
}
exports.getNameSubData = getNameSubData;
function getNameAdditionalFields(stringId) {
    let dataObject = schema_additional_fields_1.default[stringId];
    if (!dataObject) {
        const id = Number.parseInt(stringId);
        id >= 10 &&
            id <= 49 &&
            (dataObject = schema_additional_fields_1.default["10-49"]);
        id >= 50 &&
            id <= 99 &&
            (dataObject = schema_additional_fields_1.default["50-99"]);
    }
    return dataObject?.name;
}
exports.getNameAdditionalFields = getNameAdditionalFields;
function getNamePaymentSpecific(stringId) {
    let dataObject = schema_payment_specific_1.default[stringId];
    if (!dataObject) {
        const id = Number.parseInt(stringId);
        id >= 1 && id <= 99 && (dataObject = schema_payment_specific_1.default["01-99"]);
    }
    return dataObject?.name;
}
exports.getNamePaymentSpecific = getNamePaymentSpecific;
