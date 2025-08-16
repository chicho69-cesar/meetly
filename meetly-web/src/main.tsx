import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import MeetlyApp from './presentation/app.tsx'

const rootItem = document.getElementById('root')!
const root = createRoot(rootItem)

root.render(
  <StrictMode>
    <MeetlyApp />
  </StrictMode>,
)
