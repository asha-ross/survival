import React from 'react'
import { Resource } from '../../models/types'

interface IntegratedResourceDisplayProps {
  resources: Resource[]
}

const IntegratedResourceDisplay: React.FC<IntegratedResourceDisplayProps> = ({
  resources,
}) => {
  const locations = ['House', 'Car', 'Workplace', 'On Person']

  return (
    <div className="integrated-resource-display">
      {locations.map((location) => (
        <div key={location} className="location-section">
          <h4>{location}</h4>
          <div className="resource-list">
            {resources
              .filter((resource) => resource.location === location)
              .map((resource, index) => (
                <div key={`${resource.id}-${index}`} className="resource-item">
                  <span className="resource-icon">{resource.icon}</span>
                  <span className="resource-name">{resource.name}</span>
                  <span className="resource-quantity">
                    x{resource.quantity}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default IntegratedResourceDisplay
