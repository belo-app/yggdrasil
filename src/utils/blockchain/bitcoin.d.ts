import { BlockchainAddressType, BlockchainService } from "./generic";
export declare class BitcoinService extends BlockchainService {
    getUserAddresses(userId: string): Promise<{
        type: BlockchainAddressType;
        value: string;
        pubKey: string;
        hash: string;
    }[]>;
    getRandomAddress(type?: BlockchainAddressType): {
        type: BlockchainAddressType;
        value: string;
        pubKey: string;
        hash: string;
    };
}
