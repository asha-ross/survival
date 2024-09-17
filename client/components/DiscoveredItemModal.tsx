import React from 'react'
import { Resource } from '../../models/types'

interface DiscoveredItemModalProps {
  item: Resource
  onKeep: () => void
  onDiscard: () => void
  isProcessing: boolean
}

const DiscoveredItemModal: React.FC<DiscoveredItemModalProps> = ({
  item,
  onKeep,
  onDiscard,
  isProcessing,
}) => {
  return (
    <div className="discovered-item-modal">
      <div className="modal-content">
        <h2>Item Discovered!</h2>
        <p>While preparing, you found:</p>
        <div className="item-details">
          <span className="item-icon">{item.icon}</span>
          <span className="item-name">{item.name}</span>
        </div>
        <p>Would you like to keep this item?</p>
        <div className="modal-actions">
          <button onClick={onKeep} disabled={isProcessing}>
            {isProcessing ? 'Processing' : 'Keep Item'}
          </button>
          <button onClick={onDiscard} disabled={isProcessing}>
            {isProcessing ? 'Discard Item' : 'Discard Item'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiscoveredItemModal
