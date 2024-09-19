// src/hooks/usePreparationPhase.ts
import { useContext, useCallback } from 'react'
import { GameContext } from '../context/GameContext'
import { useTimer } from './useTimer'
import { GameAction, DisasterType } from '../types/types'

export const usePreparationPhase = () => {
  const { gameState, dispatch } = useContext(GameContext)!
  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer(
    gameState.timeRemaining,
    () => dispatch({ type: 'END_PREPARATION_PHASE' }),
  )

  const makeChoice = useCallback(
    (choice: string) => {
      dispatch({ type: 'MAKE_CHOICE', payload: choice })
    },
    [dispatch],
  )

  const performAction = useCallback(
    (action: GameAction) => {
      dispatch({ type: 'PERFORM_ACTION', payload: action })
      // Simulate action duration
      setTimeout(() => {
        dispatch({
          type: 'COMPLETE_ACTION',
          payload: {
            scoreIncrease:
              typeof action.scoreIncrease === 'number'
                ? action.scoreIncrease
                : 0,
          },
        })
      }, action.duration * 1000)
    },
    [dispatch],
  )

  const triggerDisaster = useCallback(() => {
    const disasters: DisasterType[] = [
      'Earthquake',
      'Flood',
      'ZombiePlague',
      'Wildfire',
      'Hurricane',
    ]
    const randomDisaster =
      disasters[Math.floor(Math.random() * disasters.length)]

    dispatch({ type: 'START_DISASTER', payload: randomDisaster })
    stopTimer() // Stop the preparation phase timer
  }, [dispatch, stopTimer])

  return {
    timeRemaining: time,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    makeChoice,
    performAction,
    triggerDisaster,
  }
}
