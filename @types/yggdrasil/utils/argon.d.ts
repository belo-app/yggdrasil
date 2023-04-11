declare class Argon {
    hash(password: string): Promise<string>;
    verify(hash: string, password: string): Promise<boolean>;
}
export declare const argon: Argon;
export {};
//# sourceMappingURL=argon.d.ts.map