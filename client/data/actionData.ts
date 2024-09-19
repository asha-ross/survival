import { GameAction, GameState, ResourceCategory } from '../types/types'
import { generateRandomItem } from './gameData'

const actions: GameAction[] = [
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
    scoreIncrease: 10,
  },
  {
    id: 'weatherPrediction',
    name: 'Study Weather Patterns',
    category: 'Skill Development',
    duration: 90,
    description: 'Learn to forecast weather based on natural signs.',
    requirements: [],
    icon: '🌦️',
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'weatherPrediction',
      )
      let updatedSkills

      if (existingSkill) {
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'weatherPrediction'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'weatherPrediction',
            name: 'Weather Prediction',
            level: 1,
            icon: '🌦️',
            description: 'Forecast weather based on natural signs',
            requirements: [],
            effects: ['Can anticipate and prepare for weather changes'],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 12,
      }
    },
    longTermEffect:
      'Improved ability to plan activities and make decisions based on weather forecasts.',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
    scoreIncrease: 10,
  },
  {
    id: 'improvisation',
    name: 'Practice Improvisation',
    category: 'Skill Development',
    duration: 45,
    description:
      'Practice thinking on your feet and creating solutions with limited resources.',
    requirements: [],
    icon: '🎭',
    scoreIncrease: 5,
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'improvisation',
      )
      let updatedSkills

      if (existingSkill) {
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'improvisation'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'improvisation',
            name: 'Improvisation',
            level: 1,
            icon: '🎭',
            description:
              'Ability to think on your feet and create solutions with limited resources',
            requirements: [],
            effects: [
              'Increased chance of finding creative solutions to problems',
            ],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 10,
      }
    },
    longTermEffect:
      'Improved ability to handle unexpected situations and solve problems creatively.',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
  },
  {
    id: 'storytelling',
    name: 'Practice Storytelling',
    category: 'Skill Development',
    duration: 60,
    description: 'Learn to craft and tell engaging stories.',
    requirements: [],
    icon: '📚',
    scoreIncrease: 15,
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'storytelling',
      )
      let updatedSkills

      if (existingSkill) {
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'storytelling'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'storytelling',
            name: 'Storytelling',
            level: 1,
            icon: '📚',
            description: 'Craft and tell engaging stories',
            requirements: [],
            effects: ['Can boost morale and create social bonds'],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 8,
      }
    },
    longTermEffect:
      'Enhanced ability to communicate effectively and build relationships.',
    consequences:
      'Time spent learning could have been used for other preparations',
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
    scoreIncrease: 15,
    immediateEffect: (gameState: GameState) => {
      const updatedSkills = [
        ...gameState.skills,
        {
          id: 'firstAidSkill',
          name: 'First Aid',
          level: 1,
          icon: '🩺',
          description: 'Basic knowledge of first aid techniques',
          requirements: [],
          effects: ['Can treat minor injuries'],
          maxLevel: 5,
        },
      ]

      const updatedResources = [
        ...gameState.resources,
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
        skills: updatedSkills,
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
    id: 'knitting',
    name: 'Learn Knitting',
    category: 'Skill Development',
    duration: 60,
    description: 'Learn to create fabric items using yarn or thread.',
    requirements: [],
    icon: '🧶',
    scoreIncrease: 10,
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'knitting',
      )
      let updatedSkills

      if (existingSkill) {
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'knitting'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'knitting',
            name: 'Knitting',
            level: 1,
            icon: '🧶',
            description: 'Create fabric items using yarn or thread',
            requirements: [],
            effects: ['Can create warm clothing and repair fabric items'],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 8,
      }
    },
    longTermEffect:
      'Ability to create and repair clothing, potentially crucial for survival in harsh conditions.',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
  },
  {
    id: 'astronomy',
    name: 'Study Astronomy',
    category: 'Skill Development',
    duration: 90,
    description: 'Learn about celestial bodies and their movements.',
    requirements: [],
    scoreIncrease: 5,
    icon: '🌟',
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'astronomy',
      )
      let updatedSkills

      if (existingSkill) {
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'astronomy'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'astronomy',
            name: 'Astronomy',
            level: 1,
            icon: '🌟',
            description: 'Knowledge of celestial bodies and their movements',
            requirements: [],
            effects: ['Improved navigation at night and time-telling'],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 10,
      }
    },
    longTermEffect:
      'Enhanced ability to navigate and tell time without modern instruments.',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
  },
  {
    id: 'whistling',
    name: 'Practice Whistling',
    category: 'Skill Development',
    duration: 30,
    description: 'Learn to produce clear, loud whistles.',
    requirements: [],
    scoreIncrease: 7,
    icon: '😗',
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'whistling',
      )
      let updatedSkills

      if (existingSkill) {
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'whistling'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'whistling',
            name: 'Whistling',
            level: 1,
            icon: '😗',
            description: 'Produce clear, loud whistles',
            requirements: [],
            effects: ['Can signal over long distances or mimic bird calls'],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 5,
      }
    },
    longTermEffect:
      'Improved ability to communicate over distances or attract attention when needed.',
    consequences:
      'Potential to attract unwanted attention in dangerous situations',
    isFree: true,
  },
  {
    id: 'birdCalling',
    name: 'Practice Bird Calling',
    category: 'Skill Development',
    duration: 45,
    scoreIncrease: 10,
    description: 'Learn to mimic various bird calls and songs.',
    requirements: [],
    icon: '🐦',
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'birdCalling',
      )
      let updatedSkills

      if (existingSkill) {
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'birdCalling'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'birdCalling',
            name: 'Bird Calling',
            level: 1,
            icon: '🐦',
            description: 'Mimic various bird calls and songs',
            requirements: [],
            effects: ['Can attract birds or communicate over distances subtly'],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 7,
      }
    },
    longTermEffect:
      'Enhanced ability to communicate subtly or attract specific birds for various purposes.',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
  },
  {
    id: 'learnKnotTying',
    name: 'Learn Knot Tying',
    category: 'Skill Development',
    scoreIncrease: 15,
    duration: 60,
    description: 'Learn to tie various useful knots.',
    requirements: ['survival101'],
    icon: '🪢',
    immediateEffect: (gameState: GameState) => {
      const existingSkillIndex = gameState.skills.findIndex(
        (skill) => skill.id === 'knotTying',
      )
      let updatedSkills

      if (existingSkillIndex !== -1) {
        // Skill exists, upgrade it
        updatedSkills = gameState.skills.map((skill, index) =>
          index === existingSkillIndex
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        // Skill doesn't exist, add it
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'knotTying',
            name: 'Knot Tying',
            level: 1,
            icon: '🪢',
            description:
              'Knowledge of tying useful knots for various situations.',
            requirements: ['survival101'],
            effects: [
              'Can tie various knots, improving efficiency in rope-related tasks.',
            ],
            maxLevel: 5,
          },
        ]
      }

      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 15,
      }
    },
    longTermEffect:
      'Improved ability to secure items, create tools, and solve rope-related challenges.',
    consequences:
      'Time spent learning could have been used for other preparations.',
    isFree: false,
  },
  {
    id: 'learn_foraging',
    name: 'Learn Foraging',
    category: 'Skill Development',
    scoreIncrease: 15,
    duration: 60,
    description:
      'Study local edible plants and fungi to improve foraging skills.',
    requirements: ['survival101'],
    icon: '🍄',
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'foraging',
      )
      let updatedSkills

      if (existingSkill) {
        // Skill exists, increase its level
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'foraging'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        // Skill doesn't exist, add it
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'foraging',
            name: 'Foraging',
            level: 1,
            icon: '🍄',
            description:
              'Study local edible plants and fungi to improve foraging skills.',
            requirements: ['survival101'],
            effects: [
              'Can find various edible plants and fungi in the wild ol wilderness.',
            ],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 10,
      }
    },
    longTermEffect: 'Improved ability to find food in the wild',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
  },
  {
    id: 'meditation',
    name: 'Practice Meditation',
    scoreIncrease: 12,
    category: 'Skill Development',
    duration: 30,
    description: 'Practice mindfulness and mental focus. Be present.',
    requirements: [],
    icon: '🧘',
    immediateEffect: (gameState: GameState) => {
      const existingSkill = gameState.skills.find(
        (skill) => skill.id === 'meditation',
      )
      let updatedSkills

      if (existingSkill) {
        // Skill exists, increase its level
        updatedSkills = gameState.skills.map((skill) =>
          skill.id === 'meditation'
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
      } else {
        // Skill doesn't exist, add it
        updatedSkills = [
          ...gameState.skills,
          {
            id: 'meditation',
            name: 'Practice Meditation',
            level: 1,
            icon: '🧘',
            description: 'Practice mindfulness and mental focus. Be present.',
            requirements: [],
            effects: [
              'Can find peace in the moment, and attain greater mental focus.',
            ],
            maxLevel: 5,
          },
        ]
      }
      return {
        ...gameState,
        skills: updatedSkills,
        preparednessScore: gameState.preparednessScore + 10,
      }
    },
    longTermEffect:
      'Become a calmer person in the face of danger and stress, with greater mental focus.',
    consequences:
      'Time spent learning could have been used for other preparations',
    isFree: false,
  },
  {
    id: 'stockupFood',
    name: 'Stock Up on Non-Perishable Food',
    category: 'Resource Gathering',
    scoreIncrease: 8,
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
    scoreIncrease: 10,
    immediateEffect: (gameState: GameState) => {
      const updatedSkills = [
        ...gameState.skills,
        {
          id: 'waterPurificationSkill',
          name: 'Water Purification',
          level: 1,
          icon: '💧',
          description: 'Knowledge of water purification techniques',
          requirements: [],
          effects: ['Can make contaminated water safe to drink'],
          maxLevel: 5,
        },
      ]

      return {
        ...gameState,
        skills: updatedSkills,
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
    scoreIncrease: 15,
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
    id: 'inventoryCheck',
    name: 'Inventory Check',
    category: 'Free Actions',
    duration: 0,
    scoreIncrease: 5,
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
    scoreIncrease: 10,
    immediateEffect: (gameState: GameState) => {
      if (gameState.skills.length > 0) {
        const randomSkill =
          gameState.skills[Math.floor(Math.random() * gameState.skills.length)]
        const updatedSkills = gameState.skills.map((skill) =>
          skill.id === randomSkill.id
            ? { ...skill, level: Math.min(skill.level + 1, skill.maxLevel) }
            : skill,
        )
        return {
          ...gameState,
          skills: updatedSkills,
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
  {
    id: 'checkSupplies',
    name: 'Check Supplies',
    category: 'Free Actions',
    duration: 0,
    scoreIncrease: 5,
    description: 'Double-check your inventory for any overlooked items.',
    icon: '🔍',
    isFree: true,
    requirements: [],
    immediateEffect: (gameState: GameState) => {
      // 10% chance to find a random item
      if (Math.random() < 0.1) {
        const newItem = generateRandomItem()
        return {
          ...gameState,
          resources: [...gameState.resources, newItem],
        }
      }
      return gameState
    },
    longTermEffect: 'Might find overlooked items',
    consequences: 'None',
  },
  {
    id: 'organizeGear',
    name: 'Organize Gear',
    category: 'Free Actions',
    scoreIncrease: 5,
    duration: 0,
    description: 'Organize your gear for better efficiency.',
    icon: '🎒',
    isFree: true,
    requirements: [],
    immediateEffect: (gameState: GameState) => {
      return {
        ...gameState,
        preparednessScore: gameState.preparednessScore + 2,
      }
    },
    longTermEffect: 'Slightly increased preparedness',
    consequences: 'None',
  },
  {
    id: 'mentalPrep',
    name: 'Mental Preparation',
    category: 'Free Actions',
    scoreIncrease: 10,
    duration: 0,
    description: 'Take a moment to mentally prepare for challenges ahead.',
    icon: '🧠',
    isFree: true,
    requirements: [],
    immediateEffect: (gameState: GameState) => {
      return {
        ...gameState,
        preparednessScore: gameState.preparednessScore + 1,
      }
    },
    longTermEffect: 'Slight boost to mental readiness',
    consequences: 'None',
  },
]

export { actions }
