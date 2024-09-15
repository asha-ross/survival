// gameData.ts

import {
  Resource,
  Action,
  Event,
  GameState,
  ResourceCategory,
} from '../../models/types'

export const initialResources: Resource[] = [
  {
    id: 'food',
    name: 'Canned Food',
    quantity: 3,
    category: 'Basic',
    location: 'House',
    icon: '🥫',
  },
  {
    id: 'water',
    name: 'Water Bottle',
    quantity: 2,
    category: 'Basic',
    location: 'House',
    icon: '💧',
  },
  {
    id: 'firstAid',
    name: 'First Aid Kit',
    quantity: 1,
    category: 'Basic',
    location: 'House',
    icon: '🩹',
  },
  {
    id: 'health',
    name: 'Health',
    quantity: 100,
    category: 'Personal',
    location: 'On Person',
    icon: '❤️',
  },
]

const possibleStartingItems: Resource[] = [
  {
    id: 'flashlight',
    name: 'Flashlight',
    quantity: 1,
    category: 'Tools',
    location: 'House',
    icon: '🔦',
  },
  {
    id: 'batteries',
    name: 'Batteries',
    quantity: 4,
    category: 'Tools',
    location: 'House',
    icon: '🔋',
  },
  {
    id: 'canOpener',
    name: 'Can Opener',
    quantity: 1,
    category: 'Tools',
    location: 'House',
    icon: '🥫🔧',
  },
  {
    id: 'matchbox',
    name: 'Matchbox',
    quantity: 1,
    category: 'Tools',
    location: 'House',
    icon: '🔥',
  },
  {
    id: 'blanket',
    name: 'Blanket',
    quantity: 2,
    category: 'Basic',
    location: 'House',
    icon: '🛏️',
  },
  {
    id: 'carJumpCables',
    name: 'Car Jump Cables',
    quantity: 1,
    category: 'Tools',
    location: 'Car',
    icon: '🚗⚡',
  },
  {
    id: 'carFirstAidKit',
    name: 'First Aid Kit',
    quantity: 1,
    category: 'Basic',
    location: 'Car',
    icon: '🚗🩹',
  },
  {
    id: 'workgloves',
    name: 'Work Gloves',
    quantity: 1,
    category: 'Tools',
    location: 'Workplace',
    icon: '🧤',
  },
  {
    id: 'waterBottle',
    name: 'Reusable Water Bottle',
    quantity: 1,
    category: 'Basic',
    location: 'Workplace',
    icon: '🍶',
  },
  {
    id: 'pocketknife',
    name: 'Pocket Knife',
    quantity: 1,
    category: 'Tools',
    location: 'On Person',
    icon: '🔪',
  },
]

export const generateStartingInventory = (): Resource[] => {
  const inventory: Resource[] = []
  const itemCount = Math.floor(Math.random() * 5) + 3 // 3 to 7 items

  for (let i = 0; i < itemCount; i++) {
    const randomItem =
      possibleStartingItems[
        Math.floor(Math.random() * possibleStartingItems.length)
      ]
    const existingItem = inventory.find((item) => item.id === randomItem.id)

    if (existingItem) {
      existingItem.quantity += randomItem.quantity
    } else {
      inventory.push({ ...randomItem })
    }
  }

  return inventory
}
export const actions: Action[] = [
  {
    id: 'buildFitness',
    name: 'Build Personal Fitness',
    category: 'Physical Preparedness',
    duration: 30,
    description:
      'Improve your physical condition to better handle survival situations.',
    requirements: [],
    icon: '💪',
    immediateEffect: (gameState: GameState) => {
      const updatedResources = gameState.resources.map((resource) => {
        if (resource.id === 'health') {
          return {
            ...resource,
            quantity: Math.min(100, resource.quantity + 10),
          }
        }
        return resource
      })
      return {
        ...gameState,
        resources: updatedResources,
        preparednessScore: gameState.preparednessScore + 10,
      }
    },
    longTermEffect: 'Increased chance of surviving physical challenges',
    consequences: 'Temporary decrease in energy levels',
    isFree: false,
  },
  {
    id: 'attendFirstAid',
    name: 'Attend First Aid Course',
    category: 'Skill Development',
    duration: 60,
    description:
      'Learn essential first aid skills and acquire basic medical supplies.',
    requirements: [],
    icon: '🩺',
    immediateEffect: (gameState: GameState) => {
      const updatedResources = [
        ...gameState.resources,
        {
          id: 'firstAidSkill',
          name: 'First Aid Skill',
          quantity: 1,
          category: 'Skills' as ResourceCategory,
          location: 'On Person',
          icon: '🩺',
        },
        {
          id: 'medicalSupplies',
          name: 'Basic Medical Supplies',
          quantity: 1,
          category: 'Basic' as ResourceCategory,
          location: 'House',
          icon: '🩺',
        },
      ]
      return {
        ...gameState,
        resources: updatedResources,
        preparednessScore: gameState.preparednessScore + 15,
      }
    },
    longTermEffect: 'Ability to treat injuries and illnesses more effectively',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
  },
  {
    id: 'stockupFood',
    name: 'Stock Up on Non-Perishable Food',
    category: 'Resource Gathering',
    duration: 45,
    description: 'Purchase and store a variety of long-lasting food items.',
    requirements: [],
    icon: '🥫',
    immediateEffect: (gameState: GameState) => {
      const updatedResources = gameState.resources.map((resource) => {
        if (resource.id === 'food') {
          return { ...resource, quantity: resource.quantity + 10 }
        }
        return resource
      })
      if (!updatedResources.find((r) => r.id === 'food')) {
        updatedResources.push({
          id: 'food',
          name: 'Canned Food',
          quantity: 10,
          category: 'Basic',
          location: 'House',
          icon: '🥫',
        })
      }
      return {
        ...gameState,
        resources: updatedResources,
        preparednessScore: gameState.preparednessScore + 20,
      }
    },
    longTermEffect: 'Extended food supply during crisis',
    consequences: 'Significant financial investment',
    isFree: false,
  },
  {
    id: 'learnWaterPurification',
    name: 'Learn Water Purification Techniques',
    category: 'Skill Development',
    duration: 90,
    description: 'Study various methods to make water safe for consumption.',
    requirements: [],
    icon: '💧',
    immediateEffect: (gameState: GameState) => {
      const updatedResources = [
        ...gameState.resources,
        {
          id: 'waterPurificationSkill',
          name: 'Water Purification Skill',
          quantity: 1,
          category: 'Skills' as ResourceCategory,
          location: 'On Person',
          icon: '💧',
        },
      ]
      return {
        ...gameState,
        resources: updatedResources,
        preparednessScore: gameState.preparednessScore + 15,
      }
    },
    longTermEffect:
      'Ability to create safe drinking water from various sources',
    consequences: 'None',
    isFree: false,
  },
  {
    id: 'buildCommunityNetwork',
    name: 'Build Community Network',
    category: 'Social Preparedness',
    duration: 120,
    description:
      'Establish connections with neighbors and local community members.',
    requirements: [],
    icon: '🤝',
    immediateEffect: (gameState: GameState) => {
      const updatedResources = [
        ...gameState.resources,
        {
          id: 'communityTrust',
          name: 'Community Trust',
          quantity: 1,
          category: 'Social' as ResourceCategory,
          location: 'On Person',
          icon: '🤝',
        },
      ]
      return {
        ...gameState,
        resources: updatedResources,
        preparednessScore: gameState.preparednessScore + 25,
      }
    },
    longTermEffect: 'Increased chances of mutual aid during crisis',
    consequences: 'Potential security risk if trust is misplaced',
    isFree: false,
  },
  {
    id: 'organizeGear',
    name: 'Organize Gear',
    category: 'Free Actions',
    duration: 0,
    description:
      'Sort and organize your current gear for better accessibility.',
    requirements: [],
    icon: '🧰',
    immediateEffect: (gameState: GameState) => {
      const updatedResources = gameState.resources.map((resource) => {
        if (resource.category === 'Tools' || resource.category === 'Basic') {
          return { ...resource, quantity: Math.floor(resource.quantity * 1.1) }
        }
        return resource
      })
      return {
        ...gameState,
        resources: updatedResources,
        preparednessScore: gameState.preparednessScore + 5,
      }
    },
    longTermEffect: 'Slightly increased effectiveness of all gear',
    consequences: 'None',
    isFree: true,
  },
  {
    id: 'inventoryCheck',
    name: 'Inventory Check',
    category: 'Free Actions',
    duration: 0,
    description: 'Thoroughly check your inventory for overlooked items.',
    requirements: [],
    icon: '📋',
    immediateEffect: (gameState: GameState) => {
      if (Math.random() < 0.2) {
        const newItem = generateRandomItem()
        return {
          ...gameState,
          resources: [...gameState.resources, newItem],
          preparednessScore: gameState.preparednessScore + 10,
        }
      }
      return {
        ...gameState,
        preparednessScore: gameState.preparednessScore + 2,
      }
    },
    longTermEffect: 'Chance to find an overlooked item',
    consequences: 'None',
    isFree: true,
  },
  {
    id: 'planStrategy',
    name: 'Plan Strategy',
    category: 'Free Actions',
    duration: 0,
    description: 'Take a moment to plan your survival strategy.',
    requirements: [],
    icon: '🧠',
    immediateEffect: (gameState: GameState) => {
      const skillResources = gameState.resources.filter(
        (r) => r.category === 'Skills',
      )
      if (skillResources.length > 0) {
        const randomSkill =
          skillResources[Math.floor(Math.random() * skillResources.length)]
        const updatedResources = gameState.resources.map((r) =>
          r.id === randomSkill.id ? { ...r, quantity: r.quantity + 1 } : r,
        )
        return {
          ...gameState,
          resources: updatedResources,
          preparednessScore: gameState.preparednessScore + 15,
        }
      }
      return {
        ...gameState,
        preparednessScore: gameState.preparednessScore + 5,
      }
    },
    longTermEffect: 'Small random skill boost',
    consequences: 'None',
    isFree: true,
  },
]

export const events: Event[] = [
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

export function generateRandomItem(): Resource {
  const possibleItems: Resource[] = [
    {
      id: 'flashlight',
      name: 'Flashlight',
      quantity: 1,
      category: 'Tools' as ResourceCategory,
      location: 'House',
      icon: '🔦',
    },
    {
      id: 'batteries',
      name: 'Batteries',
      quantity: 2,
      category: 'Tools' as ResourceCategory,
      location: 'House',
      icon: '🔋',
    },
    {
      id: 'firstAidKit',
      name: 'First Aid Kit',
      quantity: 1,
      category: 'Basic' as ResourceCategory,
      location: 'House',
      icon: '🩹',
    },
    {
      id: 'canFood',
      name: 'Canned Food',
      quantity: 3,
      category: 'Basic' as ResourceCategory,
      location: 'House',
      icon: '🥫',
    },
    {
      id: 'ropeLength',
      name: 'Length of Rope',
      quantity: 1,
      category: 'Tools' as ResourceCategory,
      location: 'House',
      icon: '🧵',
    },
  ]
  return possibleItems[Math.floor(Math.random() * possibleItems.length)]
}
