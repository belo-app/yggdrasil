import { decode } from "./emvqr";

export function decodeEmvQr(qrData: string) {
  return decode(qrData);
}
