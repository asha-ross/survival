import React, { useReducer, useCallback } from 'react'
import { OverallGameState, SurvivalGameState } from '../../models/types'
import PreparationPhase from './PreparationPhase'
import SurvivalPhase from './SurvivalPhase'
import { initialResources } from '../utilities/gameData'
import '../styles/main.css'

type GameAction =
  | { type: 'UPDATE_GAME_STATE'; payload: Partial<OverallGameState> }
  | { type: 'END_PREPARATION_PHASE' }
  | { type: 'SET_SURVIVAL_STATE'; payload: SurvivalGameState | null }

const gameReducer = (
  state: OverallGameState,
  action: GameAction,
): OverallGameState => {
  switch (action.type) {
    case 'UPDATE_GAME_STATE':
      return { ...state, ...action.payload }
    case 'END_PREPARATION_PHASE':
      return {
        ...state,
        phase: 'SURVIVAL',
      }
    case 'SET_SURVIVAL_STATE':
      return {
        ...state,
        ...(action.payload as OverallGameState),
      }
    default:
      return state
  }
}

const initialGameState: OverallGameState = {
  phase: 'PREPARATION',
  timeRemaining: 5 * 60, // 5 minutes in seconds
  resources: initialResources,
  skills: [],
  currentAction: null,
  currentEvent: null,
  preparednessScore: 0,
}

const MainGame: React.FC = () => {
  const [gameState, dispatchRaw] = useReducer(gameReducer, initialGameState)
  const dispatch = useCallback((action: GameAction) => {
    dispatchRaw(action)
  }, [])
  const endPreparationPhase = useCallback(() => {
    dispatch({ type: 'END_PREPARATION_PHASE' })
  }, [dispatch])

  const handleSurvivalStateUpdate = useCallback(
    (newState: React.SetStateAction<SurvivalGameState | null>) => {
      dispatch({
        type: 'SET_SURVIVAL_STATE',
        payload:
          typeof newState === 'function'
            ? newState(gameState as SurvivalGameState)
            : newState,
      })
    },
    [gameState, dispatch],
  )

  return (
    <>
      <h1 className="header">Survival</h1>
      <div className="survival-game">
        {gameState.phase === 'PREPARATION' ? (
          <PreparationPhase
            gameState={gameState}
            dispatch={dispatch}
            endPreparationPhase={endPreparationPhase}
          />
        ) : (
          <SurvivalPhase
            survivalState={gameState as SurvivalGameState}
            setSurvivalState={handleSurvivalStateUpdate}
          />
        )}
      </div>
    </>
  )
}

export default MainGame
