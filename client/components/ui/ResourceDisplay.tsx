// src/components/ui/ResourceDisplay.tsx
import React, { useState, useMemo } from 'react'
import { Resource } from '../../types/types'
import '../../styles/ResourceDisplay.css'

interface ResourceDisplayProps {
  resources: Resource[]
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources }) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')
  const [selectedLocation, setSelectedLocation] = useState<string | 'All'>(
    'All',
  )

  const locations = useMemo(
    () => ['All', ...new Set(resources.map((r) => r.location))],
    [resources],
  )

  const filteredResources = useMemo(
    () =>
      selectedLocation === 'All'
        ? resources
        : resources.filter((r) => r.location === selectedLocation),
    [resources, selectedLocation],
  )

  const renderResourceItem = (resource: Resource, index: number) => (
    <div key={`${resource.id}-${index}`} className="resource-item">
      <div className="resource-icon">{resource.icon}</div>
      <div className="resource-name">{resource.name}</div>
      <div className="resource-quantity">x{resource.quantity}</div>
    </div>
  )

  const renderGridView = () => (
    <div className="resource-grid">
      {filteredResources.map(renderResourceItem)}
    </div>
  )

  const renderListView = () => (
    <div className="resource-list">
      {filteredResources.map(renderResourceItem)}
    </div>
  )

  return (
    <div className="resource-display">
      <div className="resources">
        <h3>Resources</h3>
        <div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="mr-2 rounded border p-1"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <button
            className={`view-toggle-button ${viewType === 'grid' ? 'active' : 'inactive'}`}
            onClick={() => setViewType('grid')}
          >
            Grid
          </button>
          <button
            className={`view-toggle-button ${viewType === 'list' ? 'active' : 'inactive'}`}
            onClick={() => setViewType('list')}
          >
            List
          </button>
        </div>
      </div>
      {viewType === 'grid' ? renderGridView() : renderListView()}
    </div>
  )
}

export default ResourceDisplay
