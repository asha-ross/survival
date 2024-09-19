// src/components/ui/ActionSelection.tsx
import React from 'react'
import { GameAction } from '../../types/types'

interface ActionSelectionProps {
  actions: GameAction[]
  onActionSelect: (action: GameAction) => void
  disabled: boolean
}

const ActionSelection: React.FC<ActionSelectionProps> = ({
  actions,
  onActionSelect,
  disabled,
}) => {
  return (
    <div className="action-selection">
      <h3>Available Actions</h3>
      <ul>
        {actions.map((action) => (
          <li key={action.id}>
            <button onClick={() => onActionSelect(action)} disabled={disabled}>
              <span className="action-icon">{action.icon}</span>
              <span className="action-name">{action.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActionSelection
