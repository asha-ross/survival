// PreparationPhase.tsx

import React, { useEffect, useState } from 'react'
import { GameState, Action } from '../../models/types'
import {
  actions,
  events,
  generateStartingInventory,
} from '../utilities/gameData'

interface PreparationPhaseProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  endPreparationPhase: () => void
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const PreparationPhase: React.FC<PreparationPhaseProps> = ({
  gameState,
  setGameState,
  endPreparationPhase,
}) => {
  const [freeActionUsed, setFreeActionUsed] = useState(false)

  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      resources: [...prevState.resources, ...generateStartingInventory()],
    }))
  }, [setGameState])

  useEffect(() => {
    if (gameState.timeRemaining > 0) {
      const timer = setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }))
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      endPreparationPhase()
    }
  }, [gameState.timeRemaining, setGameState, endPreparationPhase])

  useEffect(() => {
    if (!gameState.currentAction && !gameState.currentEvent) {
      const randomEventChance = Math.random()
      if (randomEventChance < 0.1) {
        // 10% chance of event occurring
        const randomEvent = events[Math.floor(Math.random() * events.length)]
        setGameState((prevState) => ({
          ...prevState,
          currentEvent: randomEvent,
        }))
      }
    }
  }, [gameState.currentAction, gameState.currentEvent, setGameState])

  const handleEventChoice = (choice: {
    text: string
    effect: (gameState: GameState) => GameState
  }) => {
    const updatedGameState = choice.effect(gameState)
    setGameState({
      ...updatedGameState,
      currentEvent: null,
    })
  }

  const handleActionSelect = (action: Action) => {
    if (action.isFree) {
      if (freeActionUsed) {
        alert("You've already used your free action this turn!")
        return
      }
      const updatedGameState = action.immediateEffect(gameState)
      setGameState(updatedGameState)
      setFreeActionUsed(true)
    } else {
      setGameState((prevState) => ({
        ...prevState,
        currentAction: action,
        timeRemaining: prevState.timeRemaining - action.duration,
      }))

      setTimeout(() => {
        setGameState((prevState) => {
          const updatedGameState = action.immediateEffect(prevState)
          return {
            ...updatedGameState,
            currentAction: null,
          }
        })
        setFreeActionUsed(false)
      }, action.duration * 1000)
    }
  }

  return (
    <div className="preparation-phase">
      <h2>PREPARATION Phase</h2>
      <div className="timer">
        Time Remaining: {formatTime(gameState.timeRemaining)}
      </div>
      <div className="preparedness-score">
        Preparedness Score: {gameState.preparednessScore}
      </div>
      <div className="resources">
        <h3>Resources:</h3>
        {['House', 'Car', 'Workplace', 'On Person'].map((location) => (
          <div key={location}>
            <h4>{location}</h4>
            <ul>
              {gameState.resources
                .filter((resource) => resource.location === location)
                .map((resource) => (
                  <li key={resource.id}>
                    {resource.icon} {resource.name}: {resource.quantity}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      {!gameState.currentAction && !gameState.currentEvent && (
        <div className="actions">
          <h3>Available Actions:</h3>
          {Object.entries(
            Object.groupBy(actions, (action) => action.category),
          ).map(([category, categoryActions]) => (
            <div key={category}>
              <h4>{category}</h4>
              {(categoryActions as Action[]).map((action) => (
                <div key={action.id} className="action-item">
                  <h5>
                    {action.name} {action.icon}
                  </h5>
                  <p>{action.description}</p>
                  <p>Duration: {action.duration}s</p>
                  <p>Long-term effect: {action.longTermEffect}</p>
                  {action.consequences && (
                    <p>Potential consequences: {action.consequences}</p>
                  )}
                  <button
                    onClick={() => handleActionSelect(action)}
                    disabled={action.requirements.some(
                      (req) =>
                        !gameState.resources.find((r) => r.id === req) ||
                        (action.isFree && freeActionUsed),
                    )}
                  >
                    {action.isFree ? 'Do Now (Free)' : 'Act Now'}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {gameState.currentAction && (
        <div className="current-action">
          <h3>Current Action:</h3>
          <p>{gameState.currentAction.name}</p>
        </div>
      )}
      {gameState.currentEvent && (
        <div className="event">
          <h3>{gameState.currentEvent.name}</h3>
          <p>{gameState.currentEvent.description}</p>
          {gameState.currentEvent.choices.map((choice, index) => (
            <button key={index} onClick={() => handleEventChoice(choice)}>
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PreparationPhase
