import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react'
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

const MainCard = () => {
  const { data: progressInfo, isLoading } = useIdoContractInfo()

  const [idoPhase, setIdoPhase] = useState(IDOPhase.NOT_STARTED)

  const { isConnected } = useAccount()

  const totalAmount = progressInfo?.totalAmount?.result?.toString() || 0
  const raisingAmount = progressInfo?.raisingAmount?.result?.toString() || 0
  const startTime = +progressInfo?.startTime?.result?.toString() || 0
  const endTime = +progressInfo?.endTime?.result?.toString() || 0
  const isIdoStarted = startTime < new Date().getTime() / 1000

  useEffect(() => {
    if (isIdoStarted && !isLoading) {
      setIdoPhase(IDOPhase.STARTED)
    }
  }, [isIdoStarted, isLoading])

  const token = useToken(addresses.VNDT)

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

            {!isLoading && idoPhase !== IDOPhase.ENDED && (
              <IdoTimeProgress
                endTime={endTime}
                startTime={startTime}
                onCountdownCompleteHandler={onCountdownCompleteHandler}
                idoPhase={idoPhase}
              />
            )}

            {!isLoading &&
              (isIdoStarted ? (
                <IdoProgress
                  totalAmount={totalAmount}
                  raisingAmount={raisingAmount}
                  symbol={token?.symbol}
                />
              ) : (
                <div className="h-14" />
              ))}
          </div>

          <div className="w-1/2 ">
            <div>
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={'stark'}
                className="object-cover w-full h-full"
                src={
                  'https://cdn.coin68.com/images/20231206103714-2b8f1075-2f34-4800-afc0-0da6733b1f9b-128.jpg'
                }
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
              {isConnected && (
                <IdoDeposit
                  leftOverAmount={leftOverAmount}
                  symbol={token?.symbol}
                  idoPhase={idoPhase}
                />
              )}
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="justify-start text-left"></CardFooter>
    </Card>
  )
}

export default MainCard
