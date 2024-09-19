// src/components/ui/SkillTrainingModal.tsx

import React from 'react'
import { Skill } from '../../types/types'

interface SkillTrainingModalProps {
  availableSkills: Skill[]
  onSelectSkill: (skillId: string) => void
  onCancel: () => void
}

const SkillTrainingModal: React.FC<SkillTrainingModalProps> = ({
  availableSkills,
  onSelectSkill,
  onCancel,
}) => {
  return (
    <div className="skill-training-modal">
      <h2>Train a Skill</h2>
      <p>
        Choose a skill to train. This will take time from your preparation
        phase.
      </p>
      {availableSkills.map((skill) => (
        <button key={skill.id} onClick={() => onSelectSkill(skill.id)}>
          Train {skill.name} (Current Level: {skill.level}/{skill.maxLevel})
        </button>
      ))}
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default SkillTrainingModal
