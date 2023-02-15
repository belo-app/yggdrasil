import dayjs from "dayjs";
import {
  createSignedRequest,
  createUnsignedRequest,
  parsePaymentRequest,
} from "invoices";
import secp256k1 from "tiny-secp256k1";

import { removeUndefinedValues } from "../objects";
import { generateSha256Hash } from "../random";
import { uuid } from "../uuid";

export class LigthningNetworkService {
  public generateInvoice(
    privateKey: string,
    destination: string,
    {
      paymentId,
      amount,
      description = "",
      chainAddresses,
    }: {
      paymentId: string;
      amount: number;
      description?: string;
      chainAddresses?: string[];
    }
  ) {
    const data = removeUndefinedValues({
      chain_addresses: chainAddresses,
      created_at: dayjs().toISOString(),
      description,
      description_hash: generateSha256Hash(description, "hex"),
      id: generateSha256Hash(uuid(), "hex"),
      tokens: amount,
      network: "bitcoin",
      features: [
        { bit: 14, is_required: true, type: "payment_identifier" },
        { bit: 17, is_required: false, type: "multipath_payments_v0" },
        { bit: 9, is_required: false, type: "tlv_onion" },
      ],
      payment: generateSha256Hash(paymentId, "hex"),
    });

    const { hash, hrp, tags } = createUnsignedRequest(data);

    const signature = secp256k1.sign(
      Buffer.from(hash, "hex"),
      Buffer.from(privateKey, "hex")
    );
    return createSignedRequest({
      hrp,
      tags,
      destination,
      signature: Buffer.from(signature).toString("hex"),
    });
  }

  public readInvoice(value: string) {
    return parsePaymentRequest({ request: value });
  }
}
