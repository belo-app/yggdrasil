import { randomInt } from "./random";

export const getRewardSampleV2 = (): number => {
  const random = randomInt(1, 10_000);

  if (random < 9700) {
    return 0.02;
  }

  if (random < 9750) {
    return 0.04;
  }

  if (random < 9800) {
    return 0.06;
  }

  if (random < 9850) {
    return 0.08;
  }

  if (random < 9900) {
    return 0.12;
  }

  return 0.21;
};

export const getRewardRate = (_amount: number) => getRewardSampleV2();
