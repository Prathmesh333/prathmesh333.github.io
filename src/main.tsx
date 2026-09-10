import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './StudioOS'
import './styles.css'
import './theme-light.css'
import './studio-os.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
