import addresses from '@/contracts/addresses'
import { useReadIdoPersonalInfo, useWriteIDOContract } from '@/hooks/useIdo'
import { useApprove, useIsApproved, useTokenBalance } from '@/hooks/useToken'
import { formatNumber } from '@/utils'
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { parseEther, formatEther, maxInt104 } from 'viem'
import IdoHarvest from './IdoHarvest'
import { IDOPhase } from '@/const'
import { queryClient } from '@/Web3Provider'
import { toast } from 'sonner'

const IdoDeposit = ({
  idoAddress,
  symbol,
  leftOverAmount,
  idoPhase,
  raisingToken,
  offeringToken,
  isPrivate,
  allocationLimit
}) => {
  const { writeIdoContract, isLoading, txReceipt } =
    useWriteIDOContract(idoAddress)
  const personalInfo = useReadIdoPersonalInfo(idoAddress)

  const { isLoading: isCheckingApproved, isApproved } = useIsApproved({
    tokenAddress: addresses.VNDT,
    spender: idoAddress
  })
  const isNotApproved = !isCheckingApproved && !isApproved

  const {
    approve,
    isLoading: isApproving,
    txReceipt: approveTxReceipt
  } = useApprove({ tokenAddress: addresses.VNDT, spender: idoAddress })

  const [amount, setAmount] = useState('')
  const amountRef = useRef(amount)
  amountRef.current = amount

  useEffect(() => {
    if (txReceipt?.data && txReceipt?.data?.status === 'success') {
      queryClient.invalidateQueries()
      toast.success(
        ` You have deposited ${formatNumber(amountRef.current)} VNDT
          successfully`,

        {
          position: 'top-center',
          className: 'text-base space-x-3'
        }
      )
      setAmount('')
    }
  }, [txReceipt?.data])

  useEffect(() => {
    if (
      approveTxReceipt?.data &&
      approveTxReceipt?.data?.status === 'success'
    ) {
      queryClient.invalidateQueries()
      toast.success(
        ` You have approved VNDT to spend on IDO Contract successfully`,
        {
          position: 'top-center',
          className: 'text-base space-x-3'
        }
      )
    }
  }, [approveTxReceipt?.data])

  const isIdoStarted = idoPhase === IDOPhase.STARTED
  const isIdoEnded = idoPhase === IDOPhase.ENDED

  // so luong da deposit
  const userDepositedAmount = personalInfo?.userInfo?.result?.toString() || 0

  const isWhiteListed =
    !isPrivate || (isPrivate && personalInfo?.isWhitelist?.result)

  // // tong so luong token co the harvest
  // const userTotalTokenHarvestAvailable =
  //   personalInfo?.getOfferingAmount?.result?.toString() || 0

  const balance = useTokenBalance(raisingToken)
  const offeringTokenBalance = useTokenBalance(offeringToken)

  const isInfinityAllocation = !+allocationLimit

  const maxAmount = Math.min(
    +balance,
    isInfinityAllocation
      ? Number.MAX_SAFE_INTEGER
      : +allocationLimit - formatEther(userDepositedAmount),
    +leftOverAmount
  )

  const onMaxHandler = () => {
    setAmount(maxAmount)
  }

  const onApprove = async () => {
    try {
      const res = await approve(addresses.VNDT)
      console.log('res:', res)
    } catch (error) {
      console.log('error:', error)
    }
  }

  const onDepositHandler = async () => {
    try {
      const res = await writeIdoContract([parseEther(amount + '')], 'deposit')
    } catch (error) {
      console.log('error:', error)
    }
  }

  const validator = useMemo(() => {
    let isValid = true,
      msg = ''

    if (!maxAmount) {
      return {
        isValid: false,
        msg: 'You have reached the limit deposit amount'
      }
    }

    if (+amount > maxAmount) {
      return {
        isValid: false,
        msg: `Amount must not greater than ${formatNumber(maxAmount)}`
      }
    }
    if (!leftOverAmount) {
      return {
        isValid: false,
        msg: 'The IDO sale reached the raising amount goal'
      }
    }

    if (!isWhiteListed) {
      return {
        isValid: false,
        msg: 'Account is not whitelisted!'
      }
    }

    return { isValid, msg }
  }, [amount, maxAmount, isWhiteListed])

  return (
    <div className="">
      <div className="w-full">
        <div className="flex items-center justify-between mb-3 text-xs text-foreground/60 ">
          <div className="flex items-center space-x-1">
            <span>Available: </span>
            <span className=" text-default-500">
              {formatNumber(balance) || 0} {symbol}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span>Maximum deposit: </span>
            <span className=" text-default-500">
              {+allocationLimit === 0
                ? '∞'
                : formatNumber(allocationLimit) || 0}{' '}
              {symbol}
            </span>
          </div>

          <div className="flex items-center space-x-1 ">
            <span>Deposited amount:</span>
            <span className=" text-default-500">
              {formatNumber(formatEther(userDepositedAmount))} {symbol}
            </span>
          </div>
        </div>
        {isIdoEnded ? (
          <div className="space-y-4 ">
            {+userDepositedAmount === 0 ? (
              <div className="text-center text-red-500 text-medium font-lg">
                You did not participated in the IDO Sale
              </div>
            ) : (
              <>
                <IdoHarvest idoAddress={idoAddress} />

                <div className="flex items-center space-x-1 ">
                  <span>STRK balance:</span>
                  <span className="text-sm font-medium text-default-500">
                    {formatNumber(offeringTokenBalance)} STRK
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              pattern="^-?[0-9]\d*\d*$"
              isDisabled={
                !isIdoStarted || isLoading || isNotApproved || !leftOverAmount
              }
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
              isLoading={isLoading || isCheckingApproved || isApproving}
              isDisabled={
                !isWhiteListed ||
                (!isNotApproved &&
                  (!amount || +amount > +balance || +amount > maxAmount))
              }
              onClick={isNotApproved ? onApprove : onDepositHandler}
              color="primary"
              fullWidth
            >
              {isNotApproved ? 'Approve' : 'Deposit'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default IdoDeposit
