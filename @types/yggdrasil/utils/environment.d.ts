export declare function getEnvironment<T = string>(key: string, defaultValue?: T): T;
export declare const environment: {
    LOCAL: boolean;
    TEST: boolean;
    GIT_SHA: string;
};
export declare function extendSharedEnvironment<T>(packageEnvironment: T): typeof environment & T;
//# sourceMappingURL=environment.d.ts.map