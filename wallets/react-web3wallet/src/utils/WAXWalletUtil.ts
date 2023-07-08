import WAXLib, { privateKeys as privKeys } from '@/lib/WAXLib'

export let wallet1: WAXLib
// export let wallet2: WAXLib
export let waxWallets: {
  [acc: string]: WAXLib
} = {}
export let waxAccounts: string[]

// let address2: string

/**
 * Utilities
 */
export async function createOrRestoreWAXWallet() {
  wallet1 = WAXLib.init({ privateKeys: privKeys })

  waxAccounts = await wallet1.getAccounts();

  // waxAccounts.forEach((acc: string) => {
  //   waxWallets[acc] = wallet1;
  // });

  waxWallets = waxAccounts.reduce((obj: any, acc: string) => {
    obj[acc] = wallet1
    return obj
  }, {})

  return {
    waxWallets,
    waxAccounts
  }
}
