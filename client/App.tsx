// App.tsx
import React, { useState } from 'react'
import GameContainer from './components/GameContainer'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/app.css'

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    setGameStarted(true)
  }

  return (
    <ErrorBoundary>
      <div className="App">
        {!gameStarted ? (
          <div className="start-screen">
            <button className="wake-up-button" onClick={startGame}>
              Wake Up
            </button>
          </div>
        ) : (
          <GameContainer justWokeUp={true} />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
