import { IDO_HARVEST_PERIODS } from '@/const'
import { useReadIdoHarvestPerPeriod } from '@/hooks/useIdo'
import { formatNumber } from '@/utils'
import Countdown from '@/views/Home/components/Countdown'
import { Button, ButtonGroup } from '@nextui-org/react'
import React from 'react'
import { formatEther } from 'viem'
const IdoHarvest = () => {
  const idoHarvestInfoPeriods = useReadIdoHarvestPerPeriod()
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {idoHarvestInfoPeriods?.length
        ? idoHarvestInfoPeriods?.map((period, index) => {
            const isHarvestAble =
              +period?.harvestTimestamp?.toString() <
              new Date().getTime() / 1000
            return (
              <Button
                isDisabled={period?.isHarvested || !isHarvestAble}
                key={index}
                color="primary"
                className="flex flex-col gap-0 space-y-0"
              >
                <div>Phase {index + 1}</div>
                <div>
                  {!isHarvestAble ? (
                    <>
                      Harvest in{' '}
                      <Countdown
                        endTime={+period?.harvestTimestamp?.toString()}
                      />
                    </>
                  ) : (
                    `${formatNumber(
                      formatEther(period?.harvestAmount),
                      5
                    )} ETHV`
                  )}
                </div>
              </Button>
            )
          })
        : null}
    </div>
  )
}

export default IdoHarvest
