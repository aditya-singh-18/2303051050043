import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Set global process object for logging-middleware browser consumption
// using Vite's compile-time environment variables
window.process = {
  env: {
    AFFORDMED_TOKEN: import.meta.env.VITE_AFFORDMED_TOKEN,
    AFFORDMED_LOG_URL: import.meta.env.VITE_AFFORDMED_LOG_URL
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
