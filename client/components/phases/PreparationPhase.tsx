// src/components/phases/PreparationPhase.tsx
import React, { useState, useContext, useEffect } from 'react'
import { GameContext } from '../../context/GameContext'
import { usePreparationPhase } from '../../hooks/usePreparationPhase'
import { StatusBar } from '../ui/StatusBar'
import ResourceDisplay from '../ui/ResourceDisplay'
import SkillTree from '../ui/SkillTree'
import ActionSelection from '../ui/ActionSelection'
import { StoryCard } from '../ui/StoryCard'
import SkillTrainingModal from '../ui/SkillTrainingModal'
import { storySteps } from '../../data/storyData'
import { actions } from '../../data/actionData'
import { GameAction, Skill, Resource } from '../../types/types'

const PreparationPhase: React.FC = () => {
  const { gameState, dispatch } = useContext(GameContext)!
  const {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    makeChoice,
    performAction,
    triggerDisaster,
  } = usePreparationPhase()

  const [isTrainingSkills, setIsTrainingSkills] = useState(false)

  useEffect(() => {
    if (isRunning) {
      const disasterTime = Math.floor(Math.random() * (420 - 180 + 1)) + 180 // Random time between 3-7 minutes
      const disasterTimer = setTimeout(triggerDisaster, disasterTime * 1000)
      return () => clearTimeout(disasterTimer)
    }
  }, [isRunning, triggerDisaster])

  const handleStoryChoice = (choiceId: string) => {
    const currentStep = storySteps[gameState.storyStep]
    const choice = currentStep.choices.find((c) => c.id === choiceId)

    if (choice) {
      if (choiceId === 'train_skills') {
        setIsTrainingSkills(true)
      } else {
        makeChoice(choiceId)

        if (choice.effects) {
          if (choice.effects.resources) {
            choice.effects.resources.forEach(
              (resourceEffect: Partial<Resource>) => {
                if (resourceEffect.id) {
                  const existingResource = gameState.resources.find(
                    (r) => r.id === resourceEffect.id,
                  )
                  if (existingResource) {
                    dispatch({
                      type: 'UPDATE_RESOURCE',
                      payload: {
                        id: resourceEffect.id,
                        quantity:
                          existingResource.quantity +
                          (resourceEffect.quantity || 0),
                      },
                    })
                  } else if (
                    resourceEffect.name &&
                    resourceEffect.category &&
                    resourceEffect.location &&
                    resourceEffect.icon
                  ) {
                    dispatch({
                      type: 'ADD_RESOURCE',
                      payload: {
                        ...resourceEffect,
                        quantity: resourceEffect.quantity || 1,
                      } as Resource,
                    })
                  }
                }
              },
            )
          }

          if (choice.effects.skills) {
            choice.effects.skills.forEach((skillEffect: Partial<Skill>) => {
              if (skillEffect.id) {
                const existingSkill = gameState.skills.find(
                  (s) => s.id === skillEffect.id,
                )
                if (existingSkill) {
                  dispatch({
                    type: 'UPDATE_SKILL',
                    payload: {
                      id: skillEffect.id,
                      level: existingSkill.level + (skillEffect.level || 1),
                    },
                  })
                } else if (
                  skillEffect.name &&
                  skillEffect.icon &&
                  skillEffect.description
                ) {
                  dispatch({
                    type: 'ADD_SKILL',
                    payload: {
                      ...skillEffect,
                      level: skillEffect.level || 1,
                      requirements: skillEffect.requirements || [],
                      effects: skillEffect.effects || [],
                      maxLevel: skillEffect.maxLevel || 5,
                    } as Skill,
                  })
                }
              }
            })
          }
        }

        if (gameState.storyStep < storySteps.length - 1) {
          dispatch({ type: 'NEXT_STORY_STEP' })
        } else {
          dispatch({ type: 'END_PREPARATION_PHASE' })
        }
      }
    }
  }

  const handleSkillTraining = (skillId: string) => {
    const skillToTrain = gameState.skills.find((s) => s.id === skillId)
    if (skillToTrain && skillToTrain.level < skillToTrain.maxLevel) {
      dispatch({
        type: 'UPDATE_SKILL',
        payload: { id: skillId, level: skillToTrain.level + 1 },
      })

      // Reduce preparation time (e.g., by 30 seconds)
      dispatch({
        type: 'UPDATE_TIME',
        payload: Math.max(0, timeRemaining - 30),
      })

      // Optionally, increase preparedness score
      dispatch({
        type: 'UPDATE_PREPAREDNESS_SCORE',
        payload: gameState.preparednessScore + 5,
      })
    }
    setIsTrainingSkills(false)
  }

  const handleActionSelect = (action: GameAction) => {
    performAction(action)
  }

  const getAvailableSkills = (): Skill[] => {
    return gameState.skills.filter((skill) => skill.level < skill.maxLevel)
  }

  return (
    <div className="preparation-phase">
      <StatusBar
        timeRemaining={timeRemaining}
        score={gameState.preparednessScore}
      />
      <div className="main-content">
        {!isTrainingSkills ? (
          <StoryCard
            currentStep={storySteps[gameState.storyStep]}
            onChoice={handleStoryChoice}
          />
        ) : (
          <SkillTrainingModal
            availableSkills={getAvailableSkills()}
            onSelectSkill={handleSkillTraining}
            onCancel={() => setIsTrainingSkills(false)}
          />
        )}
        <ResourceDisplay resources={gameState.resources} />
        <SkillTree skills={gameState.skills} />
        <ActionSelection
          actions={actions}
          onActionSelect={handleActionSelect}
          disabled={!isRunning || !!gameState.currentAction}
        />
      </div>
      {!isRunning && (
        <button onClick={startTimer}>Start Preparation Phase</button>
      )}
      {isRunning && (
        <button onClick={stopTimer}>Pause Preparation Phase</button>
      )}
    </div>
  )
}

export default PreparationPhase
