import { CacheStorage } from "./p-memoize";
export declare class Cache<Value = any> implements CacheStorage<string, Value> {
    private prefix;
    private client;
    constructor(redisUrl: string, prefix?: string);
    private getKey;
    set(key: string, value: Value, options?: {
        maxAge?: number;
    }): Promise<any>;
    get(key: string): Promise<Value | undefined>;
    has(key: string): Promise<boolean>;
    delete(key: string | string[]): Promise<void>;
    decrementUntil(key: string, value?: number): Promise<any>;
}
//# sourceMappingURL=cache.d.ts.map