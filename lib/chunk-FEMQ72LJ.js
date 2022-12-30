"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class;

var _chunkJHDA7UZFjs = require('./chunk-JHDA7UZF.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/phone.ts
var _googlelibphonenumber = require('google-libphonenumber');
var ExtraPhoneNumberFormat;
(function(ExtraPhoneNumberFormat2) {
  ExtraPhoneNumberFormat2["RAW_NATIONAL"] = "RAW_NATIONAL";
})(ExtraPhoneNumberFormat || (ExtraPhoneNumberFormat = exports.ExtraPhoneNumberFormat = {}));
var PhoneParser = (_class = class {constructor() { _class.prototype.__init.call(this); }
  __init() {this.parser = _googlelibphonenumber.PhoneNumberUtil.getInstance()}
  rawParse(phoneNumber, countryCode) {
    try {
      return this.parser.parseAndKeepRawInput(phoneNumber, countryCode);
    } catch (e) {
      throw _chunkJHDA7UZFjs.Errors.invalidPhoneNumber("Invalid format");
    }
  }
  validatePhoneForRegion(phone, countryCode) {
    const isValidPhone = this.parser.isValidNumberForRegion(phone, countryCode);
    if (!isValidPhone) {
      throw _chunkJHDA7UZFjs.Errors.invalidPhoneNumber("Invalid country");
    }
  }
  format(phone, format) {
    if (format === ExtraPhoneNumberFormat.RAW_NATIONAL) {
      return String(_nullishCoalesce(phone.getNationalNumber(), () => ( "")));
    }
    return this.parser.format(phone, format);
  }
  parseAndValidatePhoneNumber(phoneNumber, countryCode, format = _googlelibphonenumber.PhoneNumberFormat.E164) {
    const phone = this.rawParse(phoneNumber, countryCode);
    this.validatePhoneForRegion(phone, countryCode);
    return this.format(phone, format);
  }
}, _class);
_chunkTUYBEZEZjs.__name.call(void 0, PhoneParser, "PhoneParser");
var phoneParser = new PhoneParser();





exports.ExtraPhoneNumberFormat = ExtraPhoneNumberFormat; exports.PhoneParser = PhoneParser; exports.phoneParser = phoneParser;
//# sourceMappingURL=chunk-FEMQ72LJ.js.map