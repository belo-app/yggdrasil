export type BlockchainAddressType = "TRC20" | "P2SH" | "BECH32" | "LN" | "P2PKH" | "ERC20";
export interface BlockchainAddressData {
    type: BlockchainAddressType;
    value: string;
    pubKey?: string;
    hash?: string;
}
export declare abstract class BlockchainService {
    protected seedPhrase: string;
    constructor(seedPhrase: string);
    abstract getUserAddresses(_userId: string): Promise<BlockchainAddressData[]>;
    abstract getRandomAddress(type?: BlockchainAddressType): BlockchainAddressData | undefined;
}
//# sourceMappingURL=generic.d.ts.map