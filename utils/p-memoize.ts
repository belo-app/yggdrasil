/* eslint-disable @typescript-eslint/no-non-null-assertion */

import mimicFn from "mimic-fn";
import type { AsyncReturnType } from "type-fest";

type AnyAsyncFunction = (
  ...arguments_: readonly any[]
) => Promise<unknown | void>;

export interface CacheStorage<KeyType, ValueType> {
  has: (key: KeyType) => Promise<boolean> | boolean;
  get: (key: KeyType) => Promise<ValueType | undefined> | ValueType | undefined;
  set: (key: KeyType, value: ValueType, options?: { maxAge?: number }) => void;
  delete: (key: KeyType) => void;
  clear?: () => void;
}

interface Options<FunctionToMemoize extends AnyAsyncFunction, CacheKeyType> {
  readonly cacheKey?: (
    ...arguments_: Parameters<FunctionToMemoize>
  ) => CacheKeyType;

  readonly cache?: CacheStorage<
    CacheKeyType,
    AsyncReturnType<FunctionToMemoize>
  >;

  readonly maxAge?: number;
}

export function pMemoize<
  FunctionToMemoize extends AnyAsyncFunction,
  CacheKeyType
>(
  function_: FunctionToMemoize,
  {
    cacheKey,
    cache = new Map<CacheKeyType, AsyncReturnType<FunctionToMemoize>>(),
    maxAge,
  }: Options<FunctionToMemoize, CacheKeyType> = {}
): FunctionToMemoize {
  const memoized = async function (
    this: any,
    ...arguments_: Parameters<FunctionToMemoize>
  ): Promise<AsyncReturnType<FunctionToMemoize> | undefined> {
    const key = cacheKey
      ? cacheKey(...arguments_)
      : (arguments_[0] as CacheKeyType);

    const isCached = await cache.has(key);

    if (isCached) {
      return cache.get(key);
    }

    const promise = function_.apply(this, arguments_) as Promise<
      AsyncReturnType<FunctionToMemoize>
    >;

    try {
      const result = await promise;

      cache.set(key, result, { maxAge });

      return result;
    } catch (error: unknown) {
      throw error as Error;
    }
  } as FunctionToMemoize;

  mimicFn(memoized, function_);

  return memoized;
}
