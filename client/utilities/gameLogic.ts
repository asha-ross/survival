import { Skill } from '../types/types'

export const checkRequirements = (
  requirements: string[],
  playerSkills: Skill[],
): boolean => {
  return requirements.every((req) => {
    const [skillId, requiredLevel] = req.split(':')
    const skill = playerSkills.find((s) => s.id === skillId)
    return skill && skill.level >= parseInt(requiredLevel || '1', 10)
  })
}
