// SurvivalPhase.tsx

import React, { useState, useEffect, useCallback } from 'react'
import { GameState } from '../../models/types'

interface SurvivalPhaseProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}

const SurvivalPhase: React.FC<SurvivalPhaseProps> = ({
  gameState,
  setGameState,
}) => {
  const [day, setDay] = useState(1)

  const checkGameOver = useCallback(() => {
    const basicResources = gameState.resources.filter(
      (r) => r.category === 'Basic',
    )
    return basicResources.every((r) => r.quantity === 0)
  }, [gameState.resources])

  useEffect(() => {
    const consumeResources = () => {
      setGameState((prevState) => {
        const updatedResources = prevState.resources.map((resource) => {
          if (resource.category === 'Basic') {
            return { ...resource, quantity: Math.max(0, resource.quantity - 1) }
          }
          return resource
        })

        return {
          ...prevState,
          resources: updatedResources,
        }
      })
    }

    const timer = setInterval(() => {
      setDay((prevDay) => prevDay + 1)
      consumeResources()
    }, 10000) // Every 10 seconds represents a new day

    return () => clearInterval(timer)
  }, [setGameState])

  return (
    <div className="survival-phase">
      <h2>SURVIVAL Phase</h2>
      <p>Day: {day}</p>
      <p>You are now in the survival phase. Use your resources wisely!</p>
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
      {checkGameOver() && (
        <p className="game-over">
          Game Over! You have run out of basic resources.
        </p>
      )}
    </div>
  )
}

export default SurvivalPhase
