import {
  PhoneNumber,
  PhoneNumberFormat,
  PhoneNumberUtil,
} from "google-libphonenumber";

import { Errors } from "./error";

export enum ExtraPhoneNumberFormat {
  RAW_NATIONAL = "RAW_NATIONAL",
}

export type BeloPhoneNumberFormat = PhoneNumberFormat | ExtraPhoneNumberFormat;

export class PhoneParser {
  private parser = PhoneNumberUtil.getInstance();

  private rawParse(phoneNumber: string, countryCode: string) {
    try {
      return this.parser.parseAndKeepRawInput(phoneNumber, countryCode);
    } catch {
      throw Errors.invalidPhoneNumber("Invalid format");
    }
  }

  private validatePhoneForRegion(phone: PhoneNumber, countryCode: string) {
    const isValidPhone = this.parser.isValidNumberForRegion(phone, countryCode);

    if (!isValidPhone) {
      throw Errors.invalidPhoneNumber("Invalid country");
    }
  }

  private format(phone: PhoneNumber, format: BeloPhoneNumberFormat) {
    if (format === ExtraPhoneNumberFormat.RAW_NATIONAL) {
      return String(phone.getNationalNumber() ?? "");
    }
    return this.parser.format(phone, format);
  }

  public parseAndValidatePhoneNumber(
    phoneNumber: string,
    countryCode: string,
    format: BeloPhoneNumberFormat = PhoneNumberFormat.E164
  ) {
    const phone = this.rawParse(phoneNumber, countryCode);

    this.validatePhoneForRegion(phone, countryCode);

    return this.format(phone, format);
  }
}

export const phoneParser = new PhoneParser();
