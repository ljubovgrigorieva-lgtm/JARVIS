import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { initTelegram } from './lib/telegram.ts'
import './styles/telegram.css'

initTelegram()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
