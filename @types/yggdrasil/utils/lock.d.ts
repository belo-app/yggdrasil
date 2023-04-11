import { Redis } from "ioredis";
export type AsyncFunction<T> = () => Promise<T>;
export declare class Lock {
    private key;
    private redlock;
    private acquireDuration;
    constructor(key: string | string[], redis: Redis, options?: Partial<{
        retryInterval: number;
        retryLimit: number;
        acquireDuration: number;
    }>);
    isFree(): Promise<boolean>;
    acquire<T>(asyncFunction: AsyncFunction<T>, throwError?: boolean): Promise<T>;
    private get keys();
}
//# sourceMappingURL=lock.d.ts.map