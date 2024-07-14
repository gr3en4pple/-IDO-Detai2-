import { IDOPhase } from '@/const'
import { getReturnValues } from '@/hooks/useCountdown'
import classNames from '@/utils/classnames'
import IdoCountdown from '@/views/Home/components/Countdown'
import { CircularProgress, Progress } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'

const START_TIME_DEFAULT = 1720926000 // 10:00:00 14/07/2024

const IdoTimeProgress = ({
  endTime,
  startTime,
  onCountdownCompleteHandler,
  idoPhase
}) => {
  const [value, setValue] = useState(0)

  const progress = useRef(0)
  const isIdoStarted = idoPhase === IDOPhase.STARTED
  const isIdoEnded = idoPhase === IDOPhase.ENDED

  useEffect(() => {
    let interval
    if (endTime && startTime) {
      setValue(
        Math.floor(
          (isIdoStarted ? endTime : startTime) - new Date().getTime() / 1000
        )
      )
      if (isIdoEnded) return

      interval = setInterval(
        () => {
          setValue((prev) => {
            const countdown = prev - 1
            if (countdown === 0) {
              clearInterval(interval)
              onCountdownCompleteHandler(
                isIdoStarted ? IDOPhase.ENDED : IDOPhase.STARTED
              )
              return 0
            }
            progress.current = +(
              (countdown /
                (isIdoStarted
                  ? endTime - startTime
                  : startTime - START_TIME_DEFAULT)) *
              100
            ).toFixed(2)

            return countdown
          })
        },

        1000
      )
    }
    return () => clearInterval(interval)
  }, [endTime, startTime, isIdoStarted, isIdoEnded])

  return (
    <div className="flex flex-col item-center">
      <CircularProgress
        classNames={{
          svg: 'w-36 h-36 drop-shadow-md',
          value: 'text-xl font-semibold text-foreground/60',
          base: 'max-w-none w-full'
        }}
        size="lg"
        value={progress.current}
        color={
          progress.current >= 50
            ? 'primary'
            : progress.current >= 25
            ? 'warning'
            : 'danger'
        }
        showValueLabel={true}
        valueLabel={
          !isIdoEnded && (
            <IdoCountdown endTime={isIdoStarted ? endTime : startTime} />
          )
        }
      />

      <div
        className={classNames(
          'mt-4 text-xl font-semibold text-center  text-red-500',
          {
            'text-primary': progress.current >= 50,
            'text-yellow-200': progress.current >= 25
          }
        )}
      >
        {isIdoEnded
          ? 'IDO Sale has ENDED'
          : ` Countdown till ${isIdoStarted ? 'end' : 'start'}`}
      </div>
    </div>
  )
}

export default IdoTimeProgress
