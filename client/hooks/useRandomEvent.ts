// src/hooks/useRandomEvent.ts
import { useCallback, useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { events } from '../data/events'

export const useRandomEvent = () => {
  const { dispatch } = useContext(GameContext)!

  const triggerRandomEvent = useCallback(() => {
    const randomEventChance = Math.random()
    if (randomEventChance < 0.1) {
      const randomEvent = events[Math.floor(Math.random() * events.length)]
      dispatch({ type: 'TRIGGER_EVENT', payload: randomEvent })
    }
  }, [dispatch])

  return triggerRandomEvent
}
