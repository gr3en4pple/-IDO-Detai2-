import { useCountdown } from '@/hooks/useCountdown'
import React, { memo, useEffect } from 'react'

const Countdown = memo(({ endTime, onEnded }) => {
  const countdown = useCountdown(endTime * 1000)

  useEffect(() => {
    if (countdown.isEnded) {
      onEnded?.()
    }
  }, [countdown.isEnded])

  return `${countdown.days > 0 ? `${countdown.days} d ` : ''}${
    countdown.hours > 0 ? `${countdown.hours}:` : ''
  }${countdown?.minutes}:${countdown?.seconds}`
})

export default Countdown
