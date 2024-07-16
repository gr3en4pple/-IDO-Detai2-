import React, { useMemo } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image
} from '@nextui-org/react'
import { formatTime } from '@/utils'
import { Link } from 'react-router-dom'
import { Tooltip } from '@nextui-org/react'
import { useCountdown } from '@/hooks/useCountdown'
import IdoCountdown from './Countdown'
import { formatEther } from 'viem'
import { useIdoContractInfo } from '@/hooks/useIdo'
import classNames from '@/utils/classnames'
import Community from '@/assets/Community'
import IdoImage from '@/components/IdoImage'

const IdoCard = ({ contract_address, name, isPrivate }) => {
  const { data: idoInfo, isLoading } = useIdoContractInfo(contract_address)

  const startTime = +idoInfo?.startTime?.result?.toString() || 0
  const endTime = +idoInfo?.endTime?.result?.toString() || 0
  const isIdoStarted = startTime < new Date().getTime() / 1000
  const isIdoEnded = endTime < new Date().getTime() / 1000

  const totalAmount = idoInfo?.totalAmount?.result?.toString() || 0
  const raisingAmount = idoInfo?.raisingAmount?.result?.toString() || 0
  const leftOverAmount = useMemo(
    () => formatEther(raisingAmount) - formatEther(totalAmount),
    [raisingAmount, totalAmount]
  )

  return (
    <Card fullWidth shadow="sm">
      <CardBody className="relative p-0 overflow-visible">
        <IdoImage
          isSoldout={!isLoading && !leftOverAmount}
          isPrivate={isPrivate}
          className="h-[200px]"
        />
      </CardBody>
      <CardFooter className="justify-start text-left">
        <div>
          <div className="flex items-center mb-3 space-x-3">
            <div className="text-2xl font-semibold">IDO</div>
            <div className="text-default-500">
              {formatTime(new Date(), 'MMM dd, yyyy')}
            </div>
          </div>

          <div className="space-y-1 ">
            <div className="text-xl font-semibold">Starknet</div>

            <Tooltip
              color="foreground"
              content={
                <div className="max-w-[300px]">
                  Starknet is the secure scaling technology bringing Ethereum’s
                  benefits to the world.
                </div>
              }
              showArrow
              delay={300}
            >
              <div className="text-sm line-clamp-2 text-default-700">
                Starknet is the secure scaling technology bringing Ethereum’s
                benefits to the world.
              </div>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <Chip
                color={
                  isIdoEnded ? 'default' : isIdoStarted ? 'primary' : 'default'
                }
                size="lg"
                startContent={
                  !isIdoEnded && (
                    <span>{isIdoStarted ? 'Ends in' : 'Starts in'}:</span>
                  )
                }
              >
                {startTime &&
                  endTime &&
                  (isIdoEnded ? (
                    'Ended'
                  ) : (
                    <IdoCountdown
                      endTime={isIdoStarted ? endTime : startTime}
                    />
                  ))}
              </Chip>
            </div>

            <Button
              as={Link}
              to={`/ido/${name}`}
              variant="bordered"
              radius="full"
              color={isPrivate ? 'secondary' : 'primary'}
              className={classNames(
                'hover:text-white  hover:border-transparent',
                {
                  'hover:bg-primary-500': !isPrivate,
                  'hover:bg-secondary-500': isPrivate
                }
              )}
            >
              Detail
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default IdoCard
