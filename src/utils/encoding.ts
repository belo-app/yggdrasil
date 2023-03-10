export function toBase64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}
