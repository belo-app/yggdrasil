import { PhoneNumberFormat } from "google-libphonenumber";
export declare enum ExtraPhoneNumberFormat {
    RAW_NATIONAL = "RAW_NATIONAL"
}
export type BeloPhoneNumberFormat = PhoneNumberFormat | ExtraPhoneNumberFormat;
export declare class PhoneParser {
    private parser;
    private rawParse;
    private validatePhoneForRegion;
    private format;
    parseAndValidatePhoneNumber(phoneNumber: string, countryCode: string, format?: BeloPhoneNumberFormat): string;
}
export declare const phoneParser: PhoneParser;
//# sourceMappingURL=phone.d.ts.map