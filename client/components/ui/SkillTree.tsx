// src/components/ui/SkillTree.tsx
import React from 'react'
import { Skill } from '../../types/types'
import '../../styles/skilltree.css'

interface SkillTreeProps {
  skills: Skill[]
}
const SkillTree: React.FC<SkillTreeProps> = ({ skills }) => {
  return (
    <div className="skill-tree">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className={`skill-node ${skill.level > 0 ? 'learned' : 'unlearned'}`}
        >
          <div className="skill-icon">{skill.icon}</div>
          <div className="skill-info">
            <div className="skill-name">{skill.name}</div>
            <div className="skill-level">
              Level: {skill.level}/{skill.maxLevel}
            </div>
          </div>
          <div className="skill-description">{skill.description}</div>
          {/* <button
            onClick={() => onUpgrade(skill.id)}
            disabled={skill.level >= skill.maxLevel}
          >
            {skill.level === 0 ? 'Learn' : 'Upgrade'}
          </button> */}
        </div>
      ))}
    </div>
  )
}

export default SkillTree
