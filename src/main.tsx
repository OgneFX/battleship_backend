import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './components/Game/Game'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1> Морской Бой </h1>
     <Game/>
  </StrictMode>,
)
