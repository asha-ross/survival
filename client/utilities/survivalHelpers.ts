import {
  DisasterType,
  Location,
  SurvivalGameState,
  SurvivalScenario,
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
  stage: SurvivalGameState['stage'],
  disasterType: DisasterType,
  currentLocation: Location,
): SurvivalScenario {
  const scenarios: Record<SurvivalGameState['stage'], SurvivalScenario[]> = {
    InitialDisaster: [
      {
        id: 'earthquake_home',
        description: 'The ground is shaking violently. What do you do?',
        choices: [
          {
            id: 'take_cover',
            text: 'Take cover under a sturdy desk',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              stage: 'AccessResources',
              preparednessScore: state.preparednessScore + 5,
            }),
          },
          {
            id: 'run_outside',
            text: 'Run outside',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              stage: 'AccessResources',
              preparednessScore: state.preparednessScore - 5,
            }),
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
            id: 'clear_path',
            text: 'Try to clear the path',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              stage: 'SurvivalChallenges',
              preparednessScore: state.preparednessScore + 3,
            }),
          },
          {
            id: 'find_alternative',
            text: 'Find an alternative route',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              stage: 'SurvivalChallenges',
              preparednessScore: state.preparednessScore + 1,
            }),
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
            id: 'ration_water',
            text: 'Ration the remaining water',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              day: state.day + 1,
              preparednessScore: state.preparednessScore + 2,
            }),
          },
          {
            id: 'search_water',
            text: 'Search for a new water source',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              day: state.day + 1,
              preparednessScore: state.preparednessScore + 4,
            }),
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
            id: 'welcome_survivors',
            text: 'Welcome them and share resources',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              day: state.day + 1,
              preparednessScore: state.preparednessScore + 5,
            }),
          },
          {
            id: 'turn_away_survivors',
            text: 'Turn them away to conserve supplies',
            consequence: (state: SurvivalGameState) => ({
              ...state,
              day: state.day + 1,
              preparednessScore: state.preparednessScore - 3,
            }),
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
