import addresses from '@/contracts/addresses'
import { useReadIdoPersonalInfo, useWriteIDOContract } from '@/hooks/useIdo'
import { useTokenBalance } from '@/hooks/useToken'
import { formatNumber } from '@/utils'
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { parseEther, formatEther } from 'viem'
import IdoHarvest from './IdoHarvest'
import { IDOPhase } from '@/const'
import { queryClient } from '@/Web3Provider'
import { useTransactionReceipt } from 'wagmi'
import { toast } from 'sonner'

const IdoDeposit = ({ symbol, leftOverAmount, idoPhase }) => {
  const [amount, setAmount] = useState('')
  const amountRef = useRef(amount)
  amountRef.current = amount
  const {
    writeIdoContract,
    isPending,
    isSuccess,
    data: txHash
  } = useWriteIDOContract()

  const result = useTransactionReceipt({
    hash: txHash,
    query: {
      enabled: Boolean(txHash)
    }
  })
  console.log('result:', result)

  useEffect(() => {
    if (result?.data && result?.data?.status === 'success') {
      queryClient.invalidateQueries()
      toast.success(
        `You have deposited ${formatNumber(
          amountRef.current
        )} VNDT successfully`
      )
      setAmount('')
    }
  }, [result?.data, queryClient])

  const isIdoStarted = idoPhase === IDOPhase.STARTED
  const isIdoEnded = idoPhase === IDOPhase.ENDED

  const personalInfo = useReadIdoPersonalInfo()

  // so luong da deposit
  const depositedAmount = personalInfo?.userInfo?.result?.toString() || 0

  // // token harvest available trong thoi diem hien tai
  // const userCurrentTokenHarvestAvailable =
  //   personalInfo?.userTokenStatus?.result?.[0]?.toString() || 0
  // // token da harvest trong qua khu
  // const userTokenHarvestVested =
  //   personalInfo?.userTokenStatus?.result?.[1]?.toString() || 0

  // // tong so luong token co the harvest
  // const userTotalTokenHarvestAvailable =
  //   personalInfo?.getOfferingAmount?.result?.toString() || 0

  const balance = useTokenBalance(addresses.VNDT)

  const maxAmount = Math.min(+balance, +leftOverAmount)

  const onMaxHandler = () => {
    setAmount(maxAmount)
  }

  const onDepositHandler = async () => {
    try {
      const res = await writeIdoContract([parseEther(amount)], 'deposit')
      console.log('res:', res)
    } catch (error) {}
  }

  const validator = useMemo(() => {
    let isValid = true,
      msg = ''

    if (+amount > maxAmount) {
      isValid = false
      msg = `Amount must not greater than ${formatNumber(maxAmount)}`
    }
    return { isValid, msg }
  }, [amount, maxAmount])

  return (
    <div className="">
      <div className="w-full">
        <div className="flex items-center justify-between mb-3 text-xs text-foreground/60 ">
          <div className="flex items-center space-x-1">
            <span>Available: </span>
            <span className="text-sm font-medium text-default-500">
              {formatNumber(balance)} {symbol}
            </span>
          </div>

          <div className="flex items-center space-x-1 ">
            <span>Deposited amount:</span>
            <span className="text-sm font-medium text-default-500">
              {formatNumber(formatEther(depositedAmount))} {symbol}
            </span>
          </div>
        </div>
        {isIdoEnded ? (
          <IdoHarvest />
        ) : (
          <div className="space-y-4">
            <Input
              pattern="^-?[0-9]\d*\.?\d*$"
              isDisabled={!isIdoStarted}
              placeholder="Input your deposit amount"
              label={`Deposit ${symbol}`}
              value={amount}
              onChange={(e) => {
                if (e.target.validity.valid) {
                  setAmount(e.target.value)
                }
              }}
              endContent={
                <Button onClick={onMaxHandler} color="primary">
                  Max
                </Button>
              }
              errorMessage={validator.msg}
              isInvalid={!validator.isValid}
            />

            <Button
              isLoading={isPending}
              isDisabled={!amount || +amount > +balance || +amount > maxAmount}
              onClick={onDepositHandler}
              color="primary"
              fullWidth
            >
              Deposit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default IdoDeposit
