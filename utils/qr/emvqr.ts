import { validateChecksum } from "./checksum";
import { decode as decoder, SpecQrData } from "./decoder";

export function decode(emvString: string, spec: SpecQrData = "data") {
  if (!validateChecksum(emvString)) {
    throw new Error("checksum validation failed.");
  }

  return decoder(emvString, spec);
}
