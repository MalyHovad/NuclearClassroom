import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Browser from './pages/Browser.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Browser />
  </StrictMode>,
)
