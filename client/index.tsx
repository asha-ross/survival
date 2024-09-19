// src/index.tsx
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { GameProvider } from './context/GameContext'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </GameProvider>
    </QueryClientProvider>,
  )
})
