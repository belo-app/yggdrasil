import { Decimal } from "decimal.js";
import ipRangeCheck from "ip-range-check";
import { capitalize } from "lodash";

export function formatCurrencyAmount({
  amount,
  code,
  symbol,
  locale = "es",
  options = {},
}: {
  amount: string;
  code?: string;
  symbol?: string;
  locale?: string;
  options?: Intl.NumberFormatOptions;
}) {
  const formatNumber = new Intl.NumberFormat(locale, options).format(
    amount as any
  );
  return symbol ? `${symbol}${formatNumber}` : `${formatNumber} ${code ?? ""}`;
}

export function getDNIfromCUIT(cuit: string) {
  return cuit.slice(2, -1);
}

export function startCase(value: string) {
  return value
    .trim()
    .split(" ")
    .map((word) => capitalize(word))
    .filter(Boolean)
    .join(" ");
}

export function emptyStringToUndefined(
  value: string,
  trim = true
): string | undefined {
  const data = trim ? value.trim() : value;
  return data ? data : undefined;
}

export function replace(
  value: string,
  regex: RegExp | string
): string | undefined {
  return value ? value.replaceAll(regex, "") : undefined;
}

export function removeAccents(value: string) {
  return replace(value.normalize("NFD"), /[\u0300-\u036F]/g);
}

export function cleanSpecialCharacters(value: string) {
  return replace(removeAccents(value.trim()) ?? "", /[^ A-Za-z]/g);
}

export function checkIp(ip: string, ips: string | string[]) {
  return ipRangeCheck(ip, ips);
}

export const bitcoinToSatoshis = (value: Decimal.Value) => {
  return new Decimal(value).mul(100_000_000).floor();
};

export const satoshisToBitcoin = (value: Decimal.Value) => {
  return new Decimal(value).div(100_000_000);
};

export const getUuidFormat = (value: string | number) => {
  const normalizedValue = String(value).trim().replaceAll("-", "");
  if (normalizedValue.length > 32) {
    throw new Error("The value length must be lower than 32");
  }

  const result = normalizedValue.padStart(32, "0");
  let skippedCharacter = 0;
  return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(
    /[x-]/g,
    (match: string, index: number) => {
      if (match !== "x") {
        skippedCharacter++;
        return match;
      }

      return result[index - skippedCharacter] ?? "";
    }
  );
};

export function toFixedDecimals(
  value: string | number | Decimal,
  decimalPlaces?: number
) {
  return new Decimal(value).toDP(decimalPlaces).toString();
}

export const getFirstNCharacters = (value: string, n: number) => {
  return value.slice(0, n);
};
