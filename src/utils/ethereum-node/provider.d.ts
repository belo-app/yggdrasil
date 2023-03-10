import { ethers } from "ethers";
declare class EthereumNodeProvider {
    provider: ethers.providers.BaseProvider;
    private uri?;
    private hasToInit;
    instance(): ethers.providers.BaseProvider;
}
export declare const ethereumNode: EthereumNodeProvider;
export {};
