// src/components/phases/PreparationPhase.tsx
import React, { useState, useContext, useEffect } from 'react'
import { GameContext } from '../../context/GameContext'
import { usePreparationPhase } from '../../hooks/usePreparationPhase'
import ResourceDisplay from '../ui/ResourceDisplay'
import SkillTree from '../ui/SkillTree'
import ActionSelection from '../ui/ActionSelection'
import { StoryCard } from '../ui/StoryCard'
import SkillTrainingModal from '../ui/SkillTrainingModal'
import { storySteps } from '../../data/storyData'
import { actions } from '../../data/actionData'
import { GameAction, Skill, Resource } from '../../types/types'
import { checkRequirements } from '../../utilities/gameLogic'
import SkillFeedback from '../ui/SkillFeedback'

const PreparationPhase: React.FC = () => {
  const { gameState, dispatch } = useContext(GameContext)!
  const {
    timeRemaining,
    isRunning,
    stopTimer,
    makeChoice,
    performAction,
    triggerDisaster,
  } = usePreparationPhase()

  const [isTrainingSkills, setIsTrainingSkills] = useState(false)
  const [availableActions, setAvailableActions] = useState<GameAction[]>([])

  const [skillFeedback, setSkillFeedback] = useState<{
    skillName: string
    newLevel: number
  } | null>(null)

  useEffect(() => {
    const filteredActions = actions.filter((action) => {
      // Check if the action is free or if the player has enough time
      const hasEnoughTime =
        action.isFree || gameState.timeRemaining >= action.duration

      // Check if the player meets the skill requirements
      const meetsSkillRequirements = checkRequirements(
        action.requirements,
        gameState.skills,
      )

      // Check if the player has the necessary resources
      const hasRequiredResources = action.requirements.every((req) => {
        const resource = gameState.resources.find((r) => r.id === req)
        return resource && resource.quantity > 0
      })

      // Check if the action is appropriate for the current location
      const isAppropriateForLocation =
        action.category === 'Free Actions' ||
        action.category === gameState.currentLocation

      // Check if the action hasn't reached its maximum level (for skill-based actions)
      const canLevelUp =
        !action.maxLevel ||
        (gameState.skills.find((s) => s.id === action.id)?.level || 0) <
          action.maxLevel

      return (
        hasEnoughTime &&
        meetsSkillRequirements &&
        hasRequiredResources &&
        isAppropriateForLocation &&
        canLevelUp
      )
    })

    setAvailableActions(filteredActions)
  }, [gameState])

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
            choice.effects.skills.forEach((skillEffect) => {
              if (skillEffect.id) {
                const existingSkill = gameState.skills.find(
                  (s) => s.id === skillEffect.id,
                )
                if (existingSkill) {
                  const newLevel =
                    existingSkill.level + (skillEffect.level || 1)
                  dispatch({
                    type: 'UPDATE_SKILL',
                    payload: {
                      id: skillEffect.id,
                      level: newLevel,
                    },
                  })
                  setSkillFeedback({ skillName: existingSkill.name, newLevel })
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
                  setSkillFeedback({
                    skillName: skillEffect.name,
                    newLevel: skillEffect.level || 1,
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
    dispatch({ type: 'SET_CURRENT_ACTION', payload: action })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CURRENT_ACTION' })
    }, action.duration * 1000)
  }

  const getAvailableSkills = (): Skill[] => {
    return gameState.skills.filter((skill) => skill.level < skill.maxLevel)
  }

  return (
    <div className="preparation-phase">
      <header className="game-header">
        <h1>Survival</h1>
      </header>
      <div className="game-content">
        <div className="left-panel">
          <ResourceDisplay resources={gameState.resources} />
          <SkillTree skills={gameState.skills} />
          {skillFeedback && (
            <SkillFeedback
              skillName={skillFeedback.skillName}
              newLevel={skillFeedback.newLevel}
            />
          )}
        </div>
        <div className="center-panel">
          {!isTrainingSkills ? (
            <StoryCard
              currentStep={storySteps[gameState.storyStep]}
              onChoice={handleStoryChoice}
              skills={gameState.skills}
            />
          ) : (
            <SkillTrainingModal
              availableSkills={getAvailableSkills()}
              onSelectSkill={handleSkillTraining}
              onCancel={() => setIsTrainingSkills(false)}
            />
          )}
        </div>
        <div className="right-panel">
          <ActionSelection
            actions={availableActions}
            onActionSelect={handleActionSelect}
            disabled={!isRunning || !!gameState.currentAction}
          />
        </div>
      </div>
      <footer className="game-footer">
        {isRunning && (
          <button onClick={stopTimer}>Pause Preparation Phase</button>
        )}
      </footer>
    </div>
  )
}

export default PreparationPhase
