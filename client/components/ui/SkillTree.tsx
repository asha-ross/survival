// src/components/ui/SkillTree.tsx
import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'
import { Skill } from '../../types/types'

interface SkillTreeProps {
  skills: Skill[]
}

const SkillTree: React.FC<SkillTreeProps> = ({ skills }) => {
  // const { dispatch } = useContext(GameContext)!
  //I DON'T THINK IT MAKES SENSE TO JUST 'UPGRADE' YOUR SKILL -- THINK ON GAMEPLAY HERE. PRACTICE SKILL? And it drains something else?
  // // const handleSkillUpgrade = (skillId: string) => {
  //   const skill = skills.find((s) => s.id === skillId)
  //   if (skill && skill.level < skill.maxLevel) {
  //     dispatch({
  //       type: 'UPDATE_SKILL',
  //       payload: {
  //         id: skillId,
  //         level: skill.level + 1,
  //       },
  //     })
  //   }
  // }

  return (
    <div className="skill-tree">
      <h3>Skills</h3>
      <div>
        {skills.map((skill) => (
          <div key={skill.id}>
            <div className="skill-info">
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name} </span>
              <span className="skill-level">Level: {skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillTree
