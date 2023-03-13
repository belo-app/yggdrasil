import { Decimal } from "decimal.js";

export function isZero(value: string | number | Decimal) {
  return new Decimal(value).isZero();
}
