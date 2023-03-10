import Decimal from "decimal.js";
type PriceData = {
    price: string;
    volume: string;
};
export declare const volumeAverage: (prices: PriceData[], totalVolume?: string, estimateVolume?: boolean) => Decimal;
export declare const average: (prices: PriceData[]) => Decimal;
export declare const convertVolume: (volume: string, price?: string, inverted?: boolean) => Decimal;
export declare const validAmount: (amount?: string | number | Decimal) => boolean;
export declare function difference(number1: Decimal | string | number, number2: Decimal | string | number): Decimal;
export {};
