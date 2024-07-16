import addresses from '@/contracts/addresses'
export const IDO_LIST = [
  {
    name: 'strk-public',
    contract_address: addresses.IDO,
    isPrivate: false
  },
  {
    name: 'strk-private',
    contract_address: addresses.IDO_PRIVATE,
    isPrivate: true
  }
]
