// PreparationPhase.tsx

import React, { useEffect } from 'react'
import { GameState, Action, Resource } from '../../models/types'
import { actions, events } from '../utilities/gameData'

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
  }, [gameState, setGameState])

  const handleActionSelect = (action: Action) => {
    setGameState((prevState) => ({
      ...prevState,
      currentAction: action,
      timeRemaining: prevState.timeRemaining - action.duration,
    }))

    setTimeout(() => {
      setGameState((prevState) => ({
        ...prevState,
        resources: action.immediateEffect([...prevState.resources]),
        currentAction: null,
      }))
    }, action.duration * 1000)
  }

  const handleEventChoice = (choice: {
    text: string
    effect: (resources: Resource[]) => Resource[]
  }) => {
    setGameState((prevState) => ({
      ...prevState,
      resources: choice.effect([...prevState.resources]),
      currentEvent: null,
    }))
  }

  return (
    <div className="preparation-phase">
      <h2>PREPARATION Phase</h2>
      <div className="timer">
        Time Remaining: {formatTime(gameState.timeRemaining)}
      </div>
      <div className="resources">
        <h3>Resources:</h3>
        <ul>
          {gameState.resources.map((resource) => (
            <li key={resource.id}>
              {resource.name}: {resource.quantity}
            </li>
          ))}
        </ul>
      </div>
      {!gameState.currentAction && !gameState.currentEvent && (
        <div className="actions">
          <h3>Available Actions:</h3>
          {Object.entries(
            Object.groupBy(actions, (action: Action) => action.category),
          ).map(([category, categoryActions]) => (
            <div key={category}>
              <h4>{category}</h4>
              {(categoryActions as Action[]).map((action) => (
                <div key={action.id} className="action-item">
                  <h5>{action.name}</h5>
                  <p>{action.description}</p>
                  <p>Duration: {action.duration}s</p>
                  <p>Long-term effect: {action.longTermEffect}</p>
                  {action.consequences && (
                    <p>Potential consequences: {action.consequences}</p>
                  )}
                  <button
                    onClick={() => handleActionSelect(action)}
                    disabled={action.requirements.some(
                      (req) => !gameState.resources.find((r) => r.id === req),
                    )}
                  >
                    Act Now
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
