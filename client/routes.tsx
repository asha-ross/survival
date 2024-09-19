// src/routes.tsx
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.tsx'
import GameContainer from './components/GameContainer.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<GameContainer />} />
    {/* Add more routes here if needed */}
  </Route>,
)
