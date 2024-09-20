// src/components/GameContainer.tsx
import React, { useCallback, useContext, useEffect } from 'react'
import { GameContext } from '../context/GameContext'
import { usePreparationPhase } from '../hooks/usePreparationPhase'
import { StatusBar } from './ui/StatusBar'
import EventHandler from './ui/EventHandler'
import { storySteps } from '../data/storyData'
import { Resource } from '../types/types'
import PreparationPhase from './phases/PreparationPhase'

interface GameContainerProps {
  justWokeUp: boolean
}

const GameContainer: React.FC<GameContainerProps> = ({ justWokeUp }) => {
  const { gameState, dispatch } = useContext(GameContext)!
  const {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    triggerDisaster,
  } = usePreparationPhase()

  const handleStartPreparationPhase = useCallback(() => {
    startTimer()
    dispatch({ type: 'START_PREPARATION_PHASE' })
  }, [startTimer, dispatch])

  useEffect(() => {
    if (justWokeUp) {
      handleStartPreparationPhase()
    }
  }, [justWokeUp, handleStartPreparationPhase])

  useEffect(() => {
    // Update the game state with the current time remaining
    dispatch({ type: 'UPDATE_TIME', payload: timeRemaining })
  }, [timeRemaining, dispatch])

  useEffect(() => {
    if (isRunning) {
      const disasterTime = Math.floor(Math.random() * (420 - 180 + 1)) + 180 // Random time between 3-7 minutes
      const disasterTimer = setTimeout(triggerDisaster, disasterTime * 1000)
      return () => clearTimeout(disasterTimer)
    }
  }, [isRunning, triggerDisaster])

  const handleStoryChoice = (choiceId: string) => {
    const currentStep = storySteps[gameState.storyStep]
    const choice = currentStep.choices.find((c) => c.id === choiceId)

    if (choice && choice.effects) {
      if (choice.effects.resources) {
        choice.effects.resources.forEach((resourceEffect) => {
          if (resourceEffect.id) {
            const existingResource = gameState.resources.find(
              (r) => r.id === resourceEffect.id,
            )
            if (existingResource) {
              dispatch({
                type: 'UPDATE_RESOURCE',
                payload: {
                  id: resourceEffect.id,
                  quantity:
                    existingResource.quantity + (resourceEffect.quantity || 0),
                },
              })
            } else if (
              resourceEffect.name &&
              resourceEffect.category &&
              resourceEffect.location &&
              resourceEffect.icon
            ) {
              dispatch({
                type: 'ADD_RESOURCE',
                payload: {
                  ...resourceEffect,
                  quantity: resourceEffect.quantity || 1,
                } as Resource,
              })
            }
          }
        })
      }
    }

    if (gameState.storyStep < storySteps.length - 1) {
      dispatch({ type: 'NEXT_STORY_STEP' })
    } else {
      dispatch({ type: 'END_PREPARATION_PHASE' })
    }
  }

  const renderPhaseContent = () => {
    switch (gameState.phase) {
      case 'PREPARATION':
        return <PreparationPhase />
      case 'DISASTER':
        return <div>Disaster Phase Content</div>
      case 'SURVIVAL':
        return <div>Survival Phase Content</div>
      default:
        return null
    }
  }

  return (
    <div>
      <StatusBar
        timeRemaining={timeRemaining}
        score={gameState.preparednessScore}
      />
      {renderPhaseContent()}
      {gameState.currentEvent && (
        <EventHandler
          event={gameState.currentEvent}
          onChoice={handleStoryChoice}
        />
      )}

      <div className="game-controls">
        {isRunning ? (
          <button onClick={stopTimer}>Pause</button>
        ) : (
          <button onClick={startTimer}>Resume</button>
        )}
        <button onClick={() => resetTimer(300)}>Reset Timer (5 minutes)</button>
      </div>
    </div>
  )
}

export default GameContainer
