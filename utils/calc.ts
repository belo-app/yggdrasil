import Decimal from "decimal.js";

type PriceData = {
  price: string;
  volume: string;
};

export const volumeAverage = (
  prices: PriceData[],
  totalVolume?: string,
  estimateVolume?: boolean
) => {
  if (!totalVolume) {
    return average(prices);
  }

  let volumeAccumulated = estimateVolume
    ? convertVolume(totalVolume, prices[0]?.price, estimateVolume)
    : new Decimal(totalVolume);
  const data: PriceData[] = [];

  for (const price of prices) {
    if (volumeAccumulated.lessThanOrEqualTo(0)) {
      break;
    }
    data.push(price);
    volumeAccumulated = volumeAccumulated.minus(price.volume);
  }

  return average(data);
};

export const average = (prices: PriceData[]) => {
  const volume = prices.reduce(
    (vol, next) => vol.add(next.volume),
    new Decimal(0)
  );
  const priceVolume = prices.reduce(
    (price, next) => price.add(new Decimal(next.price).mul(next.volume)),
    new Decimal(0)
  );

  return priceVolume.div(volume);
};

export const convertVolume = (
  volume: string,
  price = "0",
  inverted?: boolean
) => {
  const isNegativePrice = new Decimal(price).lessThanOrEqualTo(0);

  if (isNegativePrice) {
    return new Decimal(volume);
  }

  return inverted
    ? new Decimal(volume).div(price)
    : new Decimal(volume).mul(price);
};

export const validAmount = (amount?: string | number | Decimal) => {
  try {
    return new Decimal(amount as string).greaterThan(0);
  } catch {
    return false;
  }
};

export function difference(
  number1: Decimal | string | number,
  number2: Decimal | string | number
) {
  return new Decimal(number1).minus(number2);
}
