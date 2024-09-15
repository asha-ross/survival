// PreparationPhase.tsx

import React, { useEffect, useState } from 'react'
import { GameState, Action, Resource } from '../../models/types'
import {
  actions,
  additionalResources,
  events,
  generateStartingInventory,
  initialSkills,
} from '../utilities/gameData'
import SkillTree from './SkillTree'
import DiscoveredItemModal from './DiscoveredItemModal'
import IntegratedResourceDisplay from './ResourceDisplay'

interface PreparationPhaseProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  endPreparationPhase: () => void
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const PreparationPhase: React.FC<PreparationPhaseProps> = ({
  gameState,
  setGameState,
  endPreparationPhase,
}) => {
  const [discoveredItem, setDiscoveredItem] = useState<Resource | null>(null)
  const [freeActionUsed, setFreeActionUsed] = useState(false)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>([])
  const freeActions = actions.filter((action) => action.isFree)
  const regularActions = actions.filter((action) => !action.isFree)

  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      resources: [...prevState.resources, ...generateStartingInventory()],
    }))
  }, [setGameState])

  useEffect(() => {
    if (gameState.timeRemaining > 0) {
      const timer = setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }))
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      endPreparationPhase()
    }
  }, [gameState.timeRemaining, setGameState, endPreparationPhase])

  useEffect(() => {
    if (!gameState.currentAction && !gameState.currentEvent) {
      const randomEventChance = Math.random()
      if (randomEventChance < 0.1) {
        // 10% chance of event occurring
        const randomEvent = events[Math.floor(Math.random() * events.length)]
        setGameState((prevState) => ({
          ...prevState,
          currentEvent: randomEvent,
        }))
      }
    }
  }, [gameState.currentAction, gameState.currentEvent, setGameState])

  useEffect(() => {
    if (!gameState.skills || gameState.skills.length === 0) {
      setGameState((prevState) => ({
        ...prevState,
        skills: initialSkills,
      }))
    }
  }, [gameState.skills, setGameState])

  const handleSkillUnlock = (skillId: string) => {
    if (!unlockedSkills.includes(skillId)) {
      setUnlockedSkills((prevUnlocked) => [...prevUnlocked, skillId])
      setGameState((prevState) => ({
        ...prevState,
        preparednessScore: prevState.preparednessScore + 5,
      }))
    }
  }

  const handleEventChoice = (choice: {
    text: string
    effect: (gameState: GameState) => GameState
  }) => {
    const updatedGameState = choice.effect(gameState)
    setGameState({
      ...updatedGameState,
      currentEvent: null,
    })
  }

  const handleActionSelect = (action: Action) => {
    setSelectedAction(action)
  }

  const performAction = (action: Action) => {
    if (action.isFree) {
      if (freeActionUsed) {
        alert("You've already used your free action this turn!")
        return
      }
      const updatedGameState = action.immediateEffect(gameState)
      setGameState(updatedGameState)
      setFreeActionUsed(true)
    } else {
      setGameState((prevState) => ({
        ...prevState,
        currentAction: action,
        timeRemaining: prevState.timeRemaining - action.duration,
      }))

      setTimeout(() => {
        setGameState((prevState) => {
          const updatedGameState = action.immediateEffect(prevState)
          return {
            ...updatedGameState,
            currentAction: null,
          }
        })
        setFreeActionUsed(false)
      }, action.duration * 1000)
    }
    setSelectedAction(null)
  }

  const performFreeAction = (action: Action) => {
    const updatedGameState = action.immediateEffect(gameState)
    setGameState({
      ...updatedGameState,
      preparednessScore: updatedGameState.preparednessScore + 1,
    })
    if (Math.random() < 0.2) {
      // 30% chance to discover an item
      const randomItem =
        additionalResources[
          Math.floor(Math.random() * additionalResources.length)
        ]
      setDiscoveredItem(randomItem)
    }
  }

  const handleKeepItem = () => {
    if (discoveredItem) {
      setGameState((prevState) => ({
        ...prevState,
        resources: [...prevState.resources, discoveredItem],
      }))
    }
    setDiscoveredItem(null)
  }

  const handleDiscardItem = () => {
    setDiscoveredItem(null)
  }

  const handleActionKeyPress = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    action: Action,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleActionSelect(action)
    }
  }

  const handleFreeActionKeyPress = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    action: Action,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      performFreeAction(action)
    }
  }

  return (
    <div className="preparation-phase">
      <h2 className="phase-title">PREPARATION Phase</h2>
      <div className="game-info">
        <div className="timer">
          Time Remaining: {formatTime(gameState.timeRemaining)}
        </div>
        <div className="preparedness-score">
          Preparedness Score: {gameState.preparednessScore}
        </div>
      </div>

      <div className="main-content">
        <div className="action-list">
          <div className="free-actions">
            <h3 className="category-title">Free Actions</h3>
            {freeActions.map((action) => (
              <button
                key={action.id}
                className="free-action-items"
                onClick={() => performFreeAction(action)}
                onKeyDown={(e) => handleFreeActionKeyPress(e, action)}
                tabIndex={0}
                aria-pressed="false"
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-name">{action.name}</span>
              </button>
            ))}
          </div>
          <div className="regular-actions">
            <h3 className="category-title">Actions</h3>
            {!gameState.currentAction && !gameState.currentEvent && (
              <>
                {Object.entries(
                  Object.groupBy(regularActions, (action) => action.category),
                ).map(([category, categoryActions]) => (
                  <div key={category} className="action-category">
                    <h4 className="category-title">{category}</h4>
                    {(categoryActions as Action[]).map((action) => (
                      <button
                        key={action.id}
                        className={`action-item ${selectedAction?.id === action.id ? 'selected' : ''}`}
                        onClick={() => handleActionSelect(action)}
                        onKeyPress={(e) => handleActionKeyPress(e, action)}
                        tabIndex={0}
                        aria-pressed={selectedAction?.id === action.id}
                      >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-name">{action.name}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="action-details">
          {selectedAction && (
            <div>
              <h3 className="selected-action-title">{selectedAction.name}</h3>
              <p className="action-description">{selectedAction.description}</p>
              <p className="action-effect">
                Effect: {selectedAction.longTermEffect}
              </p>
              {selectedAction.consequences && (
                <p className="action-consequence">
                  Consequence: {selectedAction.consequences}
                </p>
              )}
              <button
                onClick={() => performAction(selectedAction)}
                disabled={selectedAction.requirements.some(
                  (req) =>
                    !gameState.resources.find((r) => r.id === req) ||
                    (selectedAction.isFree && freeActionUsed),
                )}
                className="perform-action-button"
              >
                {selectedAction.isFree ? 'Do Now (Free)' : 'Act Now'}
              </button>
            </div>
          )}

          {gameState.currentAction && (
            <div className="current-action">
              <h3>Current Action:</h3>
              <p>{gameState.currentAction.name}</p>
            </div>
          )}

          {gameState.currentEvent && (
            <div className="event">
              <h3>{gameState.currentEvent.name}</h3>
              <p>{gameState.currentEvent.description}</p>
              {gameState.currentEvent.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleEventChoice(choice)}
                  className="event-choice-button"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {discoveredItem && (
        <DiscoveredItemModal
          item={discoveredItem}
          onKeep={handleKeepItem}
          onDiscard={handleDiscardItem}
        />
      )}
      <div className="resources-and-skills">
        <div className="resources-section">
          <h3>Resources:</h3>
          <IntegratedResourceDisplay resources={gameState.resources} />
        </div>

        <div className="skill-tree-section">
          <h3>Skills</h3>
          <SkillTree
            skills={gameState.skills}
            unlockedSkills={unlockedSkills}
            onSkillClick={handleSkillUnlock}
          />
        </div>
      </div>
    </div>
  )
}

export default PreparationPhase
