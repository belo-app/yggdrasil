import { JavaScriptTypeBuilder as TypeBuilder, TEnum, TOptional, TSchema } from "@sinclair/typebox";
declare const DateKind: unique symbol;
interface TDate extends TSchema {
    type: "string";
    $static: Date;
    kind: typeof DateKind;
}
interface TObjectId extends TSchema {
    type: "string";
}
declare class BeloTypeBuilder extends TypeBuilder {
    Optional<T extends TSchema>(item: T): TOptional<T>;
    Enum<T extends Record<string, string | number>>(item: T): TEnum<T>;
    DateString(): TDate;
    ObjectId(): TObjectId;
}
export declare const Type: BeloTypeBuilder;
export {};
//# sourceMappingURL=json-schema.d.ts.map