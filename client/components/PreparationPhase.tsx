import React, { useCallback, useEffect, useState } from 'react'
import { OverallGameState, Action, Resource } from '../../models/types'
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
  gameState: OverallGameState
  setGameState: React.Dispatch<React.SetStateAction<OverallGameState>>
  endPreparationPhase: () => void
}

const PreparationPhase: React.FC<PreparationPhaseProps> = ({
  gameState,
  setGameState,
  endPreparationPhase,
}) => {
  const [storyStep, setStoryStep] = useState(0)
  const [currentChoice, setCurrentChoice] = useState<string | null>(null)
  const [isProcessingItem, setIsProcessingItem] = useState(false)
  const [itemsDiscovered, setItemsDiscovered] = useState<Resource[]>([])
  const [freeActionUsed, setFreeActionUsed] = useState(false)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>([])
  const freeActions = actions.filter((action) => action.isFree)
  const regularActions = actions.filter((action) => !action.isFree)

  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      resources: [...prevState.resources, ...generateStartingInventory()],
      skills: initialSkills,
    }))
  }, [setGameState])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState.timeRemaining > 0) {
      timer = setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }))
      }, 1000)
    } else {
      endPreparationPhase()
    }
    return () => clearTimeout(timer)
  }, [gameState.timeRemaining, setGameState, endPreparationPhase])

  useEffect(() => {
    if (!gameState.currentAction && !gameState.currentEvent) {
      const randomEventChance = Math.random()
      if (randomEventChance < 0.1) {
        const randomEvent = events[Math.floor(Math.random() * events.length)]
        setGameState((prevState) => ({
          ...prevState,
          currentEvent: randomEvent,
        }))
      }
    }
  }, [gameState.currentAction, gameState.currentEvent, setGameState])

  const handleSkillUnlock = useCallback(
    (skillId: string) => {
      if (!unlockedSkills.includes(skillId)) {
        setUnlockedSkills((prevUnlocked) => [...prevUnlocked, skillId])
        setGameState((prevState) => ({
          ...prevState,
          preparednessScore: prevState.preparednessScore + 5,
        }))
      }
      setStoryStep((prevStep) => prevStep + 1)
    },
    [unlockedSkills, setGameState],
  )

  const handleEventChoice = useCallback(
    (choice: {
      text: string
      effect: (gameState: OverallGameState) => OverallGameState
    }) => {
      const updatedGameState = choice.effect(gameState)
      setGameState(() => ({
        ...updatedGameState,
        currentEvent: null,
      }))
      setStoryStep((prevStep) => prevStep + 1)
    },
    [gameState, setGameState],
  )

  const handleChoice = useCallback((choice: string) => {
    setCurrentChoice(choice)
    const randomResource =
      additionalResources[
        Math.floor(Math.random() * additionalResources.length)
      ]
    setItemsDiscovered([randomResource])
    setStoryStep((prevStep) => prevStep + 1)
  }, [])

  const performFreeAction = useCallback(
    (action: Action) => {
      if (freeActionUsed) {
        alert("You've already used your free action this turn!")
        return
      }
      setGameState((prevState) => {
        const updatedGameState = action.immediateEffect(prevState)
        return {
          ...updatedGameState,
          preparednessScore: updatedGameState.preparednessScore + 1,
        }
      })
      setFreeActionUsed(true)
      setStoryStep((prevStep) => prevStep + 1)
    },
    [freeActionUsed, setGameState],
  )

  const performAction = useCallback(
    (action: Action) => {
      if (action.isFree) {
        performFreeAction(action)
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
          setStoryStep((prevStep) => prevStep + 1)
        }, action.duration * 1000)
      }
      setSelectedAction(null)
    },
    [performFreeAction, setGameState],
  )

  const handleKeepItem = useCallback(() => {
    if (isProcessingItem) return
    setIsProcessingItem(true)
    setItemsDiscovered((prevItems) => {
      if (prevItems.length > 0) {
        const [itemToKeep, ...remainingItems] = prevItems
        setGameState((prevState) => ({
          ...prevState,
          resources: [...prevState.resources, itemToKeep],
          preparednessScore: prevState.preparednessScore + 5,
        }))
        return remainingItems
      }
      return prevItems
    })
    setIsProcessingItem(false)
    setStoryStep((prevStep) => prevStep + 1)
  }, [setGameState, isProcessingItem])

  const handleActionSelect = useCallback((action: Action) => {
    setSelectedAction(action)
  }, [])

  const handleDiscardItem = useCallback(() => {
    if (isProcessingItem) return
    setIsProcessingItem(true)
    setItemsDiscovered([])
    setIsProcessingItem(false)
    setStoryStep((prevStep) => prevStep + 1)
  }, [isProcessingItem])

  const renderStoryStep = () => {
    switch (storyStep) {
      case 0:
        return (
          <div className="story-step">
            <p>
              You wake up on your day off. Your house is a mess, your car needs
              cleaning, and that load of laundry is growing ever larger... but
              the day is beautiful, and you want to have fun. You:
            </p>
            <button onClick={() => handleChoice('clean')}>
              Clean your house.
            </button>
            <button onClick={() => handleChoice('car')}>Wash your car.</button>
            <button onClick={() => handleChoice('outside')}>
              Go walk around outside.
            </button>
          </div>
        )
      case 1:
        return (
          <div className="story-step">
            <p>
              While{' '}
              {currentChoice === 'clean'
                ? 'cleaning your house'
                : currentChoice === 'car'
                  ? 'washing your car'
                  : 'walking around outside'}
              , you find something interesting.
            </p>
            {itemsDiscovered.length > 0 && (
              <DiscoveredItemModal
                item={itemsDiscovered[0]}
                onKeep={handleKeepItem}
                onDiscard={handleDiscardItem}
                isProcessing={isProcessingItem}
              />
            )}
          </div>
        )
      case 2:
        return (
          <div className="story-step">
            <p>
              You decide to spend the day learning something new. What would you
              like to focus on?
            </p>
            <SkillTree
              skills={gameState.skills}
              unlockedSkills={unlockedSkills}
              onSkillClick={handleSkillUnlock}
            />
          </div>
        )

      case 3:
        return (
          <div className="story-step">
            <p>
              Working on your skills has cleared your mind! You want to get
              something else done. What would you like to do?
            </p>
            <div className="free-actions">
              {freeActions.map((action) => (
                <button
                  key={action.id}
                  className="free-action-items"
                  onClick={() => performFreeAction(action)}
                  disabled={freeActionUsed}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-name">{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="story-step">
            <p>You still have some energy left. What would you like to do?</p>
            <div className="regular-actions">
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
                    >
                      <span className="action-icon">{action.icon}</span>
                      <span className="action-name">{action.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div className="story-step">
            <p>
              As evening approaches, you start to notice some unusual things
              happening around you...
            </p>
            <button onClick={endPreparationPhase}>What Happens Next?</button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="preparation-phase">
      <h2 className="phase-title">A Day in the Life</h2>
      <div className="game-info">
        <div className="preparedness-score">
          Preparedness Score: {gameState.preparednessScore}
        </div>
      </div>

      <div className="main-content">
        {renderStoryStep()}
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

      <div className="resources-and-skills">
        <div className="resources-section">
          <h3>Inventory:</h3>
          <IntegratedResourceDisplay resources={gameState.resources} />
        </div>
      </div>
    </div>
  )
}

export default PreparationPhase
