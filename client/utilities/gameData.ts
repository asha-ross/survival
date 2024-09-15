// gameData.ts

import { Resource, Action, Event } from '../../models/types'

export const initialResources: Resource[] = [
  { id: 'food', name: 'Canned Food', quantity: 3, category: 'Basic' },
  { id: 'water', name: 'Water Bottle', quantity: 2, category: 'Basic' },
  { id: 'firstAid', name: 'First Aid Kit', quantity: 1, category: 'Basic' },
  { id: 'health', name: 'Health', quantity: 100, category: 'Personal' },
]

export const actions: Action[] = [
  {
    id: 'buildFitness',
    name: 'Build Personal Fitness',
    category: 'Physical Preparedness',
    duration: 30,
    description:
      'Improve your physical condition to better handle survival situations.',
    requirements: [],
    immediateEffect: (resources) => {
      const healthIndex = resources.findIndex((r) => r.id === 'health')
      if (healthIndex !== -1) {
        resources[healthIndex].quantity = Math.min(
          100,
          resources[healthIndex].quantity + 10,
        )
      } else {
        resources.push({
          id: 'health',
          name: 'Health',
          quantity: 60,
          category: 'Personal',
        })
      }
      return resources
    },
    longTermEffect: 'Increased chance of surviving physical challenges',
    consequences: 'Temporary decrease in energy levels',
  },
  {
    id: 'attendFirstAid',
    name: 'Attend First Aid Course',
    category: 'Skill Development',
    duration: 60,
    description:
      'Learn essential first aid skills and acquire basic medical supplies.',
    requirements: [],
    immediateEffect: (resources) => {
      resources.push({
        id: 'firstAidSkill',
        name: 'First Aid Skill',
        quantity: 1,
        category: 'Skills',
      })
      resources.push({
        id: 'medicalSupplies',
        name: 'Basic Medical Supplies',
        quantity: 1,
        category: 'Basic',
      })
      return resources
    },
    longTermEffect: 'Ability to treat injuries and illnesses more effectively',
    consequences:
      'Time spent learning could have been used for other preparations',
  },
  {
    id: 'stockupFood',
    name: 'Stock Up on Non-Perishable Food',
    category: 'Resource Gathering',
    duration: 45,
    description: 'Purchase and store a variety of long-lasting food items.',
    requirements: [],
    immediateEffect: (resources) => {
      const foodIndex = resources.findIndex((r) => r.id === 'food')
      if (foodIndex !== -1) {
        resources[foodIndex].quantity += 10
      } else {
        resources.push({
          id: 'food',
          name: 'Canned Food',
          quantity: 10,
          category: 'Basic',
        })
      }
      return resources
    },
    longTermEffect: 'Extended food supply during crisis',
    consequences: 'Significant financial investment',
  },
  {
    id: 'learnWaterPurification',
    name: 'Learn Water Purification Techniques',
    category: 'Skill Development',
    duration: 90,
    description: 'Study various methods to make water safe for consumption.',
    requirements: [],
    immediateEffect: (resources) => {
      resources.push({
        id: 'waterPurificationSkill',
        name: 'Water Purification Skill',
        quantity: 1,
        category: 'Skills',
      })
      return resources
    },
    longTermEffect:
      'Ability to create safe drinking water from various sources',
    consequences: 'None',
  },
  {
    id: 'buildCommunityNetwork',
    name: 'Build Community Network',
    category: 'Social Preparedness',
    duration: 120,
    description:
      'Establish connections with neighbors and local community members.',
    requirements: [],
    immediateEffect: (resources) => {
      resources.push({
        id: 'communityTrust',
        name: 'Community Trust',
        quantity: 1,
        category: 'Social',
      })
      return resources
    },
    longTermEffect: 'Increased chances of mutual aid during crisis',
    consequences: 'Potential security risk if trust is misplaced',
  },
]

export const events: Event[] = [
  {
    id: 'localSale',
    name: 'Sale at Local Store',
    description:
      "There's a sale at the local store. You can get extra supplies at a discount.",
    choices: [
      {
        text: 'Stock up on canned goods',
        effect: (resources) => {
          const foodIndex = resources.findIndex((r) => r.id === 'food')
          if (foodIndex !== -1) {
            resources[foodIndex].quantity += 5
          } else {
            resources.push({
              id: 'food',
              name: 'Canned Food',
              quantity: 5,
              category: 'Basic',
            })
          }
          return resources
        },
      },
      {
        text: 'Ignore the sale and continue your preparations',
        effect: (resources) => resources,
      },
    ],
  },
  // Add more events here
]
