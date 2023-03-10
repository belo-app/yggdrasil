import { BlockchainAddressType, BlockchainService } from "./generic";
export declare class TronService extends BlockchainService {
    getUserAddresses(userId: string): Promise<{
        type: BlockchainAddressType;
        value: any;
        pubKey: any;
    }[]>;
    getRandomAddress(): {
        type: BlockchainAddressType;
        value: any;
        pubKey: any;
    };
}
//# sourceMappingURL=tron.d.ts.map