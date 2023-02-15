export type BlockchainAddressType =
  | "TRC20"
  | "P2SH"
  | "BECH32"
  | "LN"
  | "P2PKH"
  | "ERC20";

export interface BlockchainAddressData {
  type: BlockchainAddressType;
  value: string;
  pubKey?: string;
  hash?: string;
}

export abstract class BlockchainService {
  protected seedPhrase!: string;

  constructor(seedPhrase: string) {
    this.seedPhrase = seedPhrase;
  }

  public abstract getUserAddresses(
    _userId: string
  ): Promise<BlockchainAddressData[]>;
  public abstract getRandomAddress(
    type?: BlockchainAddressType
  ): BlockchainAddressData | undefined;
}
