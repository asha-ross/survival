import React from 'react'
import { Resource } from '../../models/types'

interface VisualInventoryProps {
  resources: Resource[]
}

const VisualInventory: React.FC<VisualInventoryProps> = ({ resources }) => {
  return (
    <div className="visual-inventory">
      {resources.map((resource, index) => (
        <div key={`resource.id}-${index}`} className="inventory-item">
          <div className="item-icon">{resource.icon}</div>
          <div className="item-details">
            <div className="item-name">{resource.name}</div>
            <div className="item-quantity">x{resource.quantity}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VisualInventory
