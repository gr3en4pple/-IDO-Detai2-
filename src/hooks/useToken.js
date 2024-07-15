import React from 'react'
import {
  erc20Abi,
  maxInt256,
  maxInt32,
  maxInt96,
  maxUint16,
  maxUint256,
  parseEther
} from 'viem'
import {
  useAccount,
  useReadContracts,
  useReadContract,
  useWriteContract,
  useTransactionReceipt
} from 'wagmi'
import { formatEther } from 'viem'
import addresses from '@/contracts/addresses'

export const useTokenBalance = (tokenAddress) => {
  const account = useAccount()
  const balance = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [account.address],
    query: {
      enabled: Boolean(account.address)
    }
  })

  return !balance?.data ? 0 : formatEther(balance.data.toString())
}

export const useIsApproved = (tokenAddress) => {
  const account = useAccount()
  const { data: allowance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [account.address, addresses.IDO],
    query: {
      enabled: Boolean(account.address)
    }
  })

  return {
    isLoading,
    isApproved: Boolean(allowance)
  }
}

const useToken = (tokenAddress) => {
  const tokenInfo = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'name'
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'symbol'
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'totalSupply'
      }
    ]
  })

  return !tokenInfo.data
    ? {}
    : {
        name: tokenInfo.data[0],
        symbol: tokenInfo.data[1],
        totalSupply: tokenInfo.data[2]
      }
}

export const useApproveIdo = (tokenAddress) => {
  const { isPending, writeContractAsync, data: txHash } = useWriteContract()

  const txReceipt = useTransactionReceipt({
    hash: txHash,
    query: {
      enabled: Boolean(txHash)
    }
  })
  const isFetchingTxReceipt = txReceipt.fetchStatus === 'fetching'

  const approve = async () => {
    return await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [addresses.IDO, parseEther(maxInt96.toString())]
    })
  }

  return {
    approve,
    isLoading: isPending || isFetchingTxReceipt,
    txReceipt
  }
}

export default useToken
