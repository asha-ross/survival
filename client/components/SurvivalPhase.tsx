import React, { useEffect } from 'react'
import { GameState, SurvivalPhaseState } from '../../models/types'
import {
  getRandomDisasterType,
  getRandomLocation,
  generateScenario,
} from '../utilities/survivalHelpers'

interface SurvivalPhaseProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}

const initialSurvivalState: SurvivalPhaseState = {
  stage: 'InitialDisaster',
  disasterType: 'Earthquake',
  currentLocation: 'Home',
  day: 1,
  currentScenario: null,
}

const SurvivalPhase: React.FC<SurvivalPhaseProps> = ({
  gameState,
  setGameState,
}) => {
  useEffect(() => {
    // Initialize survival phase
    const disasterType = getRandomDisasterType()
    const startingLocation = getRandomLocation()
    setGameState((prev) => ({
      ...prev,
      survivalPhase: {
        ...initialSurvivalState,
        disasterType,
        currentLocation: startingLocation,
      },
    }))
  }, [setGameState])

  useEffect(() => {
    // Generate scenarios based on current stage
    if (gameState.survivalPhase && !gameState.survivalPhase.currentScenario) {
      const newScenario = generateScenario(
        gameState.survivalPhase.stage,
        gameState.survivalPhase.disasterType,
        gameState.survivalPhase.currentLocation,
      )
      setGameState((prev) => ({
        ...prev,
        survivalPhase: {
          ...prev.survivalPhase!,
          currentScenario: newScenario,
        },
      }))
    }
  }, [gameState.survivalPhase, setGameState])

  const handleChoice = (choiceIndex: number) => {
    if (gameState.survivalPhase?.currentScenario) {
      const choice =
        gameState.survivalPhase.currentScenario.choices[choiceIndex]
      const newGameState = choice.effect(gameState)
      setGameState({
        ...newGameState,
        survivalPhase: {
          ...newGameState.survivalPhase!,
          currentScenario: null,
        },
      })
      // Progress to next stage or day based on game logic
    }
  }

  if (!gameState.survivalPhase) {
    return <div>Loading Survival Phase...</div>
  }

  return (
    <div className="survival-phase">
      <h2>Survival Phase - Day {gameState.survivalPhase.day}</h2>
      <p>Disaster: {gameState.survivalPhase.disasterType}</p>
      <p>Location: {gameState.survivalPhase.currentLocation}</p>
      {gameState.survivalPhase.currentScenario && (
        <div className="scenario">
          <p>{gameState.survivalPhase.currentScenario.description}</p>
          {gameState.survivalPhase.currentScenario.choices.map(
            (choice, index) => (
              <button key={index} onClick={() => handleChoice(index)}>
                {choice.text}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  )
}

export default SurvivalPhase
