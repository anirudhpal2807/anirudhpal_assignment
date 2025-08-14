import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.studentmanager'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)