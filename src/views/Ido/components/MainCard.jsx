import React, { useEffect, useMemo, useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Input
} from '@nextui-org/react'
import IdoProgress from './IdoProgress'
import { useIdoContractInfo } from '@/hooks/useIdo'
import { useAccount } from 'wagmi'
import ConnectWalletButton from '@/components/Navbar/ConnectWalletButton'
import IdoDeposit from './IdoDeposit'
import useToken from '@/hooks/useToken'
import addresses from '@/contracts/addresses'
import { formatEther } from 'viem'
import IdoTimeProgress from './IdoTimeProgress'
import { IDOPhase } from '@/const'
import Community from '@/assets/Community'
import IdoImage from '@/components/IdoImage'

const MainCard = ({ contract_address, isPrivate }) => {
  const { isConnected, chainId } = useAccount()

  const { data: idoGeneralInfo, isLoading } =
    useIdoContractInfo(contract_address)

  const [idoPhase, setIdoPhase] = useState(IDOPhase.NOT_STARTED)

  const offeringTokenAddress =
    idoGeneralInfo?.offeringToken?.result?.toString() || null
  const raisingTokenAddress =
    idoGeneralInfo?.raisingToken?.result?.toString() || null

  const totalAmount = idoGeneralInfo?.totalAmount?.result?.toString() || 0
  const raisingAmount = idoGeneralInfo?.raisingAmount?.result?.toString() || 0
  const startTime = +idoGeneralInfo?.startTime?.result?.toString() || 0
  const endTime = +idoGeneralInfo?.endTime?.result?.toString() || 0
  const isIdoStarted = startTime < new Date().getTime() / 1000
  const isIdoEnded = endTime < new Date().getTime() / 1000

  const allocationLimit = formatEther(
    (idoGeneralInfo?.allocationLimit?.result?.toString() || 0) + ''
  )

  useEffect(() => {
    if (!isLoading) {
      if (isIdoStarted) setIdoPhase(IDOPhase.STARTED)
      if (isIdoEnded) setIdoPhase(IDOPhase.ENDED)
    }
  }, [isIdoStarted, isIdoEnded, isLoading])

  const raisingToken = useToken(raisingTokenAddress)

  const leftOverAmount = useMemo(
    () => formatEther(raisingAmount) - formatEther(totalAmount),
    [raisingAmount, totalAmount]
  )

  const onCountdownCompleteHandler = (newPhase) => {
    if (
      ![IDOPhase.NOT_STARTED, IDOPhase.STARTED, IDOPhase.ENDED].includes(
        newPhase
      )
    ) {
      return
    }
    setIdoPhase(newPhase)
  }

  return (
    <Card fullWidth shadow="sm">
      <CardBody className="relative p-6 overflow-visible">
        <div className="flex gap-6 ">
          <div className="flex flex-col justify-between w-1/2">
            <div className="mb-6 space-y-4">
              <p className="text-3xl font-semibold">Welcome to Starknet</p>
              <p className="text-lg text-default-500">
                Starknet is the secure scaling technology bringing Ethereum’s
                benefits to the world.
              </p>
            </div>

            <IdoTimeProgress
              endTime={endTime}
              startTime={startTime}
              onCountdownCompleteHandler={onCountdownCompleteHandler}
              idoPhase={idoPhase}
            />

            {!isLoading &&
              (idoPhase !== IDOPhase.NOT_STARTED ? (
                <IdoProgress
                  totalAmount={totalAmount}
                  raisingAmount={raisingAmount}
                  symbol={raisingToken?.symbol}
                />
              ) : (
                <div className="h-14" />
              ))}
          </div>

          <div className="w-1/2 ">
            <div>
              <IdoImage
                isSoldout={!isLoading && !leftOverAmount}
                isPrivate={isPrivate}
                className="h-full"
              />
            </div>

            <div className="mt-10">
              {!isConnected && (
                <ConnectWalletButton
                  useLoadingState={false}
                  color="primary"
                  fullWidth
                />
              )}
              {isConnected &&
                (chainId !== 97 ? (
                  <ConnectWalletButton
                    useLoadingState={false}
                    color="primary"
                    fullWidth
                  />
                ) : (
                  <IdoDeposit
                    isPrivate={isPrivate}
                    idoAddress={contract_address}
                    leftOverAmount={leftOverAmount}
                    symbol={raisingToken?.symbol}
                    idoPhase={idoPhase}
                    allocationLimit={allocationLimit}
                    raisingToken={raisingTokenAddress}
                    offeringToken={offeringTokenAddress}
                  />
                ))}
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="justify-start text-left"></CardFooter>
    </Card>
  )
}

export default MainCard
