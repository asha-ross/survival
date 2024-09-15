import React from 'react'
import { Skill } from '../../models/types'

interface SkillTreeProps {
  skills: Skill[] | undefined
  unlockedSkills: string[]
  onSkillClick: (skillId: string) => void
}

const SkillTree: React.FC<SkillTreeProps> = ({
  skills = [],
  unlockedSkills,
  onSkillClick,
}) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    skillId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSkillClick(skillId)
    }
  }

  if (!skills || skills.length === 0) {
    return <div>No skills available</div>
  }

  return (
    <div className="skill-tree">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className={`skill-node ${unlockedSkills.includes(skill.id) ? 'unlocked' : ''}`}
          onClick={() => onSkillClick(skill.id)}
          onKeyDown={(e) => handleKeyDown(e, skill.id)}
          role="button"
          tabIndex={0}
          aria-pressed={unlockedSkills.includes(skill.id)}
        >
          <div className="skill-icon">{skill.icon}</div>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-level">Level: {skill.level}</div>
        </div>
      ))}
    </div>
  )
}

export default SkillTree
