import BIP32Factory from "bip32";
import * as bip39 from "bip39";
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from "ecpair";
import * as bitcoin from "bitcoinjs-lib";

import { BlockchainAddressType, BlockchainService } from "./generic";

export class BitcoinService extends BlockchainService {
  public async getUserAddresses(userId: string) {
    const seed = await bip39.mnemonicToSeed(this.seedPhrase);
    const bip32 = BIP32Factory(ecc);

    const root = bip32.fromSeed(seed);

    // BIP 49 - For 3-addresses   - m/49'/0'/0'/0/0
    // BIP 84 - For bc1-addresses - m/84'/0'/0'/0/0
    // BIP 44 - For 1-addresses   - m/44'/0'/0'/0/0
    const { publicKey: pubkey } = root.derivePath(`m/44'/0'/0'/0/${userId}`);

    const bech32 = bitcoin.payments.p2wpkh({
      pubkey,
      network: bitcoin.networks.bitcoin,
    });
    const p2sh = bitcoin.payments.p2sh({
      redeem: bech32,
    });
    const p2pkh = bitcoin.payments.p2pkh({
      pubkey,
    });

    if (!p2sh.address || !bech32.address || !p2pkh.address) {
      throw new Error("Invalid seed phrase");
    }

    return [
      {
        type: "P2SH" as BlockchainAddressType,
        value: p2sh.address,
        pubKey: p2sh.pubkey?.toString("base64"),
        hash: p2sh.hash?.toString("base64"),
      },
      {
        type: "BECH32" as BlockchainAddressType,
        value: bech32.address,
        pubKey: bech32.pubkey?.toString("base64"),
        hash: bech32.hash?.toString("base64"),
      },
      {
        type: "P2PKH" as BlockchainAddressType,
        value: p2pkh.address,
        pubKey: p2pkh.pubkey?.toString("base64"),
        hash: p2pkh.hash?.toString("base64"),
      },
    ];
  }

  public getRandomAddress(type?: BlockchainAddressType) {
    const ECPair = ECPairFactory(ecc);
    const { publicKey } = ECPair.makeRandom();

    if (!type) {
      return;
    }

    switch (type as any) {
      case "BECH32": {
        const btc = bitcoin.payments.p2wpkh({
          pubkey: publicKey,
          network: bitcoin.networks.bitcoin,
        });
        if (!btc?.address) {
          return;
        }
        return {
          type,
          value: btc.address,
          pubKey: btc.pubkey?.toString("base64"),
          hash: btc.hash?.toString("base64"),
        };
      }
      case "P2SH": {
        const btc = bitcoin.payments.p2sh({
          redeem: bitcoin.payments.p2wpkh({ pubkey: publicKey }),
        });
        if (!btc?.address) {
          return;
        }
        return {
          type,
          value: btc.address,
          pubKey: btc.redeem?.pubkey?.toString("base64"),
          hash: btc.redeem?.hash?.toString("base64"),
        };
      }
      case "P2PKH": {
        const btc = bitcoin.payments.p2pkh({
          pubkey: publicKey,
        });
        if (!btc?.address) {
          return;
        }
        return {
          type,
          value: btc.address,
          pubKey: btc.pubkey?.toString("base64"),
          hash: btc.hash?.toString("base64"),
        };
      }
      default: {
        return;
      }
    }
  }
}
