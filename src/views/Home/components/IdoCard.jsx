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

const CommunityIcon = ({ size = 24 }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M337.454 232c33.599 0 61.092-27.002 61.092-60 0-32.997-27.493-60-61.092-60s-61.09 27.003-61.09 60c0 32.998 27.491 60 61.09 60zm-162.908 0c33.599 0 61.09-27.002 61.09-60 0-32.997-27.491-60-61.09-60s-61.092 27.003-61.092 60c0 32.998 27.493 60 61.092 60zm0 44C126.688 276 32 298.998 32 346v54h288v-54c0-47.002-97.599-70-145.454-70zm162.908 11.003c-6.105 0-10.325 0-17.454.997 23.426 17.002 32 28 32 58v54h128v-54c0-47.002-94.688-58.997-142.546-58.997z"></path>
  </svg>
)

const IdoCard = ({ idoInfo, isLoading }) => {
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
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={'stark'}
          className="w-full object-fit h-[200px]"
          src={
            'https://cdn.coin68.com/images/20231206103714-2b8f1075-2f34-4800-afc0-0da6733b1f9b-128.jpg'
          }
        />
        {!isLoading && !leftOverAmount && (
          <div className="absolute left-0 z-10 -translate-y-1/2 top-1/2">
            <Image
              src="https://winery.finance/images/soldout1.png"
              alt="soldout"
            />
          </div>
        )}
        <div className="absolute z-10 right-4 bottom-4">
          <Chip
            startContent={<CommunityIcon size={16} />}
            color="primary"
            variant="shadow"
          >
            Public
          </Chip>
        </div>
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
              to="/ido/strk"
              variant="bordered"
              radius="full"
              color="primary"
              className="hover:text-white hover:bg-primary-500 hover:border-transparent"
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
