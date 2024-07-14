import { useCountdown } from '@/hooks/useCountdown'
import { Chip } from '@nextui-org/react'
import React, { memo } from 'react'

const Countdown = memo(({ endTime }) => {
  const countdown = useCountdown(endTime * 1000)
  return `${countdown.days > 0 ? `${countdown.days} d ` : ''}${
    countdown.hours > 0 ? `${countdown.hours}:` : ''
  }${countdown?.minutes}:${countdown?.seconds}`
})

export default Countdown
