// MainGame.tsx

import React, { useState, useCallback } from 'react'
import { OverallGameState, SurvivalGameState } from '../../models/types'
import PreparationPhase from './PreparationPhase'
import SurvivalPhase from './SurvivalPhase'
import { initialResources } from '../utilities/gameData'
import '../styles/main.css'

const MainGame: React.FC = () => {
  const [gameState, setGameState] = useState<OverallGameState>({
    phase: 'PREPARATION',
    timeRemaining: 5 * 60, // 5 minutes in seconds
    resources: initialResources,
    skills: [],
    currentAction: null,
    currentEvent: null,
    preparednessScore: 0,
  })

  const [survivalState, setSurvivalState] = useState<SurvivalGameState | null>(
    null,
  )

  const endPreparationPhase = useCallback(() => {
    const initialSurvivalState: SurvivalGameState = {
      phase: 'SURVIVAL',
      stage: 'InitialDisaster',
      disasterType: 'Earthquake',
      currentLocation: 'Home',
      day: 1,
      resources: gameState.resources,
      skills: gameState.skills,
      currentDisaster: null,
      currentScenario: null,
      preparednessScore: gameState.preparednessScore,
    }
    setSurvivalState(initialSurvivalState)
  }, [gameState])

  return (
    <>
      <h1 className="header">Survival</h1>
      <div className="survival-game">
        {!survivalState ? (
          <PreparationPhase
            gameState={gameState}
            setGameState={setGameState}
            endPreparationPhase={endPreparationPhase}
          />
        ) : (
          <SurvivalPhase
            survivalState={survivalState}
            setSurvivalState={setSurvivalState}
          />
        )}
      </div>
    </>
  )
}

export default MainGame
