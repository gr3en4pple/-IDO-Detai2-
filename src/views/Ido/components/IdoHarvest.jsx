import { IDO_HARVEST_PERIODS } from '@/const'
import { useReadIdoHarvestPerPeriod, useWriteIDOContract } from '@/hooks/useIdo'
import { formatNumber } from '@/utils'
import Countdown from '@/views/Home/components/Countdown'
import { queryClient } from '@/Web3Provider'
import { Button, ButtonGroup } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatEther } from 'viem'

const HarvestButton = ({
  phaseNumber,
  harvestAmount,
  harvestTimestamp,
  isHarvested
}) => {
  const [isHarvestAble, setHarvestAble] = useState(false)

  const { isLoading, writeIdoContract, txReceipt } = useWriteIDOContract()

  useEffect(() => {
    if (txReceipt?.data && txReceipt?.data?.status === 'success') {
      queryClient.invalidateQueries()
      toast.success(
        ` You have harvested ${formatNumber(formatEther(harvestAmount), 5)} STRK
          successfully`,

        {
          position: 'top-center',
          className: 'text-base space-x-3'
        }
      )
    }
  }, [txReceipt.data, harvestAmount])

  const onHarvest = async (e) => {
    try {
      const res = await writeIdoContract([phaseNumber], 'harvest')
      console.log('res:', res)
    } catch (error) {}
  }

  return (
    <Button
      isDisabled={isHarvested || !isHarvestAble}
      isLoading={isLoading}
      color="primary"
      className="flex flex-col gap-0 space-y-0"
      onClick={onHarvest}
    >
      {!isHarvested && <div>Phase {phaseNumber + 1}</div>}
      {!isLoading && (
        <div>
          {!isHarvestAble ? (
            <>
              Harvest in{' '}
              <Countdown
                onEnded={() => setHarvestAble(true)}
                endTime={+harvestTimestamp?.toString()}
              />
            </>
          ) : (
            `${isHarvested ? 'Harvested' : ''} ${formatNumber(
              formatEther(harvestAmount),
              5
            )} STRK`
          )}
        </div>
      )}
    </Button>
  )
}

const IdoHarvest = () => {
  const { data: idoHarvestInfoPeriods, isLoading } =
    useReadIdoHarvestPerPeriod()

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {!isLoading &&
        (idoHarvestInfoPeriods?.length
          ? idoHarvestInfoPeriods?.map((period, index) => {
              return (
                <HarvestButton
                  key={index}
                  phaseNumber={index}
                  harvestAmount={period?.harvestAmount}
                  harvestTimestamp={period?.harvestTimestamp}
                  isHarvested={period?.isHarvested}
                />
              )
            })
          : null)}
    </div>
  )
}

export default IdoHarvest
