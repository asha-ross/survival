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
      <div>Phase: {gameState.phase}</div>
      <div>Preparedness Score: {gameState.preparednessScore}</div>
      <div>Time Remaining: {gameState.timeRemaining}s</div>
      <div>Health: {gameState.character.health}</div>
      <div>Morale: {gameState.character.morale}</div>
    </div>
  )
}
