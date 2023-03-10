type BatchHandler<T = any> = (items: T[]) => void;
declare class BatchQueue<T> {
    private handler;
    private size;
    private queue;
    private processing;
    constructor(handler: BatchHandler<T>, size?: number);
    add(item: T): void;
    private process;
}
export declare const batchQueue: <T>(callback: BatchHandler<T>) => BatchQueue<T>;
export {};
