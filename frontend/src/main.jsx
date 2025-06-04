import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import HomePage from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomePage />
    <ToastContainer />
  </StrictMode>,
)
