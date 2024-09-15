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
}

export interface Action {
  id: string
  name: string
  category: string
  duration: number
  description: string
  requirements: string[]
  immediateEffect: (gameState: GameState) => GameState // Updated this line
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
    effect: (gameState: GameState) => GameState
  }>
}

export type DisasterType = 'Earthquake' | 'Flood' | 'ZombiePlague'

export type Location = 'Home' | 'Work' | 'City' | 'Suburbs'

export interface Scenario {
  id: string
  description: string
  choices: {
    text: string
    effect: (gameState: GameState) => GameState // And this line
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

export interface GameState {
  phase: 'PREPARATION' | 'SURVIVAL'
  timeRemaining: number
  resources: Resource[]
  currentAction: Action | null
  currentEvent: Event | null
  survivalPhase?: SurvivalPhaseState
  preparednessScore: number
}
