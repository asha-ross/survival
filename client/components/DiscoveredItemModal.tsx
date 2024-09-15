import React from 'react'
import { Resource } from '../../models/types'

interface DiscoveredItemModalProps {
  item: Resource
  onKeep: () => void
  onDiscard: () => void
}

const DiscoveredItemModal: React.FC<DiscoveredItemModalProps> = ({
  item,
  onKeep,
  onDiscard,
}) => {
  return (
    <div className="discovered-item-modal">
      <div className="modal-content">
        <h2>Item Discovered!</h2>
        <p>While performing your action, you found:</p>
        <div className="item-details">
          <span className="item-icon">{item.icon}</span>
          <span className="item-name">{item.name}</span>
        </div>
        <p>Would you like to keep this item?</p>
        <div className="modal-actions">
          <button onClick={onKeep}>Keep Item</button>
          <button onClick={onDiscard}>Discard Item</button>
        </div>
      </div>
    </div>
  )
}

export default DiscoveredItemModal
