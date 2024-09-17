import React, { useCallback, useMemo } from 'react'
import { Skill } from '../../models/types'

interface SkillTreeProps {
  skills: Skill[] | undefined
  unlockedSkills: string[]
  onSkillClick: (skillId: string) => void
}

const SkillTree: React.FC<SkillTreeProps> = React.memo(
  ({ skills = [], unlockedSkills, onSkillClick }) => {
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>, skillId: string) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSkillClick(skillId)
        }
      },
      [onSkillClick],
    )

    const handleClick = useCallback(
      (skillId: string) => {
        onSkillClick(skillId)
      },
      [onSkillClick],
    )

    const skillNodes = useMemo(() => {
      if (!skills || skills.length === 0) {
        return <div>No skills available</div>
      }

      return skills.map((skill) => (
        <div
          key={skill.id}
          className={`skill-node ${unlockedSkills.includes(skill.id) ? 'unlocked' : ''}`}
          onClick={() => handleClick(skill.id)}
          onKeyDown={(e) => handleKeyDown(e, skill.id)}
          role="button"
          tabIndex={0}
          aria-pressed={unlockedSkills.includes(skill.id)}
        >
          <div className="skill-icon">{skill.icon}</div>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-level">Level: {skill.level}</div>
        </div>
      ))
    }, [skills, unlockedSkills, handleClick, handleKeyDown])

    return <div className="skill-tree">{skillNodes}</div>
  },
)

SkillTree.displayName = 'SkillTree'

export default SkillTree
