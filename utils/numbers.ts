import { Decimal } from "decimal.js";

export function isZero(value: string | number | Decimal) {
  return new Decimal(value).isZero();
}

export function isBetween(
  value: number,
  number1: number,
  number2: number
): boolean {
  return value >= number1 && value <= number2;
}
