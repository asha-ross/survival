import React, { useState } from 'react'
import { Resource } from '../../models/types'

interface VisualInventoryProps {
  resources: Resource[]
}

const VisualInventory: React.FC<VisualInventoryProps> = ({ resources }) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')

  const groupedResources = resources.reduce(
    (acc, resource) => {
      if (!acc[resource.location]) {
        acc[resource.location] = []
      }
      acc[resource.location].push(resource)
      return acc
    },
    {} as Record<string, Resource[]>,
  )

  const renderGridView = (locationResources: Resource[]) => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {locationResources.map((resource) => (
        <div
          key={resource.id}
          className="rounded-lg bg-white p-4 text-center shadow"
        >
          <div className="mb-2 text-4xl">{resource.icon}</div>
          <div className="text-sm font-semibold">{resource.name}</div>
          <div className="text-sm text-gray-600">x{resource.quantity}</div>
        </div>
      ))}
    </div>
  )

  const renderListView = (locationResources: Resource[]) => (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {locationResources.map((resource) => (
        <div
          key={resource.id}
          className="flex items-center border-b border-gray-200 p-3"
        >
          <div className="mr-4 text-3xl">{resource.icon}</div>
          <div className="flex-grow">
            <div className="font-semibold">{resource.name}</div>
            <div className="text-sm text-gray-600">
              Quantity: {resource.quantity}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="inventory rounded-lg bg-gray-100 p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Inventory</h2>
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

      {Object.entries(groupedResources).map(([location, locationResources]) => (
        <div key={location} className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-700">
            {location}
          </h3>
          {viewType === 'grid'
            ? renderGridView(locationResources)
            : renderListView(locationResources)}
        </div>
      ))}
    </div>
  )
}

export default VisualInventory
