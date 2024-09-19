import { GameState, GameEvent, ResourceCategory } from '../types/types'

export const events: GameEvent[] = [
  {
    id: 'localSale',
    name: 'Sale at Local Store',
    description:
      "There's a sale at the local store. You can get extra supplies at a discount.",
    icon: '🧵',
    choices: [
      {
        text: 'Stock up on canned goods',
        effect: (gameState: GameState) => {
          const updatedResources = gameState.resources.map((resource) => {
            if (resource.id === 'food') {
              return { ...resource, quantity: resource.quantity + 5 }
            }
            return resource
          })
          if (!updatedResources.find((r) => r.id === 'food')) {
            updatedResources.push({
              id: 'food',
              name: 'Canned Food',
              quantity: 5,
              category: 'Basic' as ResourceCategory,
              location: 'House',
              icon: '🏪',
            })
          }
          return {
            ...gameState,
            resources: updatedResources,
            preparednessScore: gameState.preparednessScore + 10,
          }
        },
      },
      {
        text: 'Ignore the sale and continue your preparations',
        effect: (gameState: GameState) => gameState,
      },
    ],
  },
  // Add more events here as needed
]
