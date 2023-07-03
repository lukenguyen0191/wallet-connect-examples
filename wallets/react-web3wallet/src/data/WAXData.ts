/**
 * Types
 */
export type TWAXChain = keyof typeof WAX_MAINNET_CHAINS

/**
 * Chains
 */
export const WAX_MAINNET_CHAINS = {
  'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ': {
    chainId: '4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
    name: 'WAX Mainnet',
    logo: '/chain-logos/solana-4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ.png',
    rgb: '30, 240, 166',
    rpc: ''
  }
}

export const WAX_TEST_CHAINS = {
  'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K': {
    chainId: '8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
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
  WAX_SIGN_TRANSACTION: 'wax_signTransaction',
  WAX_SIGN_MESSAGE: 'wax_signMessage'
}
