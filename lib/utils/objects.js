"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeArrays = exports.replaceElement = exports.removeFalsyValues = exports.removeUndefinedValues = void 0;
function removeUndefinedValues(object_) {
    return Object.keys(object_).reduce((object, key) => object_[key] !== undefined ? { ...object, [key]: object_[key] } : object, {});
}
exports.removeUndefinedValues = removeUndefinedValues;
function removeFalsyValues(object_) {
    return Object.keys(object_).reduce((object, key) => object_[key] ? { ...object, [key]: object_[key] } : object, {});
}
exports.removeFalsyValues = removeFalsyValues;
function replaceElement(object, newElement, condition) {
    return object.map((value) => condition(value, newElement) ? newElement : value);
}
exports.replaceElement = replaceElement;
function mergeArrays(objectA, objectB, condition) {
    return objectA.map((value) => {
        const newElement = objectB.find((element) => condition(element, value));
        return newElement ?? value;
    });
}
exports.mergeArrays = mergeArrays;
