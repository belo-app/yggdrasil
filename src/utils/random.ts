import crypto, { BinaryToTextEncoding } from "crypto";

export const randomInt = (min = 1, max = 1000) =>
  Math.floor(Math.random() * (max - min) + min);

export const generateRandomToken = () => {
  const buffer = crypto.randomBytes(256);
  return crypto.createHash("sha1").update(buffer).digest("hex");
};

export const generateRandomSecret = () => {
  const buffer = crypto.randomBytes(256);
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

export const generateRandomPassword = () => {
  const buffer = crypto.randomBytes(256);
  return crypto.createHash("sha256").update(buffer).digest("base64");
};

export const generateSha256Hash = (
  value: string,
  format?: BinaryToTextEncoding
) => {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest(format ?? "base64");
};
