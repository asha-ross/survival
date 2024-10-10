// src/hooks/useGameState.ts
import { useReducer, useEffect } from 'react'
import { GameState, GameActionUnion } from '../types/types'
import { generateStartingInventory } from '../data/gameData'
import { initialSkills } from '../data/skillData'

//UPDATE THIS -- I think I forgot to add the new states.
// Current issue: progressing through the story steps does not update resources (I added resources to Story Props in StoryCard, but need to work on the logic)
//I'm thinking we need to focus on the Action Selection too, so that those update skills
//Currently in the StorySteps, if you update a skill that works well so use as a structure

const initialState: GameState = {
  character: {
    skills: {},
    supplies: {},
    health: 100,
    morale: 100,
  },
  phase: 'PREPARATION',
  disaster: null,
  timeRemaining: 300, // 5 minutes in seconds
  events: [],
  resources: [],
  skills: [],
  currentAction: null,
  currentEvent: null,
  preparednessScore: 0,
  currentLocation: 'Home',
  day: 1,
  storyStep: 0,
  itemsDiscovered: [],
}

const gameReducer = (state: GameState, action: GameActionUnion): GameState => {
  switch (action.type) {
    case 'UPDATE_GAME_STATE':
      return { ...state, ...action.payload }
    case 'END_PREPARATION_PHASE':
      return { ...state, phase: 'DISASTER' }
    case 'START_DISASTER':
      return { ...state, phase: 'DISASTER', disaster: action.payload }
    case 'MAKE_CHOICE':
      // Implement choice logic
      return state
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.payload }
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] }
    case 'PERFORM_ACTION':
      return { ...state, currentAction: action.payload }
    case 'COMPLETE_ACTION':
      return {
        ...state,
        currentAction: null,
        preparednessScore:
          state.preparednessScore + action.payload.scoreIncrease,
      }
    case 'TRIGGER_EVENT':
      return { ...state, currentEvent: action.payload }
    case 'RESOLVE_EVENT':
      return { ...state, currentEvent: null, ...action.payload.effects }
    case 'START_SURVIVAL_PHASE':
      return { ...state, phase: 'SURVIVAL' }
    case 'UPDATE_RESOURCE':
      return {
        ...state,
        resources: state.resources.map((r) =>
          r.id === action.payload.id
            ? { ...r, quantity: action.payload.quantity }
            : r,
        ),
      }
    case 'ADD_RESOURCE':
      return { ...state, resources: [...state.resources, action.payload] }
    case 'REMOVE_RESOURCE':
      return {
        ...state,
        resources: state.resources.filter((r) => r.id !== action.payload),
      }
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((s) =>
          s.id === action.payload.id
            ? { ...s, level: action.payload.level }
            : s,
        ),
      }
    case 'UPDATE_CHARACTER':
      return { ...state, character: { ...state.character, ...action.payload } }
    case 'CHANGE_LOCATION':
      return { ...state, currentLocation: action.payload }
    case 'ADVANCE_DAY':
      return { ...state, day: state.day + 1 }
    default:
      return state
  }
}

export const useGameState = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    if (gameState.resources.length === 0 && gameState.skills.length === 0) {
      dispatch({
        type: 'UPDATE_GAME_STATE',
        payload: {
          resources: generateStartingInventory(),
          skills: initialSkills,
        },
      })
    }
  }, [gameState.resources.length, gameState.skills.length])

  return { gameState, dispatch }
}
