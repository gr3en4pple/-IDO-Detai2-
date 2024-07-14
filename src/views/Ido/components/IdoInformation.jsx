import { useReaIdoPoolInfo } from '@/hooks/useIdo'
import useToken from '@/hooks/useToken'
import { formatNumber, formatTime, renderAddress } from '@/utils'
import { queryClient } from '@/Web3Provider'
import React, { useEffect } from 'react'
import { formatEther } from 'viem'

const IdoInformation = () => {
  const data = useReaIdoPoolInfo()

  const startTime = +data?.startTime?.result?.toString() || 0
  const endTime = +data?.endTime?.result?.toString() || 0
  const claimingTime = +data?.startClaimingTime?.result?.toString() || 0

  const offeringTokenAddress = data?.offeringToken?.result?.toString() || null
  const raisingTokenAddress = data?.raisingToken?.result?.toString() || null

  const totalAmount = data?.totalAmount?.result?.toString() || 0
  const raisingAmount = data?.raisingAmount?.result?.toString() || 0
  const offeringAmount = data?.offeringAmount?.result?.toString() || 0

  const offeringToken = useToken(offeringTokenAddress)
  const raisingToken = useToken(raisingTokenAddress)

  return (
    <div className="flex items-start gap-10 mt-5">
      <div className="w-1/2 overflow-hidden border rounded-lg">
        <div className="px-2 py-3 font-semibold text-white bg-primary-500">
          Pool Information
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Swap Rate</span>
          <span>
            1 {raisingToken?.symbol} ={' '}
            {formatEther(offeringAmount) / formatEther(raisingAmount)}{' '}
            {offeringToken?.symbol}
          </span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Sale Start Time</span>
          <span>{formatTime(startTime * 1000, 'yyyy-MM-dd HH:mm (OOOO)')}</span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Sale End Time</span>
          <span>{formatTime(endTime * 1000, 'yyyy-MM-dd HH:mm (OOOO)')}</span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Claiming</span>
          <span>
            {formatTime(claimingTime * 1000, 'yyyy-MM-dd HH:mm (OOOO)')}
          </span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Total Raise</span>
          <span>
            {formatNumber(formatEther(raisingAmount))} {raisingToken?.symbol}
          </span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Total Offering</span>
          <span>
            {formatNumber(formatEther(offeringAmount))} {offeringToken?.symbol}
          </span>
        </div>
      </div>

      <div className="w-1/2 overflow-hidden border rounded-lg">
        <div className="px-2 py-3 font-semibold text-white bg-primary-500">
          Token Information
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Name</span>
          <span>{offeringToken?.name}</span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Symbol</span>
          <span>{offeringToken?.symbol}</span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Total Supply</span>
          <span>
            {formatNumber(formatEther(offeringToken?.totalSupply || 0))}{' '}
            {offeringToken?.symbol}
          </span>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-t border-slate-200">
          <span>Address</span>
          <a
            target="_blank"
            className="underline text-primary"
            href={`https://testnet.bscscan.com/address/${offeringTokenAddress}`}
          >
            {offeringTokenAddress ? renderAddress(offeringTokenAddress) : null}
          </a>
        </div>
      </div>
    </div>
  )
}

export default IdoInformation
