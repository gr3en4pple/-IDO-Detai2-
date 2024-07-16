import addresses from '@/contracts/addresses'
export const IDO_LIST = [
  {
    name: 'STRK-PUBLIC',
    contract_address: addresses.IDO,
    isPrivate: false
  },
  {
    name: 'STRK-PRIVATE',
    contract_address: addresses.IDO_PRIVATE,
    isPrivate: true
  }
]
