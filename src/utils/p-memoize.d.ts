import type { AsyncReturnType } from "type-fest";
type AnyAsyncFunction = (...arguments_: readonly any[]) => Promise<unknown | void>;
export interface CacheStorage<KeyType, ValueType> {
    has: (key: KeyType) => Promise<boolean> | boolean;
    get: (key: KeyType) => Promise<ValueType | undefined> | ValueType | undefined;
    set: (key: KeyType, value: ValueType, options?: {
        maxAge?: number;
    }) => void;
    delete: (key: KeyType) => void;
    clear?: () => void;
}
interface Options<FunctionToMemoize extends AnyAsyncFunction, CacheKeyType> {
    readonly cacheKey?: (...arguments_: Parameters<FunctionToMemoize>) => CacheKeyType;
    readonly cache?: CacheStorage<CacheKeyType, AsyncReturnType<FunctionToMemoize>>;
    readonly maxAge?: number;
}
export declare function pMemoize<FunctionToMemoize extends AnyAsyncFunction, CacheKeyType>(function_: FunctionToMemoize, { cacheKey, cache, maxAge, }?: Options<FunctionToMemoize, CacheKeyType>): FunctionToMemoize;
export {};
