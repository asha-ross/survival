// src/context/GameContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react'
import { GameActionUnion, GameState, Character, Resource } from '../types/types'
import { gameReducer } from '../utilities/gameReducer'
import { initialSkills, learnableSkills } from '../data/skillData'
import { initialResources, possibleStartingItems } from '../data/gameData'

const generateStartingInventory = (): Resource[] => {
  const inventory: Resource[] = [...initialResources]
  const itemCount = Math.floor(Math.random() * 3) + 2 // 2 to 4 additional items

  for (let i = 0; i < itemCount; i++) {
    const randomItem =
      possibleStartingItems[
        Math.floor(Math.random() * possibleStartingItems.length)
      ]
    const existingItem = inventory.find((item) => item.id === randomItem.id)

    if (existingItem) {
      existingItem.quantity += randomItem.quantity
    } else {
      inventory.push({ ...randomItem })
    }
  }

  return inventory
}

const initialCharacter: Character = {
  skills: {
    awareness: 1,
    fitness: 1,
    communication: 1,
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
  resources: generateStartingInventory(),
  skills: [
    ...initialSkills,
    ...learnableSkills.map((skill) => ({ ...skill, level: 0 })),
  ],
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
