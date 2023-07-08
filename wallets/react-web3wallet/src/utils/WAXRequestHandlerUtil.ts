import { WAX_SIGNING_METHODS } from '@/data/WAXData'
import { getWalletAddressFromParams } from '@/utils/HelperUtil'
import { waxAccounts, waxWallets } from '@/utils/WAXWalletUtil'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { getSdkError } from '@walletconnect/utils'

export async function approveWAXRequest(
  requestEvent: SignClientTypes.EventArguments['session_request']
) {
  const { params, id } = requestEvent
  const { request, chainId } = params
  const wallet = waxWallets[getWalletAddressFromParams(waxAccounts, params)]

  switch (request.method) {

    case WAX_SIGNING_METHODS.WAX_SIGN_MESSAGE:
      const signedMessage = await wallet.signMessage(request.params.message)
      return formatJsonRpcResult(id, signedMessage)

    case WAX_SIGNING_METHODS.WAX_SIGN_TRANSACTION:
      const signedTransaction = await wallet.signTransaction(
        chainId,
        request.params
      )

      return formatJsonRpcResult(id, signedTransaction)

    case WAX_SIGNING_METHODS.WAX_PUSH_TRANSACTION:

      const pushedTransaction = await wallet.pushTransaction(
        request.params.signatures,
        request.params.serializedTransaction,
        request.params.serializedContextFreeData
      )

      return formatJsonRpcResult(id, pushedTransaction)
    
    case WAX_SIGNING_METHODS.WAX_SIGN_PUSH_TRANSACTION:
      const transaction = await wallet.signAndPushTransaction(
        chainId,
        request.params
      )

      return formatJsonRpcResult(id, transaction)

    default:
      throw new Error(getSdkError('INVALID_METHOD').message)
  }
}

export function rejectWAXRequest(request: SignClientTypes.EventArguments['session_request']) {
  const { id } = request

  return formatJsonRpcError(id, getSdkError('USER_REJECTED_METHODS').message)
}
