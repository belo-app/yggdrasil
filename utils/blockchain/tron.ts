import * as bip39 from "bip39";
import * as hdAddress from "hd-address";

import { BlockchainAddressType, BlockchainService } from "./generic";

export class TronService extends BlockchainService {
  public async getUserAddresses(userId: string) {
    const seed = await bip39.mnemonicToSeed(this.seedPhrase);
    const hd = hdAddress.HD(seed, hdAddress.keyType.seed);

    const tron = hd.TRX.getAddress(Number(userId));

    if (!tron.address) {
      throw new Error("Invalid seed phrase");
    }

    return [
      {
        type: "TRC20" as BlockchainAddressType,
        value: tron.address,
        pubKey: tron.pub.toString("base64"),
      },
    ];
  }

  public getRandomAddress() {
    const { seed } = hdAddress.seed.getRandomSeed();
    const hd = hdAddress.HD(seed, hdAddress.keyType.seed);

    const tron = hd.TRX.getAddress(Math.floor(Math.random() * 1000));
    return {
      type: "TRC20" as BlockchainAddressType,
      value: tron.address,
      pubKey: tron.pub.toString("base64"),
    };
  }
}
