export declare function backoff<T>(handler: () => Promise<T>, { maxAttempts, delayInMilliseconds, }: {
    maxAttempts: number;
    delayInMilliseconds: number;
}): Promise<{
    data: T;
    attempt: number;
}>;
//# sourceMappingURL=backoff.d.ts.map