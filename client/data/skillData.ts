import { Skill } from '../types/types'
export const initialSkills: Skill[] = [
  {
    id: 'survival',
    name: 'Survival',
    level: 1,
    icon: '🏕️',
    description: 'Basic survival skills',
    requirements: [],
    effects: [],
    maxLevel: 5,
  },
  {
    id: 'firstAid',
    name: 'First Aid',
    level: 1,
    icon: '🩹',
    description: 'Basic medical skills',
    requirements: [],
    effects: [],
    maxLevel: 5,
  },
  // Add more initial skills
]
