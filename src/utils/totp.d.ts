declare class Totp {
    generateSecret(issuer: string, account: string): {
        secret: string;
        uri: string;
        qr: string;
    };
    verifyToken(secret: string, token: string): boolean;
    generateToken(secret: string): string;
}
export declare const totp: Totp;
export {};
