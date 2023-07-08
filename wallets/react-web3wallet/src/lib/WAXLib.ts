import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig' // development only
import { Transaction } from 'eosjs/dist/eosjs-api-interfaces'
import { PushTransactionArgs } from 'eosjs/dist/eosjs-rpc-interfaces'
import { sign, PrivateKey } from 'eosjs-ecc'
import EosjsApi from 'eosjs-api'
import { Buffer } from 'buffer'
import fetchRetry from '@waxio/fetch-retry'
const fetch = fetchRetry(5)

const TextEncodingPolyfill = require('text-encoding')
Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder
})

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const EOS_API_URL = 'https://stg2-history.thh.io'

export const privateKeys = ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'] // private key of vstrike

/**
 * Types
 */
interface IInitArguments {
  privateKeys?: string[]
}

/**
 * Library
 */
export default class WAXLib {
  signatureProvider: JsSignatureProvider
  rpc: JsonRpc
  api: Api
  eosjsApi: EosjsApi

  constructor(privateKeys: string[]) {
    this.signatureProvider = new JsSignatureProvider(privateKeys)
    this.rpc = new JsonRpc(EOS_API_URL, { fetch })
    this.api = new Api({
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
      textEncoder: encoder,
      textDecoder: decoder
    })
    this.eosjsApi = new EosjsApi({
      httpEndpoint: EOS_API_URL
    })
  }

  static init({ privateKeys }: IInitArguments) {
    return new WAXLib(privateKeys!)
  }

  public async getAccounts(): Promise<string[]> {
    const { account_names } = await this.eosjsApi.getKeyAccounts({
      public_key: this.signatureProvider.availableKeys[0]
    })
    return account_names
  }

  public getPublicKey() {
    return this.signatureProvider.availableKeys[0]
  }

  public async signMessage(message: string) {
    const pubKey = this.signatureProvider.availableKeys[0]
    const keyPair = this.signatureProvider.keys.get(pubKey)
    const privBuffer = Buffer.from(keyPair.getPrivate().toArray())
    const signature = sign(message, PrivateKey(privBuffer))
    console.log({ signature })
    return { signature }
  }

  public async signTransaction(chainId: string, transaction: Transaction) {
    const txResult = await this.api.transact(transaction, {
      blocksBehind: 3,
      expireSeconds: 30,
      broadcast: false,
      sign: true
    })

    const serializedTx = (txResult as PushTransactionArgs).serializedTransaction
    const serializedContextFreeData = (txResult as PushTransactionArgs).serializedContextFreeData

    const { signatures, serializedTransaction } = await this.signatureProvider.sign({
      chainId: chainId.split(':')[1],
      requiredKeys: await this.signatureProvider.getAvailableKeys(),
      serializedTransaction: serializedTx,
      abis: []
    })

    return { signatures, serializedTransaction: Array.from(serializedTransaction) , serializedContextFreeData }
  }

  public async pushTransaction(signatures: string[], serializedTransaction: Uint8Array, serializedContextFreeData: Uint8Array | undefined) {
    const tx = await this.api.pushSignedTransaction({
      signatures,
      serializedTransaction,
      serializedContextFreeData
    })

    return tx
  }

  public async signAndPushTransaction(chainId: string, transaction: Transaction) {
    const txResult = await this.api.transact(transaction, {
      blocksBehind: 3,
      expireSeconds: 30,
      broadcast: false,
      sign: true
    })

    const serializedTx = (txResult as PushTransactionArgs).serializedTransaction
    const serializedContextFreeData = (txResult as PushTransactionArgs).serializedContextFreeData

    const { signatures, serializedTransaction } = await this.signatureProvider.sign({
      chainId: chainId.split(':')[1],
      requiredKeys: await this.signatureProvider.getAvailableKeys(),
      serializedTransaction: serializedTx,
      abis: []
    })

    const tx = await this.api.pushSignedTransaction({
      signatures,
      serializedTransaction,
      serializedContextFreeData
    })

    return tx
  }
}
