"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneParser = exports.PhoneParser = exports.ExtraPhoneNumberFormat = void 0;
const google_libphonenumber_1 = require("google-libphonenumber");
const error_1 = require("./error");
var ExtraPhoneNumberFormat;
(function (ExtraPhoneNumberFormat) {
    ExtraPhoneNumberFormat["RAW_NATIONAL"] = "RAW_NATIONAL";
})(ExtraPhoneNumberFormat = exports.ExtraPhoneNumberFormat || (exports.ExtraPhoneNumberFormat = {}));
class PhoneParser {
    constructor() {
        this.parser = google_libphonenumber_1.PhoneNumberUtil.getInstance();
    }
    rawParse(phoneNumber, countryCode) {
        try {
            return this.parser.parseAndKeepRawInput(phoneNumber, countryCode);
        }
        catch {
            throw error_1.Errors.invalidPhoneNumber("Invalid format");
        }
    }
    validatePhoneForRegion(phone, countryCode) {
        const isValidPhone = this.parser.isValidNumberForRegion(phone, countryCode);
        if (!isValidPhone) {
            throw error_1.Errors.invalidPhoneNumber("Invalid country");
        }
    }
    format(phone, format) {
        if (format === ExtraPhoneNumberFormat.RAW_NATIONAL) {
            return String(phone.getNationalNumber() ?? "");
        }
        return this.parser.format(phone, format);
    }
    parseAndValidatePhoneNumber(phoneNumber, countryCode, format = google_libphonenumber_1.PhoneNumberFormat.E164) {
        const phone = this.rawParse(phoneNumber, countryCode);
        this.validatePhoneForRegion(phone, countryCode);
        return this.format(phone, format);
    }
}
exports.PhoneParser = PhoneParser;
exports.phoneParser = new PhoneParser();
