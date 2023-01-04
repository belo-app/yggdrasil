import { ethers } from "ethers";

class EthereumNodeProvider {
  public provider!: ethers.providers.BaseProvider;
  private uri?: string = "https://cloudflare-eth.com";

  private hasToInit() {
    return !this.provider;
  }

  public instance() {
    const hasToInit = this.hasToInit();

    if (hasToInit) {
      this.provider = new ethers.providers.JsonRpcProvider(this.uri);
    }

    return this.provider;
  }
}

export const ethereumNode = new EthereumNodeProvider();
