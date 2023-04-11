import * as s from "superstruct";
export declare const isTrueValidation: s.Struct<boolean, null>;
export declare const isFalseValidation: s.Struct<boolean, null>;
export declare const streetNumberValidation: s.Struct<string, null>;
export declare function isNullOrOptional(shape: s.Struct<any, any>): s.Struct<any, any>;
export declare const intRegex: RegExp;
export declare const isStringInt: s.Struct<unknown, null>;
//# sourceMappingURL=validate.d.ts.map