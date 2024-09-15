import {
  DisasterType,
  GameState,
  Location,
  Scenario,
  SurvivalPhaseState,
} from '../../models/types'

export function getRandomDisasterType(): DisasterType {
  const disasters: DisasterType[] = ['Earthquake', 'Flood', 'ZombiePlague']
  return disasters[Math.floor(Math.random() * disasters.length)]
}

export function getRandomLocation(): Location {
  const locations: Location[] = ['Home', 'Work', 'City', 'Suburbs']
  return locations[Math.floor(Math.random() * locations.length)]
}

export function generateScenario(
  stage: SurvivalPhaseState['stage'],
  disasterType: DisasterType,
  location: Location,
): Scenario {
  const scenarios: Record<SurvivalPhaseState['stage'], Scenario[]> = {
    InitialDisaster: [
      {
        id: 'earthquake_home',
        description: 'The ground is shaking violently. What do you do?',
        choices: [
          {
            text: 'Take cover under a sturdy desk',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., slightly increase chances of survival)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  stage: 'AccessResources',
                },
              }
            },
          },
          {
            text: 'Run outside',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., risk of injury but potential to help others)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  stage: 'AccessResources',
                },
              }
            },
          },
        ],
      },
      // Add more InitialDisaster scenarios here
    ],
    AccessResources: [
      {
        id: 'blocked_road',
        description:
          "The road to your supply cache is blocked by debris. What's your plan?",
        choices: [
          {
            text: 'Try to clear the path',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., time passes, energy decreases, but path cleared)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  stage: 'SurvivalChallenges',
                },
              }
            },
          },
          {
            text: 'Find an alternative route',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., takes longer but safer)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  stage: 'SurvivalChallenges',
                },
              }
            },
          },
        ],
      },
      // Add more AccessResources scenarios here
    ],
    SurvivalChallenges: [
      {
        id: 'water_shortage',
        description: 'Your water supply is running low. What will you do?',
        choices: [
          {
            text: 'Ration the remaining water',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., conserve water but risk dehydration)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  day: gameState.survivalPhase!.day + 1,
                },
              }
            },
          },
          {
            text: 'Search for a new water source',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., chance to find water but risk exposure)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  day: gameState.survivalPhase!.day + 1,
                },
              }
            },
          },
        ],
      },
      // Add more SurvivalChallenges scenarios here
    ],
    LongTermSurvival: [
      {
        id: 'community_building',
        description:
          'A group of survivors asks to join your camp. How do you respond?',
        choices: [
          {
            text: 'Welcome them and share resources',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., increase social score but decrease resources)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  day: gameState.survivalPhase!.day + 1,
                },
              }
            },
          },
          {
            text: 'Turn them away to conserve supplies',
            effect: (gameState: GameState) => {
              // Implement effect (e.g., conserve resources but decrease social score)
              return {
                ...gameState,
                survivalPhase: {
                  ...gameState.survivalPhase!,
                  day: gameState.survivalPhase!.day + 1,
                },
              }
            },
          },
        ],
      },
      // Add more LongTermSurvival scenarios here
    ],
  }

  // Filter scenarios based on the current disaster type and location
  const relevantScenarios = scenarios[stage].filter((scenario) => {
    // Implement logic to determine if a scenario is relevant based on disaster type and location
    return true // Placeholder: return all scenarios for now
  })

  // Randomly select a scenario from the relevant ones
  return relevantScenarios[Math.floor(Math.random() * relevantScenarios.length)]
}
