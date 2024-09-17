// types.ts

export type ResourceCategory =
  | 'Basic'
  | 'Tools'
  | 'Skills'
  | 'Social'
  | 'Personal'

export interface Resource {
  id: string
  name: string
  quantity: number
  category: ResourceCategory
  location: string
  icon: string
  level?: number
}

export interface Action {
  id: string
  name: string
  category: string
  duration: number
  description: string
  requirements: string[]
  immediateEffect: (gameState: OverallGameState) => OverallGameState // Updated this line
  longTermEffect: string
  consequences?: string
  isFree: boolean
  icon: string
}

export interface Event {
  id: string
  name: string
  description: string
  icon: string
  choices: Array<{
    text: string
    effect: (gameState: OverallGameState) => OverallGameState
  }>
}

export type DisasterType = 'Earthquake' | 'Flood' | 'ZombiePlague'

export type Location = 'Home' | 'Work' | 'City' | 'Suburbs'

export interface Scenario {
  id: string
  description: string
  choices: {
    text: string
    effect: (gameState: OverallGameState) => OverallGameState // And this line
  }[]
}

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

export interface OverallGameState {
  phase: 'PREPARATION' | 'SURVIVAL'
  timeRemaining: number
  resources: Resource[]
  skills: Skill[]
  currentAction: Action | null
  currentEvent: Event | null
  survivalPhase?: SurvivalPhaseState
  preparednessScore: number
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

export type DisasterScenario = SurvivalScenario
export interface Disaster {
  id: string
  name: string
  description: string
  initialScenarios: SurvivalScenario[] // Changed from Scenario to SurvivalScenario
  ongoingEffects: (gameState: OverallGameState) => OverallGameState
}

export interface SurvivalScenario {
  id: string
  description: string
  choices: Choice[]
}

export interface Choice {
  id: string
  text: string
  consequence: (state: SurvivalGameState) => SurvivalGameState
  requiredSkills?: string[]
  requiredResources?: string[]
}

export interface SurvivalAction {
  id: string
  name: string
  description: string
  execute: (gameState: OverallGameState) => OverallGameState
  requiredSkills?: string[]
  requiredResources?: string[]
  cooldown?: number
}

export interface RandomEvent {
  id: string
  name: string
  description: string
  occur: (gameState: OverallGameState) => OverallGameState
  frequency: number // 0-1, chance of occurring each day
}

export interface SurvivalGameState extends OverallGameState {
  stage: string
  disasterType: DisasterType
  currentLocation: Location
  day: number
  currentDisaster: Disaster | null
  currentScenario: SurvivalScenario | null
  // Add any other properties specific to the survival phase
}

export type GameAction =
  | { type: 'UPDATE_GAME_STATE'; payload: Partial<OverallGameState> }
  | { type: 'END_PREPARATION_PHASE' }
