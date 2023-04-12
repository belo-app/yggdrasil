import { CacheStorage } from "./p-memoize";
import { RedisClient } from "./redis-client";

export class Cache<Value = any> implements CacheStorage<string, Value> {
  private client: RedisClient;

  constructor(redisUrl: string, private prefix = "") {
    this.prefix = prefix;
    this.client = new RedisClient(redisUrl);
  }

  private getKey(key: string) {
    return `${this.prefix}-${key}`;
  }

  public async set(key: string, value: Value, options?: { maxAge?: number }) {
    try {
      const cacheKey = this.getKey(key);

      return await this.client.set(cacheKey, JSON.stringify(value), {
        ttl: options?.maxAge,
      });
    } catch {
      //
    }
  }

  public async get(key: string): Promise<Value | undefined> {
    try {
      const cacheKey = this.getKey(key);

      const value = await this.client.get(cacheKey);

      if (!value) {
        return;
      }

      return JSON.parse(value);
    } catch {
      //
    }
  }

  public async has(key: string): Promise<boolean> {
    try {
      const cacheKey = this.getKey(key);

      const value = await this.client.get(cacheKey);

      return !!value;
    } catch {
      return false;
    }
  }

  public delete(key: string | string[]) {
    const cacheKey = Array.isArray(key)
      ? key.map((item) => this.getKey(item))
      : this.getKey(key);

    return this.client.delete(cacheKey);
  }

  public async decrementUntil(key: string, value = 0) {
    const cacheKey = this.getKey(key);
    return this.client.decrementUntil(cacheKey, value);
  }
}
