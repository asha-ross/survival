import {
  Disaster,
  OverallGameState,
  RandomEvent,
  SurvivalAction,
  SurvivalScenario,
} from '../types/types'

export const disasters: Disaster[] = [
  {
    id: 'earthquake',
    name: 'Massive Earthquake',
    description:
      'A 7.8 magnitude earthquake has struck, causing widespread destruction.',
    initialScenarios: [
      {
        id: 'trapped',
        description:
          'You are trapped in a partially collapsed building. What do you do?',
        choices: [
          {
            id: 'useTools',
            text: 'Use tools to try and escape',
            consequence: (gameState) => {
              // Logic for using tools to escape
              return gameState
            },
            requiredResources: ['multitool'],
          },
          {
            id: 'callForHelp',
            text: 'Call for help using your emergency whistle',
            consequence: (gameState) => {
              // Logic for calling for help
              return gameState
            },
            requiredResources: ['whistle'],
          },
        ],
      },
      // More scenarios...
    ],
    ongoingEffects: (gameState) => {
      // Ongoing effects of the earthquake, like aftershocks
      return gameState
    },
  },
  // More disasters...
]

export function startDisaster(
  gameState: OverallGameState,
): OverallGameState<SurvivalScenario> {
  const disaster = disasters[Math.floor(Math.random() * disasters.length)]
  const initialScenario =
    disaster.initialScenarios[
      Math.floor(Math.random() * disaster.initialScenarios.length)
    ]

  return {
    ...gameState,
    phase: 'SURVIVAL',
    currentDisaster: disaster,
    currentScenario: initialScenario,
    survivalPhase: {
      ...gameState,
      currentDisaster: disaster,
      currentScenario: initialScenario,
    },
  }
}

export const survivalActions: SurvivalAction[] = [
  {
    id: 'scavenge',
    name: 'Scavenge for Supplies',
    description: 'Search the nearby area for useful resources.',
    execute: (gameState) => {
      // Logic for finding random resources
      return gameState
    },
    cooldown: 4, // hours
  },
  {
    id: 'buildShelter',
    name: 'Improve Shelter',
    description: 'Work on improving your shelter.',
    execute: (gameState) => {
      // Logic for improving shelter quality
      return gameState
    },
    requiredResources: ['wood', 'tools'],
  },
  {
    id: 'communityOutreach',
    name: 'Community Outreach',
    description: 'Attempt to connect with other survivors.',
    execute: (gameState) => {
      // Logic for potentially finding new allies or resources
      return gameState
    },
    requiredSkills: ['charisma'],
  },
  // More actions...
]

export const randomEvents: RandomEvent[] = [
  {
    id: 'strangerArrives',
    name: 'Stranger Arrives',
    description:
      'A stranger approaches your shelter. They look hungry and tired.',
    occur: (gameState) => {
      // Logic for handling the stranger's arrival
      return gameState
    },
    frequency: 0.1,
  },
  // More events...
]

export function advanceTime(
  gameState: OverallGameState,
  hours: number,
): OverallGameState {
  // Logic for advancing time, consuming resources, applying ongoing effects
  return gameState
}
