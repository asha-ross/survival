// src/components/ui/EventHandler.tsx
import React from 'react'
import { GameEvent } from '../../types/types'

interface EventHandlerProps {
  event: GameEvent | null | undefined
  onChoice: (choice: string) => void
}

const EventHandler: React.FC<EventHandlerProps> = ({ event, onChoice }) => {
  if (!event) return null

  return (
    <div className="event-handler">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <ul>
        {event.choices.map((choice, index) => (
          <li key={index}>
            <button onClick={() => onChoice(choice.text)}>{choice.text}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventHandler
