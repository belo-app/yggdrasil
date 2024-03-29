export interface RedisOptions {
    ttl?: number;
    keepTtl?: boolean;
}
export declare class RedisClient {
    private url;
    private client;
    private hashScripts;
    constructor(url: string);
    private instance;
    set(key: string, data: string, options?: RedisOptions): Promise<any>;
    get(key: string): Promise<any>;
    delete(key: string | string[]): Promise<void>;
    decrementUntil(key: string, value?: number): Promise<any>;
}
//# sourceMappingURL=redis-client.d.ts.map