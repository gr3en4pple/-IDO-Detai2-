import React from 'react'
import { erc20Abi } from 'viem'
import { useAccount, useReadContracts, useReadContract } from 'wagmi'
import { formatEther } from 'viem'

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
        totalSupply: tokenInfo.data[2],
      }
}

export default useToken
