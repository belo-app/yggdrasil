interface RedisOptions {
    PX?: number;
    KEEPTTL?: boolean;
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
export {};
//# sourceMappingURL=redis-client.d.ts.map