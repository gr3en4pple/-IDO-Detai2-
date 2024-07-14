import { useEffect, useState } from 'react'

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  )

  const [isEnded, setEnded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {

      if (countDownDate - new Date().getTime() <= 0) {
        clearInterval(interval)
        setEnded(true)
        return
      }

      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return {
    ...getReturnValues(countDown),
    isEnded
  }
}

export const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))

  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
    .toString()
    .padStart(2, 0)

  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, 0)
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, 0)

  return { days, hours, minutes, seconds }
}

export { useCountdown }
