// src/components/ui/StoryCard.tsx
import React from 'react'
import { StoryStep } from '../../types/types'

interface StoryCardProps {
  currentStep: StoryStep
  onChoice: (choice: string) => void
}

export const StoryCard: React.FC<StoryCardProps> = ({
  currentStep,
  onChoice,
}) => {
  if (!currentStep) {
    return <div className="story-card">No more story steps available...</div>
  }
  return (
    <div className="story-card">
      <div className="story-content">
        <p>{currentStep.description}</p>
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
