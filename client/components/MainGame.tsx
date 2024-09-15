// MainGame.tsx

import React, { useState, useCallback } from 'react'
import { GameState } from '../../models/types'
import PreparationPhase from './PreparationPhase'
import SurvivalPhase from './SurvivalPhase'
import { initialResources } from '../utilities/gameData'

const MainGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'PREPARATION',
    timeRemaining: 5 * 60, // 5 minutes in seconds
    resources: initialResources,
    currentAction: null,
    currentEvent: null,
  })

  const endPreparationPhase = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      phase: 'SURVIVAL',
      timeRemaining: 0,
    }))
    console.log('PREPARATION phase ended. Transitioning to SURVIVAL phase...')
  }, [])

  return (
    <div className="survival-game">
      <h1>Survival Game</h1>
      {gameState.phase === 'PREPARATION' ? (
        <PreparationPhase
          gameState={gameState}
          setGameState={setGameState}
          endPreparationPhase={endPreparationPhase}
        />
      ) : (
        <SurvivalPhase gameState={gameState} setGameState={setGameState} />
      )}
    </div>
  )
}

export default MainGame
