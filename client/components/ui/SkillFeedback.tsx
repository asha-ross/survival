// src/components/ui/SkillFeedback.tsx
import React, { useState, useEffect } from 'react'
import '../../styles/SkillFeedback.css'

interface SkillFeedbackProps {
  skillName: string
  newLevel: number
}

const SkillFeedback: React.FC<SkillFeedbackProps> = ({
  skillName,
  newLevel,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="skill-feedback">
      Your <span className="skill-name">{skillName}</span> skill has improved to
      level <span className="skill-level">{newLevel}</span>!
    </div>
  )
}

export default SkillFeedback
