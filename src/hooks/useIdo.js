import {
  useAccount,
  useReadContract,
  useReadContracts,
  useTransactionReceipt,
  useWriteContract
} from 'wagmi'
import { IDO as IDOAbi } from '@/contracts/abis'
import Addresses from '@/contracts/addresses'
import { IDO_HARVEST_PERIODS } from '@/const'

const IDOGeneralInfoFunctions = [
  'startTime',
  'endTime',
  'raisingAmount',
  'totalAmount',
  'allocationLimit',
  'raisingToken',
  'raisingAmount'
]
const IDOPoolInfo = [
  'raisingToken',
  'raisingAmount',
  'offeringToken',
  'offeringAmount',
  'totalAmount',
  'startTime',
  'endTime',
  'startClaimingTime'
]

const IDOPersonalInfoFunctions = [
  'getOfferingAmount',
  'userInfo',
  'isWhitelist'
]

const IDOContracts = {
  abi: IDOAbi,
  address: Addresses.IDO
}

const useWriteIDOContract = (idoAddress) => {
  const { isPending, writeContractAsync, data: txHash } = useWriteContract()

  const txReceipt = useTransactionReceipt({
    hash: txHash,
    query: {
      enabled: Boolean(txHash)
    }
  })
  const isFetchingTxReceipt = txReceipt.fetchStatus === 'fetching'

  const writeIdoContract = async (args, fnName) => {
    return await writeContractAsync({
      abi: IDOAbi,
      address: idoAddress,
      functionName: fnName,
      args: [...args]
    })
  }
  return {
    writeIdoContract,
    isLoading: isPending || isFetchingTxReceipt,
    txReceipt
  }
}

const useIdoContractInfo = (idoAddress) => {
  const dataRead = useReadContracts({
    contracts: IDOGeneralInfoFunctions.map((fn) => ({
      abi: IDOAbi,
      address: idoAddress,
      functionName: fn,
      args: []
    }))
  })

  return {
    isLoading: dataRead.isLoading,
    data:
      dataRead.status === 'success'
        ? dataRead.data?.reduce(
            (resObj, result, index) => ({
              ...resObj,
              [IDOGeneralInfoFunctions[index]]: result
            }),
            {}
          )
        : IDOGeneralInfoFunctions.reduce(
            (resObj, fn) => ({
              ...resObj,
              [fn]: {}
            }),
            {}
          )
  }
}

const useReaIdoPoolInfo = (idoAddress) => {
  const dataRead = useReadContracts({
    contracts: IDOPoolInfo.map((fn) => ({
      abi: IDOAbi,
      address: idoAddress,
      functionName: fn,
      args: []
    }))
  })

  return dataRead.status === 'success'
    ? dataRead.data?.reduce(
        (resObj, result, index) => ({
          ...resObj,
          [IDOPoolInfo[index]]: result
        }),
        {}
      )
    : IDOPoolInfo.reduce(
        (resObj, fn) => ({
          ...resObj,
          [fn]: {}
        }),
        {}
      )
}

const useReadIdoPersonalInfo = (idoAddress) => {
  const { address } = useAccount()

  const dataRead = useReadContracts({
    contracts: IDOPersonalInfoFunctions.map((fn) => ({
      abi: IDOAbi,
      address: idoAddress,
      functionName: fn,
      args: [address]
    }))
  })

  return dataRead.status === 'success'
    ? dataRead.data?.reduce(
        (resObj, result, index) => ({
          ...resObj,
          [IDOPersonalInfoFunctions[index]]: result
        }),
        {}
      )
    : IDOPersonalInfoFunctions.reduce(
        (resObj, fn) => ({
          ...resObj,
          [fn]: {}
        }),
        {}
      )
}

const useReadIdoHarvestPerPeriod = (idoAddress) => {
  const { address } = useAccount()

  const dataRead = useReadContracts({
    contracts: [
      ...IDO_HARVEST_PERIODS.map((period) => ({
        abi: IDOAbi,
        address: idoAddress,
        functionName: 'getOfferingAmountPerPeriod',
        args: [address, period]
      })),
      ...IDO_HARVEST_PERIODS.map((period) => ({
        abi: IDOAbi,
        address: idoAddress,
        functionName: 'harvestReleaseTimestamps',
        args: [period]
      })),
      ...IDO_HARVEST_PERIODS.map((period) => ({
        abi: IDOAbi,
        address: idoAddress,
        functionName: 'hasHarvested',
        args: [address, period]
      }))
    ]
  })

  return {
    isLoading: dataRead.isLoading,
    data: dataRead.isLoading
      ? []
      : IDO_HARVEST_PERIODS.map((period) => ({
          harvestAmount: dataRead.data[period]?.result,
          harvestTimestamp:
            dataRead.data[period + IDO_HARVEST_PERIODS.length]?.result,
          isHarvested:
            dataRead.data[period + IDO_HARVEST_PERIODS.length * 2]?.result
        }))
  }
}

export {
  useWriteIDOContract,
  useIdoContractInfo,
  useReaIdoPoolInfo,
  useReadIdoPersonalInfo,
  useReadIdoHarvestPerPeriod
}
