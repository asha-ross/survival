import React, { useEffect } from 'react'
import { SurvivalGameState } from '../../models/types'
import {
  getRandomDisasterType,
  getRandomLocation,
  generateScenario,
} from '../utilities/survivalHelpers'

interface SurvivalPhaseProps {
  survivalState: SurvivalGameState
  setSurvivalState: React.Dispatch<
    React.SetStateAction<SurvivalGameState | null>
  >
}

const SurvivalPhase: React.FC<SurvivalPhaseProps> = ({
  survivalState,
  setSurvivalState,
}) => {
  useEffect(() => {
    // Initialize survival phase if not already initialized
    if (!survivalState) {
      const initialState: SurvivalGameState = {
        phase: 'SURVIVAL',
        stage: 'InitialDisaster',
        disasterType: getRandomDisasterType(),
        currentLocation: getRandomLocation(),
        day: 1,
        resources: [],
        skills: [],
        currentDisaster: null,
        currentScenario: null,
        preparednessScore: 0,
        timeRemaining: 0,
        currentAction: null,
        currentEvent: null,
      }
      setSurvivalState(initialState)
    } else if (!survivalState.currentScenario) {
      const newScenario = generateScenario(
        survivalState.stage,
        survivalState.disasterType,
        survivalState.currentLocation,
      )
      setSurvivalState((prevState) => ({
        ...prevState!,
        currentScenario: newScenario,
      }))
    }
  }, [survivalState, setSurvivalState])

  const handleChoice = (choiceIndex: number) => {
    if (survivalState.currentScenario) {
      const choice = survivalState.currentScenario.choices[choiceIndex]
      const newSurvivalState = choice.consequence(survivalState)
      setSurvivalState({
        ...newSurvivalState,
        currentScenario: null,
      })
      // Progress to next stage or day based on game logic
    }
  }

  if (
    !survivalState ||
    !survivalState.disasterType ||
    !survivalState.currentLocation
  ) {
    return <div>Loading Survival Phase...</div>
  }

  return (
    <div className="survival-phase">
      <h2>Survival Phase - Day {survivalState.day}</h2>
      <p>Disaster: {survivalState.disasterType}</p>
      <p>Location: {survivalState.currentLocation}</p>
      {survivalState.currentScenario && (
        <div className="scenario">
          <p>{survivalState.currentScenario.description}</p>
          {survivalState.currentScenario.choices.map((choice, index) => (
            <button key={index} onClick={() => handleChoice(index)}>
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SurvivalPhase
