
import { formatNumber } from '@/utils'
import { Progress } from '@nextui-org/react'
import React from 'react'
import { formatEther, formatGwei } from 'viem'

const IdoProgress = ({ totalAmount, raisingAmount, symbol }) => {
  const percent = (totalAmount / +raisingAmount || 1) * 100

  return (
    <div>
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          base: '',
          track: 'drop-shadow-md border h-3 border-default',
          indicator: 'bg-gradient-to-r from-pink-500 to-primary-500',
          label: 'tracking-wider text-lg font-medium text-default-600',
          value: 'text-foreground/60',
          labelWrapper: 'items-center'
        }}
        label="Total Raised"
        value={+percent}
      />

      <div className="flex justify-between mt-2 text-foreground/60">
        <span className="text-foreground/60">{percent.toFixed(2)}%</span>
        <span className="font-medium ">
          {formatNumber(formatEther(totalAmount))}/
          {formatNumber(formatEther(raisingAmount))} {symbol}
        </span>
      </div>
    </div>
  )
}

export default IdoProgress
