import * as redis from "redis";

interface RedisOptions {
  PX?: number;
  KEEPTTL?: boolean;
}

export class RedisClient {
  private url: string;
  private client: any;
  private hashScripts: Record<string, string> = {};

  constructor(url: string) {
    if (!url) {
      throw new Error("Can't create redis client without url");
    }

    this.url = url;
  }

  private async instance() {
    if (!this.client) {
      this.client = redis.createClient({ url: this.url });
      await this.client.connect();
      return this.client;
    }

    return this.client;
  }

  public async set(key: string, data: string, options: RedisOptions = {}) {
    const instance = await this.instance();

    const { PX, KEEPTTL } = options;

    const newOptions = {
      KEEPTTL,
    };

    if (typeof PX === "number" && !Number.isNaN(PX) && !KEEPTTL) {
      newOptions["PX"] = PX;
    }

    try {
      return instance.set(key, data, newOptions);
    } catch {
      return false;
    }
  }

  public async get(key: string) {
    const instance = await this.instance();

    return instance.get(key);
  }

  public async delete(key: string | string[]) {
    const instance = await this.instance();

    await instance.del(key);
  }

  public async decrementUntil(key: string, value = 0) {
    const instance = await this.instance();
    const script = this.hashScripts[key];
    const data = { keys: [key], arguments: [String(value)] };

    if (script) {
      return instance.evalSha(script, data);
    }

    const hashScript = await instance.scriptLoad(
      `local value = redis.call('GET', KEYS[1]) or '0'
       if value > '0' then 
       return redis.call('DECR',KEYS[1]) 
       else 
       error('Value lower than ${value}')
       end`
    );
    this.hashScripts[key] = hashScript;
    return instance.evalSha(hashScript, data);
  }
}
