import * as s from "superstruct";

export const isTrueValidation = s.refine(
  s.boolean(),
  "isTrueValidation",
  (value) => value === true
);

export const isFalseValidation = s.refine(
  s.boolean(),
  "isTrueValidation",
  (value) => value === false
);

export const streetNumberValidation = s.refine(
  s.string(),
  "streetNumberValidation",
  (value) => {
    return /^\d{1,5}$/.test(value) || value.length > 0;
  }
);

export function isNullOrOptional(shape: s.Struct<any, any>) {
  return s.optional(s.nullable(shape));
}
export const intRegex = /^\d+$/;

export const isStringInt = s.define("stringInt", (value: any) =>
  intRegex.test(value)
);
