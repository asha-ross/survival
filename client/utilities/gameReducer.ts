// src/utils/gameReducer.ts
import { GameState, GameActionUnion, Resource, GameEvent } from '../types/types'

export const gameReducer = (
  state: GameState,
  action: GameActionUnion,
): GameState => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        resources: action.payload.resources,
        skills: action.payload.skills,
      }
    case 'UPDATE_TIME':
      return {
        ...state,
        timeRemaining: action.payload,
      }
    case 'MAKE_CHOICE':
      return {
        ...state,
        // Assuming you have a property for current choice in GameState
        currentChoice: action.payload,
        // Assuming you have a storyStep property in GameState
        storyStep: (state.storyStep || 0) + 1,
      }
    case 'KEEP_ITEM':
      return {
        ...state,
        resources: [...state.resources, action.payload as Resource],
        preparednessScore: state.preparednessScore + 5,
        // Assuming you have an itemsDiscovered property in GameState
        itemsDiscovered: [],
        storyStep: (state.storyStep || 0) + 1,
      }
    case 'DISCARD_ITEM':
      return {
        ...state,
        itemsDiscovered: [],
        storyStep: (state.storyStep || 0) + 1,
      }
    case 'PERFORM_ACTION':
      return {
        ...state,
        currentAction: action.payload,
        timeRemaining: state.timeRemaining - action.payload.duration,
      }
    case 'COMPLETE_ACTION':
      return {
        ...state,
        currentAction: null,
        preparednessScore:
          state.preparednessScore + action.payload.scoreIncrease,
      }
    case 'TRIGGER_EVENT':
      return {
        ...state,
        currentEvent: action.payload as GameEvent,
      }
    case 'RESOLVE_EVENT':
      return {
        ...state,
        currentEvent: null,
        ...action.payload.effects,
      }
    case 'END_PREPARATION_PHASE':
      return {
        ...state,
        phase: 'DISASTER',
      }
    case 'START_SURVIVAL_PHASE':
      return {
        ...state,
        phase: 'SURVIVAL',
      }
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
      return {
        ...state,
        resources: [...state.resources, action.payload as Resource],
      }
    case 'REMOVE_RESOURCE':
      return {
        ...state,
        resources: state.resources.filter((r) => r.id !== action.payload),
      }
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id
            ? { ...skill, level: action.payload.level }
            : skill,
        ),
      }
    case 'UPDATE_CHARACTER':
      return {
        ...state,
        character: { ...state.character, ...action.payload },
      }
    case 'CHANGE_LOCATION':
      return {
        ...state,
        currentLocation: action.payload,
      }
    case 'ADVANCE_DAY':
      return {
        ...state,
        day: (state.day || 1) + 1,
      }
    case 'START_DISASTER':
      return {
        ...state,
        phase: 'DISASTER',
        disaster: action.payload,
        resources: state.resources.filter(
          (resource) => resource.location === 'On Person',
        ),
      }
    case 'NEXT_STORY_STEP':
      return {
        ...state,
        storyStep: state.storyStep + 1,
      }
    case 'START_PREPARATION_PHASE':
      return {
        ...state,
        phase: 'PREPARATION',
        storyStep: 0,
        timeRemaining: 300,
        //other initial states here?
      }
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
      }
    case 'UPDATE_PREPAREDNESS_SCORE':
      return {
        ...state,
        preparednessScore: action.payload,
      }
    default:
      return state
  }
}
