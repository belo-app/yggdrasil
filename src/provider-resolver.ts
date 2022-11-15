import memoizee from "memoizee";

interface Constructor<T = any> extends Function {
  new (...arguments_: any[]): T;
}

type ProviderMap<EnumType, ProviderType> = {
  [key in keyof EnumType]?: ProviderType;
} & {
  default?: ProviderType;
};

export class ProviderResolver<
  EnumType extends Record<string, string | number>,
  ProviderType,
  ImplementationType extends ProviderType = ProviderType
> {
  constructor(
    private base: Constructor<ProviderType>,
    private providerClassMap: () => ProviderMap<
      EnumType,
      Constructor<ImplementationType>
    >
  ) {}

  public resolveByType(type: keyof EnumType | "default") {
    const instances = this.getInstances();

    return instances[type] ?? (instances.default as ImplementationType);
  }

  public getInstances = memoizee(
    (): ProviderMap<EnumType, ImplementationType> => {
      let instances: ProviderMap<EnumType, ImplementationType> = {};

      for (const [key, clazz] of Object.entries(this.providerClassMap())) {
        if (!clazz) {
          continue;
        }

        instances = {
          ...instances,
          [key]: new clazz(),
        };
      }

      const defaultInstance = new this.base();
      instances.default = defaultInstance as ImplementationType;

      return instances;
    }
  );
}
