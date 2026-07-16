import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

const root = document.getElementById('root')

if (!root) {
  console.error('Root element not found!')
} else {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } catch (error) {
    console.error('React render error:', error)
    root.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace;">Error rendering app: ${error.message}</div>`
  }
}

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason)
})