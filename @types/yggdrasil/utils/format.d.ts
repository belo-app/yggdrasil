import { Decimal } from "decimal.js";
export declare function formatCurrencyAmount({ amount, code, symbol, locale, options, }: {
    amount: string;
    code?: string;
    symbol?: string;
    locale?: string;
    options?: Intl.NumberFormatOptions;
}): string;
export declare function getDNIfromCUIT(cuit: string): string;
export declare function startCase(value: string): string;
export declare function emptyStringToUndefined(value: string, trim?: boolean): string | undefined;
export declare function replace(value: string, regex: RegExp | string): string | undefined;
export declare function removeAccents(value: string): string | undefined;
export declare function cleanSpecialCharacters(value: string): string | undefined;
export declare function checkIp(ip: string, ips: string | string[]): boolean;
export declare const bitcoinToSatoshis: (value: Decimal.Value) => Decimal;
export declare const satoshisToBitcoin: (value: Decimal.Value) => Decimal;
export declare const getUuidFormat: (value: string | number) => string;
export declare function toFixedDecimals(value: string | number | Decimal, decimalPlaces?: number): string;
export declare const getFirstNCharacters: (value: string, n: number) => string;
//# sourceMappingURL=format.d.ts.map