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
  'totalAmount'
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

const IDOPersonalInfoFunctions = ['getOfferingAmount', 'userInfo']

const IDOContracts = {
  abi: IDOAbi,
  address: Addresses.IDO
}

const useWriteIDOContract = () => {
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
      ...IDOContracts,
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

const useIdoContractInfo = () => {
  const dataRead = useReadContracts({
    contracts: IDOGeneralInfoFunctions.map((fn) => ({
      ...IDOContracts,
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

const useReaIdoPoolInfo = () => {
  const dataRead = useReadContracts({
    contracts: IDOPoolInfo.map((fn) => ({
      ...IDOContracts,
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

const useReadIdoPersonalInfo = () => {
  const { address } = useAccount()

  const dataRead = useReadContracts({
    contracts: IDOPersonalInfoFunctions.map((fn) => ({
      ...IDOContracts,
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

const useReadIdoHarvestPerPeriod = () => {
  const { address } = useAccount()

  const dataRead = useReadContracts({
    contracts: [
      ...IDO_HARVEST_PERIODS.map((period) => ({
        ...IDOContracts,
        functionName: 'getOfferingAmountPerPeriod',
        args: [address, period]
      })),
      ...IDO_HARVEST_PERIODS.map((period) => ({
        ...IDOContracts,
        functionName: 'harvestReleaseTimestamps',
        args: [period]
      })),
      ...IDO_HARVEST_PERIODS.map((period) => ({
        ...IDOContracts,
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
