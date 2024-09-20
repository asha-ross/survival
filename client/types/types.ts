// src/types/index.ts

// Basic types
export type DisasterType =
  | 'Earthquake'
  | 'Flood'
  | 'ZombiePlague'
  | 'Wildfire'
  | 'Hurricane'
export type GamePhase = 'PREPARATION' | 'DISASTER' | 'SURVIVAL'
export type Location = 'Home' | 'Work' | 'City' | 'Suburbs'
export type ResourceCategory =
  | 'Basic'
  | 'Tools'
  | 'Skills'
  | 'Social'
  | 'Personal'

// Resource and Skill types
export interface Resource {
  id: string
  name: string
  quantity: number
  category: ResourceCategory
  location: string
  icon: string
  level?: number
}

export interface Skill {
  id: string
  name: string
  level: number
  icon: string
  description: string
  requirements: string[]
  effects: string[]
  maxLevel: number
}

// Action types
export interface GameAction {
  id: string
  name: string
  category: string
  duration: number
  description: string
  requirements: string[]
  immediateEffect: (gameState: GameState) => GameState
  longTermEffect: string
  consequences?: string
  isFree: boolean
  icon: string
  scoreIncrease: number
  maxLevel?: number
}

// Event types
export interface GameEvent {
  id: string
  name: string
  description: string
  icon: string
  choices: Array<{
    text: string
    effect: (gameState: GameState) => GameState
  }>
}

// Scenario types
export interface Scenario {
  id: string
  description: string
  choices: {
    text: string
    effect: (gameState: GameState) => GameState
  }[]
}

// Survival Phase types
export interface SurvivalPhaseState {
  stage:
    | 'InitialDisaster'
    | 'AccessResources'
    | 'SurvivalChallenges'
    | 'LongTermSurvival'
  disasterType: DisasterType
  currentLocation: Location
  day: number
  currentScenario: Scenario | null
}

// Character type
export interface Character {
  skills: { [key: string]: number } // Changed from string[] to an object
  supplies: { [key: string]: number }
  health: number
  morale: number
}
// Main GameState type
export interface GameState {
  character: Character
  phase: GamePhase
  disaster: DisasterType | null
  timeRemaining: number
  events: string[]
  resources: Resource[]
  skills: Skill[]
  currentAction: GameAction | null
  currentEvent: GameEvent | null
  survivalPhase?: SurvivalPhaseState
  preparednessScore: number
  currentLocation: Location
  day: number
  storyStep: number
  currentChoice?: string
  itemsDiscovered: Resource[]
}

// Disaster type
export interface Disaster {
  id: string
  name: string
  description: string
  initialScenarios: Scenario[]
  ongoingEffects: (gameState: GameState) => GameState
}

// SurvivalAction type
export interface SurvivalAction {
  id: string
  name: string
  description: string
  execute: (gameState: GameState) => GameState
  requiredSkills?: string[]
  requiredResources?: string[]
  cooldown?: number
}

// RandomEvent type
export interface RandomEvent {
  id: string
  name: string
  description: string
  occur: (gameState: GameState) => GameState
  frequency: number // 0-1, chance of occurring each day
}

// GameAction union type (for reducer)
export type GameActionUnion =
  | { type: 'UPDATE_GAME_STATE'; payload: Partial<GameState> }
  | { type: 'END_PREPARATION_PHASE' }
  | { type: 'START_DISASTER'; payload: DisasterType }
  | { type: 'MAKE_CHOICE'; payload: string }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'ADD_EVENT'; payload: string }
  | { type: 'PERFORM_ACTION'; payload: GameAction }
  | { type: 'COMPLETE_ACTION'; payload: { scoreIncrease: number } }
  | { type: 'TRIGGER_EVENT'; payload: GameEvent } // Changed Event to GameEvent
  | { type: 'RESOLVE_EVENT'; payload: { effects: Partial<GameState> } }
  | { type: 'START_SURVIVAL_PHASE' }
  | { type: 'UPDATE_RESOURCE'; payload: { id: string; quantity: number } }
  | { type: 'ADD_RESOURCE'; payload: Resource }
  | { type: 'REMOVE_RESOURCE'; payload: string }
  | { type: 'UPDATE_SKILL'; payload: { id: string; level: number } }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_CHARACTER'; payload: Partial<Character> }
  | { type: 'CHANGE_LOCATION'; payload: Location }
  | { type: 'ADVANCE_DAY' }
  | { type: 'START_PREPARATION_PHASE' }
  | { type: 'UPDATE_PREPAREDNESS_SCORE'; payload: number }
  | { type: 'NEXT_STORY_STEP' }
  | { type: 'SET_CURRENT_ACTION'; payload: GameAction }
  | { type: 'CLEAR_CURRENT_ACTION' }
  | {
      type: 'INITIALIZE_GAME'
      payload: { resources: Resource[]; skills: Skill[] }
    }
  | { type: 'KEEP_ITEM'; payload: Resource }
  | { type: 'DISCARD_ITEM' }

// Context type
export interface GameContextType {
  gameState: GameState
  dispatch: React.Dispatch<GameActionUnion>
}

export interface StoryChoice {
  id: string
  text: string
  effects?: {
    resources?: Partial<Resource>[]
    skills?: Partial<Skill>[]
  }
}

export interface StoryStep {
  description: string
  choices: StoryChoice[]
}
