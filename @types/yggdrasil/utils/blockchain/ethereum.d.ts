import { ethers } from "ethers";
import { BlockchainAddressType, BlockchainService } from "./generic";
export declare class EthereumService extends BlockchainService {
    provider: ethers.providers.AlchemyProvider;
    getUserAddresses(userId: string): Promise<{
        type: BlockchainAddressType;
        value: string;
        pubKey: string;
    }[]>;
    getRandomAddress(): {
        type: BlockchainAddressType;
        value: string;
        pubKey: string;
    };
}
//# sourceMappingURL=ethereum.d.ts.map