import React, { useEffect } from 'react'
import {
  OverallGameState,
  SurvivalScenario as DisasterScenario,
  Choice,
} from '../../types/types'
import { startDisaster } from '../utilities/survivalData'

interface DisasterPhaseProps {
  gameState: OverallGameState<DisasterScenario>
  setGameState: React.Dispatch<
    React.SetStateAction<OverallGameState<DisasterScenario>>
  >
  endDisasterPhase: () => void
}

const DisasterPhase: React.FC<DisasterPhaseProps> = ({
  gameState,
  setGameState,
  endDisasterPhase,
}) => {
  useEffect(() => {
    if (!gameState.survivalPhase?.currentDisaster) {
      setGameState(startDisaster(gameState))
    }
  }, [gameState, setGameState])

  const handleChoice = (choice: Choice) => {
    if (gameState.survivalPhase) {
      const newSurvivalState = choice.consequence(gameState.survivalPhase)
      const currentDisaster = gameState.survivalPhase.currentDisaster
      const currentScenario = gameState.survivalPhase.currentScenario

      if (currentDisaster && currentScenario) {
        const currentIndex =
          currentDisaster.initialScenarios.indexOf(currentScenario)
        let updatedSurvivalState = newSurvivalState

        if (currentIndex < currentDisaster.initialScenarios.length - 1) {
          updatedSurvivalState = {
            ...newSurvivalState,
            currentScenario: currentDisaster.initialScenarios[currentIndex + 1],
          }
        } else {
          updatedSurvivalState =
            currentDisaster.ongoingEffects(newSurvivalState)
          setTimeout(endDisasterPhase, 0)
        }

        setGameState((prevState) => ({
          ...prevState,
          survivalPhase: updatedSurvivalState,
        }))
      }
    }
  }

  const isChoiceAvailable = (choice: Choice): boolean => {
    const hasRequiredSkills = choice.requiredSkills
      ? choice.requiredSkills.every((skillId) =>
          gameState.skills.some((skill) => skill.id === skillId),
        )
      : true

    const hasRequiredResources = choice.requiredResources
      ? choice.requiredResources.every((resourceId) =>
          gameState.resources.some((resource) => resource.id === resourceId),
        )
      : true

    return hasRequiredSkills && hasRequiredResources
  }

  if (
    !gameState.survivalPhase?.currentDisaster ||
    !gameState.survivalPhase?.currentScenario
  ) {
    return <div>Loading...</div>
  }

  const { currentDisaster, currentScenario } = gameState.survivalPhase

  return (
    <div className="disaster-phase">
      <h2>{currentDisaster.name}</h2>
      <p>{currentDisaster.description}</p>
      <div className="scenario">
        <p>{currentScenario.description}</p>
        <div className="choices">
          {currentScenario.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              disabled={!isChoiceAvailable(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisasterPhase
