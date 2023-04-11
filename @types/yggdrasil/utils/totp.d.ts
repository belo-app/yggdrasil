declare class Totp {
    generateSecret(issuer: string, account: string): {
        secret: string;
        uri: string;
        qr: string;
    };
    verifyToken(secret: string, token: string): boolean;
    generateToken(secret: string): string | undefined;
}
export declare const totp: Totp;
export {};
//# sourceMappingURL=totp.d.ts.map