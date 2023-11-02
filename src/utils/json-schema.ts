import {
  JavaScriptTypeBuilder as TypeBuilder,
  Kind,
  Optional,
  TEnum,
  TOptional,
  TSchema,
} from "@sinclair/typebox";

const DateKind = Symbol("DateKind");

interface TDate extends TSchema {
  type: "string";
  $static: Date;
  kind: typeof DateKind;
}

interface TObjectId extends TSchema {
  type: "string";
}

class BeloTypeBuilder extends TypeBuilder {
  public Optional<T extends TSchema>(item: T): TOptional<T> {
    if (item?.[Kind] == "Union") {
      return item as any;
    }
    return { ...item, [Optional]: "Optional", nullable: true } as any;
  }

  public Enum<T extends Record<string, string | number>>(item: T): TEnum<T> {
    return { type: "string", enum: Object.keys(item) } as any;
  }

  public DateString(): TDate {
    return this.String() as any;
  }

  public ObjectId(): TObjectId {
    return this.String();
  }
}

export const Type = new BeloTypeBuilder();
