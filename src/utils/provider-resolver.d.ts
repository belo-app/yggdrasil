interface Constructor<T = any> extends Function {
    new (...arguments_: any[]): T;
}
type ProviderMap<EnumType, ProviderType> = {
    [key in keyof EnumType]?: ProviderType;
} & {
    default?: ProviderType;
};
export declare class ProviderResolver<EnumType extends Record<string, string | number>, ProviderType, ImplementationType extends ProviderType = ProviderType> {
    private base;
    private providerClassMap;
    constructor(base: Constructor<ProviderType>, providerClassMap: () => ProviderMap<EnumType, Constructor<ImplementationType>>);
    resolveByType(type: keyof EnumType | "default"): any;
    getInstances: any;
}
export {};
