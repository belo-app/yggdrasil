import { BlockchainAddressType, BlockchainService } from "./generic";
export declare class BitcoinService extends BlockchainService {
    getUserAddresses(userId: string): Promise<{
        type: BlockchainAddressType;
        value: string;
        pubKey: string | undefined;
        hash: string | undefined;
    }[]>;
    getRandomAddress(type?: BlockchainAddressType): {
        type: BlockchainAddressType;
        value: string;
        pubKey: string | undefined;
        hash: string | undefined;
    } | undefined;
}
//# sourceMappingURL=bitcoin.d.ts.map