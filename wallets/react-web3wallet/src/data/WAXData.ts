/**
 * Types
 */
export type TWAXChain = keyof typeof WAX_MAINNET_CHAINS

/**
 * Chains
 */
export const WAX_MAINNET_CHAINS = {
  'wax:1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': {
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    name: 'WAX Mainnet',
    logo: '/chain-logos/solana-4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ.png',
    rgb: '30, 240, 166',
    rpc: ''
  }
}

export const WAX_TEST_CHAINS = {
  'wax:e0b5f2532f0f4fcc4da2fc440943131b2f041f5c522c09e9f2fd0b8ba74ef5b6': {
    chainId: 'e0b5f2532f0f4fcc4da2fc440943131b2f041f5c522c09e9f2fd0b8ba74ef5b6',
    name: 'WAX Testnet',
    logo: '/chain-logos/solana-4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ.png',
    rgb: '30, 240, 166',
    rpc: ''
  }
}

export const WAX_CHAINS = { ...WAX_MAINNET_CHAINS, ...WAX_TEST_CHAINS }

/**
 * Methods
 */
export const WAX_SIGNING_METHODS = {
  WAX_SIGN_TRANSACTION: 'wax_sign_transaction',
  WAX_SIGN_MESSAGE: 'wax_sign_message',
  WAX_PUSH_TRANSACTION: 'wax_push_transaction',
  WAX_SIGN_PUSH_TRANSACTION: 'wax_sign_push_transaction'
}
