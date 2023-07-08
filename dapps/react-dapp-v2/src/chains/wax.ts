import { NamespaceMetadata, ChainMetadata, ChainsMap } from "../helpers";

export const WAXChainData: ChainsMap = {
  "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4": {
    id: "wax:1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    name: "WAX Mainnet",
    rpc: [ "https://wax.greymass.com/v1/chain/" ],
    slip44: 501,
    testnet: false,
  },
  "e0b5f2532f0f4fcc4da2fc440943131b2f041f5c522c09e9f2fd0b8ba74ef5b6": {
    id: "wax:e0b5f2532f0f4fcc4da2fc440943131b2f041f5c522c09e9f2fd0b8ba74ef5b6",
    name: "WAX Testnet",
    rpc: [ "https://stg2-history.thh.io/v1/chain/" ],
    slip44: 501,
    testnet: true,
  },
};

export const WAXMetadata: NamespaceMetadata = {
  // WAX Mainnet
  "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4": {
    logo: "/assets/solana_logo.png",
    rgb: "0, 0, 0",
  },
  // WAX Testnet
  "e0b5f2532f0f4fcc4da2fc440943131b2f041f5c522c09e9f2fd0b8ba74ef5b6": {
    logo: "/assets/solana_logo.png",
    rgb: "0, 0, 0",
  },
};

export function getChainMetadata(chainId: string): ChainMetadata {
  const reference = chainId.split(":")[1];
  const metadata = WAXMetadata[reference];
  if (typeof metadata === "undefined") {
    throw new Error(`No chain metadata found for chainId: ${chainId}`);
  }
  return metadata;
}
