// types.ts

export interface Resource {
  id: string
  name: string
  quantity: number
  category: 'Basic' | 'Tools' | 'Skills' | 'Social' | 'Personal'
}

export interface Action {
  id: string
  name: string
  category: string
  duration: number
  description: string
  requirements: string[]
  immediateEffect: (resources: Resource[]) => Resource[]
  longTermEffect: string
  consequences?: string
}

export interface Event {
  id: string
  name: string
  description: string
  choices: { text: string; effect: (resources: Resource[]) => Resource[] }[]
}

export interface GameState {
  phase: 'PREPARATION' | 'SURVIVAL'
  timeRemaining: number
  resources: Resource[]
  currentAction: Action | null
  currentEvent: Event | null
}
