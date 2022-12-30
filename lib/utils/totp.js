"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totp = void 0;
const node_2fa_1 = require("node-2fa");
class Totp {
    generateSecret(issuer, account) {
        return (0, node_2fa_1.generateSecret)({
            name: issuer,
            account,
        });
    }
    verifyToken(secret, token) {
        const verification = (0, node_2fa_1.verifyToken)(secret, token);
        return verification != undefined;
    }
    generateToken(secret) {
        const { token } = (0, node_2fa_1.generateToken)(secret) ?? {};
        return token;
    }
}
exports.totp = new Totp();
