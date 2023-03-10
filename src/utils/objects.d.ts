export declare function removeUndefinedValues<T extends Record<any, any>>(object_: Partial<T>): T;
export declare function removeFalsyValues(object_: Record<any, any>): {};
export declare function replaceElement<Type>(object: Type[], newElement: Type, condition: (a: Type, b: Type) => boolean): Type[];
export declare function mergeArrays<Type>(objectA: Type[], objectB: Type[], condition: (a: Type, b: Type) => boolean): Type[];
