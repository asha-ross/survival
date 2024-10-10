// src/components/ui/StoryCard.tsx
import React from 'react'
import { StoryStep, Skill, Resource } from '../../types/types'
import '../../styles/storyCard.css'

interface StoryCardProps {
  currentStep: StoryStep
  onChoice: (choice: string) => void
  skills: Skill[]
  resources: Resource[]
}

export const StoryCard: React.FC<StoryCardProps> = ({
  currentStep,
  onChoice,
  skills,
  resources, //Need to fix the resource add within the Story Steps themselves
}) => {
  const getModifiedDescription = (description: string) => {
    const awarenessSkill = skills.find((skill) => skill.id === 'awareness')
    if (awarenessSkill && awarenessSkill.level > 3) {
      return description + ' You notice subtle details others might miss.'
    }
    return description
  }

  if (!currentStep) {
    return <div className="story-card">No more story steps available...</div>
  }

  return (
    <div className="story-card">
      <div className="story-content">
        <p>{getModifiedDescription(currentStep.description)}</p>
      </div>
      <div className="story-choices">
        {currentStep.choices.map((choice, index) => (
          <button key={index} onClick={() => onChoice(choice.id)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default StoryCard
