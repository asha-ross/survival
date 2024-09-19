// src/hooks/useTimer.ts
import { useState, useEffect, useCallback } from 'react'

export const useTimer = (initialTime: number, onTimeUp: () => void) => {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  const startTimer = useCallback(() => {
    setIsRunning(true)
  }, [])

  const stopTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(
    (newTime: number = initialTime) => {
      setTime(newTime)
      setIsRunning(false)
    },
    [initialTime],
  )

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval)
            setIsRunning(false)
            onTimeUp()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, time, onTimeUp])

  return { time, isRunning, startTimer, stopTimer, resetTimer }
}
