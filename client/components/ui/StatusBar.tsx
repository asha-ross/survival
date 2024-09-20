// src/components/ui/StatusBar.tsx
import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

interface StatusBarProps {
  timeRemaining: number
  score: number
}
export const StatusBar: React.FC<StatusBarProps> = () => {
  const { gameState } = useContext(GameContext)!

  return (
    <div className="status-bar">
      <div className="status-item">
        <span className="status-label">Phase</span>
        <span className="status-value phase">{gameState.phase}</span>
      </div>
      <div className="status-item">
        <span className="status-label">Preparedness</span>
        <span className="status-value preparedness-score">
          {gameState.preparednessScore}
        </span>
      </div>
      <div className="status-item">
        <span className="status-label">Time Left</span>
        <span className="status-value time-remaining">
          {gameState.timeRemaining}s
        </span>
      </div>
      <div className="status-item">
        <span className="status-label">Health</span>
        <span className="status-value health">
          {gameState.character.health}
        </span>
      </div>
      <div className="status-item">
        <span className="status-label">Morale</span>
        <span className="status-value morale">
          {gameState.character.morale}
        </span>
      </div>
    </div>
  )
}
