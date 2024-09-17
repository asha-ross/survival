import React, { useState } from 'react'
import { Resource } from '../../models/types'

interface IntegratedResourceDisplayProps {
  resources: Resource[]
}

const IntegratedResourceDisplay: React.FC<IntegratedResourceDisplayProps> = ({
  resources,
}) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')
  const locations = [
    'House',
    'Car',
    'Workplace',
    'On Person',
    'Kitchen',
    'Garage',
  ]

  const renderGridView = (locationResources: Resource[]) => (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {locationResources.map((resource, index) => (
        <div
          key={`${resource.id}-${index}`}
          className="resource-item rounded bg-white p-2 text-center shadow"
        >
          <div className="resource-icon text-2xl">{resource.icon}</div>
          <div className="resource-name text-sm font-semibold">
            {resource.name}
          </div>
          <div className="resource-quantity text-xs text-gray-600">
            x{resource.quantity}
          </div>
        </div>
      ))}
    </div>
  )

  const renderListView = (locationResources: Resource[]) => (
    <div className="resource-list">
      {locationResources.map((resource, index) => (
        <div
          key={`${resource.id}-${index}`}
          className="resource-item mb-1 flex items-center rounded bg-white p-2 shadow"
        >
          <span className="resource-icon mr-2 text-2xl">{resource.icon}</span>
          <span className="resource-name flex-grow">{resource.name}</span>
          <span className="resource-quantity text-sm text-gray-600">
            x{resource.quantity}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="integrated-resource-display rounded-lg bg-gray-100 p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">Resources</h3>
        <div>
          <button
            className={`mr-2 rounded px-3 py-1 ${viewType === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setViewType('grid')}
          >
            Grid
          </button>
          <button
            className={`rounded px-3 py-1 ${viewType === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setViewType('list')}
          >
            List
          </button>
        </div>
      </div>
      {locations.map((location) => {
        const locationResources = resources.filter(
          (resource) => resource.location === location,
        )
        if (locationResources.length === 0) return null
        return (
          <div key={location} className="location-section mb-4">
            <h4 className="mb-2 text-lg font-semibold text-gray-700">
              {location}
            </h4>
            {viewType === 'grid'
              ? renderGridView(locationResources)
              : renderListView(locationResources)}
          </div>
        )
      })}
    </div>
  )
}

export default IntegratedResourceDisplay
