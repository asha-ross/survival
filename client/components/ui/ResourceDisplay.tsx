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
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const locations = useMemo(() => {
    const allLocations = resources.map((r) => r.location)
    return ['All', ...new Set(allLocations)]
  }, [resources])

  const categories = useMemo(() => {
    const allCategories = resources.map((r) => r.category)
    return ['All', ...new Set(allCategories)]
  }, [resources])

  const filteredResources = useMemo(() => {
    return resources.filter(
      (r) =>
        (selectedLocation === 'All' || r.location === selectedLocation) &&
        (selectedCategory === 'All' || r.category === selectedCategory),
    )
  }, [resources, selectedLocation, selectedCategory])

  const renderResourceItem = (resource: Resource) => (
    <div key={resource.id} className="resource-item">
      <div className="resource-icon">{resource.icon}</div>
      <div className="resource-name">{resource.name}</div>
      <div className="resource-quantity">x{resource.quantity}</div>
    </div>
  )

  return (
    <div className="resource-display">
      <div className="resources-header">
        <h3>Inventory</h3>
        <div className="view-controls">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="location-select"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            className={`view-toggle-button ${viewType === 'grid' ? 'active' : ''}`}
            onClick={() => setViewType('grid')}
          >
            Grid
          </button>
          <button
            className={`view-toggle-button ${viewType === 'list' ? 'active' : ''}`}
            onClick={() => setViewType('list')}
          >
            List
          </button>
        </div>
      </div>
      <div className={`resources-content ${viewType}`}>
        {filteredResources.map(renderResourceItem)}
      </div>
    </div>
  )
}

export default ResourceDisplay
