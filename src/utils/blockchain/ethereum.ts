import { ethers } from "ethers";

import { BlockchainAddressType, BlockchainService } from "./generic";

export class EthereumService extends BlockchainService {
  provider = new ethers.providers.AlchemyProvider();

  public async getUserAddresses(userId: string) {
    const wallet = ethers.Wallet.fromMnemonic(
      this.seedPhrase,
      `m/44'/60'/0'/0/${userId}`
    );

    return [
      {
        type: "ERC20" as BlockchainAddressType,
        value: wallet.address,
        pubKey: wallet.publicKey,
      },
    ];
  }

  public getRandomAddress() {
    const wallet = ethers.Wallet.createRandom();
    return {
      type: "ERC20" as BlockchainAddressType,
      value: wallet.address,
      pubKey: wallet.publicKey,
    };
  }
}
