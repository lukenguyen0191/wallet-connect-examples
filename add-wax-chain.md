**Adding a new chain to the Explorer**
To get a new chain added to the Explorer, you will need to submit the following:

1. JSON-RPC spec for Wallets **(only if [one](https://docs.walletconnect.com/2.0/advanced/rpc-reference/ethereum-rpc) doesn't already exist)**. For more information, please review the Ethereum [JSON-RPC API docs](https://ethereum.org/en/developers/docs/apis/json-rpc/).
   **GitHub Link**:
   https://docs.google.com/document/d/1Pyd5dCWMgGFveQUVVAXYJQyDhBL_qD7ijHhQWYUCZks/edit?usp=sharing
2. Write a [CASA namespace spec](https://github.com/ChainAgnostic/namespaces) if not already available for this namespace.
   **GitHub Link**:
   [https://github.com/ChainAgnostic/namespaces/tree/feat/add-eosio](https://github.com/ChainAgnostic/namespaces/tree/feat/add-eosio)
   The WAX blockchain is an alternative to the EOSIO blockchain and works on top of the foundations of this chain.
3. **namespaces**:
   _\*known chain namespaces (e.g. eip:155 for Ethereum/EVM-based chains, solana, ...)_
   `wax`
4. **chains**:
   _\*known chains, where the primary key is a compound key composed of namespace + reference (e.g. ETH mainnet is eip155:1)._
   _Please provide labels for each chain (e.g. mainnet, testnet, devnet, ...)_
   mainnet: `wax:1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4`
   testnet: `wax:e0b5f2532f0f4fcc4da2fc440943131b2f041f5c522c09e9f2fd0b8ba74ef5b6`
5. **RPC endpoints**
   _\*list of common/canonical RPC endpoints for the chain(s)_
   [https://developers.eos.io/manuals/eos/latest/nodeos/plugins/chain_api_plugin/api-reference/index](https://developers.eos.io/manuals/eos/latest/nodeos/plugins/chain_api_plugin/api-reference/index) Provides access to the blockchain information and interaction with the blockchain
6. **[SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) coin type**:
   _\* slip44 coin type used in the namespace_
   14001

**Additional context**
More information about WAX blockchain here: [https://www.wax.io/blockchain](https://www.wax.io/blockchain)
We are submitting this new chain request for registering the WAX blockchain in order to integrate WalletConnect into our cloud-based wallet solution on the WAX blockchain: [https://www.mycloudwallet.com](https://www.mycloudwallet.com/)
