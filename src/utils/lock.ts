import Redis from "ioredis";
import memoize from "memoizee";
import Redlock from "redlock";

import { environment } from "./environment";
import { Errors } from "./error";
import { logger } from "./logger";

export type AsyncFunction<T> = () => Promise<T>;

const getRedis = memoize(() => {
  return new Redis(environment.REDIS_URL, {
    enableOfflineQueue: false,
  });
});

export class Lock {
  private redlock: Redlock;
  private acquireDuration: number;

  constructor(
    private key: string | string[],
    options?: Partial<{
      retryInterval: number;
      retryLimit: number;
      acquireDuration: number;
    }>
  ) {
    const redis = getRedis();

    this.redlock = new Redlock([redis], {
      driftFactor: 0.01,
      retryCount: options?.retryLimit ?? 20,
      retryDelay: options?.retryInterval ?? 500,
      retryJitter: 100,
      automaticExtensionThreshold: 500,
    });

    this.acquireDuration = options?.acquireDuration ?? 50_000;
  }

  public async isFree() {
    try {
      await this.redlock.using(this.keys, 1000, { retryCount: 0 }, () =>
        Promise.resolve()
      );
    } catch {
      return false;
    }

    return true;
  }

  public async acquire<T>(
    asyncFunction: AsyncFunction<T>,
    throwError = false
  ): Promise<T> {
    let lock;

    try {
      lock = await this.redlock.acquire(this.keys, this.acquireDuration);
    } catch (error) {
      logger.error(`Could not acquire lock ${this.key}`, {
        error,
        key: this.key,
      });
      if (throwError) {
        throw Errors.lockCouldNotAcquireKeys("Could not acquire keys", {
          keys: this.key,
          error,
        });
      }
    }

    return asyncFunction().finally(() =>
      lock?.release().catch((error) =>
        logger.error(`Could not release lock for key ${this.key}`, {
          error,
          key: this.key,
        })
      )
    );
  }

  private get keys() {
    return Array.isArray(this.key) ? this.key : [this.key];
  }
}
