import { generateSecret, generateToken, verifyToken } from "node-2fa";

class Totp {
  public generateSecret(issuer: string, account: string) {
    return generateSecret({
      name: issuer,
      account,
    });
  }

  public verifyToken(secret: string, token: string) {
    const verification = verifyToken(secret, token);

    return verification != undefined;
  }

  public generateToken(secret: string) {
    const { token } = generateToken(secret) ?? {};

    return token;
  }
}

export const totp = new Totp();
