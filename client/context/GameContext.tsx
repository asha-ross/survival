// src/context/GameContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react'
import { GameActionUnion } from '../types/types'
import { gameReducer } from '../utilities/gameReducer'
import { initialSkills } from '../data/skillData'

import { GameState, Character } from '../types/types'

const initialCharacter: Character = {
  skills: {
    survival: 1,
    firstAid: 1,
    navigation: 1,
    // Add more initial skills as needed
  },
  supplies: {
    water: 3,
    food: 5,
    // Add more initial supplies as needed
  },
  health: 100,
  morale: 100,
}

const initialGameState: GameState = {
  phase: 'PREPARATION',
  storyStep: 0,
  resources: [],
  skills: initialSkills,
  preparednessScore: 0,
  timeRemaining: 300, // 5 minutes in seconds
  currentAction: null,
  currentEvent: null,
  character: initialCharacter,
  disaster: null,
  events: [],
  currentLocation: 'Home',
  day: 0,
  itemsDiscovered: [],
}

// Create the context
export const GameContext = createContext<
  | {
      gameState: GameState
      dispatch: React.Dispatch<GameActionUnion>
    }
  | undefined
>(undefined)

// Create the provider component
interface GameProviderProps {
  children: ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState)

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

// Custom hook for using the game context
export const useGameContext = () => {
  const context = React.useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}
