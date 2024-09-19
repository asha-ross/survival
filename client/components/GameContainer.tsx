// src/components/GameContainer.tsx
import React, { useContext, useEffect } from 'react'
import { GameContext } from '../context/GameContext'
import { usePreparationPhase } from '../hooks/usePreparationPhase'
import { StatusBar } from './ui/StatusBar'
import ResourceDisplay from './ui/ResourceDisplay'
import SkillTree from './ui/SkillTree'
// import ActionSelection from './ui/ActionSelection'
import EventHandler from './ui/EventHandler'
// import { actions } from '../data/actionData'
import { storySteps } from '../data/storyData'
import { Resource, Skill } from '../types/types'
import { StoryCard } from './ui/StoryCard'

const GameContainer: React.FC = () => {
  const { gameState, dispatch } = useContext(GameContext)!
  const {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    // makeChoice,
    // performAction,
    triggerDisaster,
  } = usePreparationPhase()

  useEffect(() => {
    // Update the game state with the current time remaining
    dispatch({ type: 'UPDATE_TIME', payload: timeRemaining })
  }, [timeRemaining, dispatch])

  useEffect(() => {
    if (isRunning) {
      const disasterTime = Math.floor(Math.random() * (420 - 180 + 1)) + 180 // Random time between 3-7 minutes
      const disasterTimer = setTimeout(triggerDisaster, disasterTime * 1000)
      return () => clearTimeout(disasterTimer)
    }
  }, [isRunning, triggerDisaster])

  // const handleActionSelect = (action: GameAction) => {
  //   performAction(action)
  // }

  const handleStoryChoice = (choiceId: string) => {
    const currentStep = storySteps[gameState.storyStep]
    const choice = currentStep.choices.find((c) => c.id === choiceId)

    if (choice && choice.effects) {
      if (choice.effects.resources) {
        choice.effects.resources.forEach((resourceEffect) => {
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
                    existingResource.quantity + (resourceEffect.quantity || 0),
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
        })
      }
      if (choice.effects.skills) {
        choice.effects.skills.forEach((skillEffect) => {
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

  const handleStartPreparationPhase = () => {
    startTimer()
    dispatch({ type: 'START_PREPARATION_PHASE' })
  }

  const renderPhaseContent = () => {
    switch (gameState.phase) {
      case 'PREPARATION':
        return (
          <>
            <StoryCard
              currentStep={storySteps[gameState.storyStep]}
              onChoice={handleStoryChoice}
            />
            <ResourceDisplay resources={gameState.resources} />
            <SkillTree skills={gameState.skills} />
            {/* <ActionSelection
              actions={actions}
              onActionSelect={handleActionSelect}
              disabled={!isRunning || !!gameState.currentAction}
            /> */}
          </>
        )
      case 'DISASTER':
        // Render disaster phase content
        return <div>Disaster Phase Content</div>
      case 'SURVIVAL':
        // Render survival phase content
        return <div>Survival Phase Content</div>
      default:
        return null
    }
  }

  return (
    <div className="game-container">
      <StatusBar
        timeRemaining={timeRemaining}
        score={gameState.preparednessScore}
      />
      <div className="main-content">
        {renderPhaseContent()}
        {gameState.currentEvent && (
          <EventHandler
            event={gameState.currentEvent}
            onChoice={handleStoryChoice}
          />
        )}
      </div>

      <div className="game-controls">
        {gameState.phase === 'PREPARATION' && !isRunning && (
          <button onClick={handleStartPreparationPhase}>
            Start Preparation Phase
          </button>
        )}
        {isRunning && (
          <button onClick={stopTimer}>Pause Preparation Phase</button>
        )}
        <button onClick={() => resetTimer(300)}>Reset Timer (5 minutes)</button>
      </div>
    </div>
  )
}

export default GameContainer
