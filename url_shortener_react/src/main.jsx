import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './Components/AuthPage'
import './index.css'
import LandingPage from './Components/LandingPage'
import Dashboard from './Components/Dashboard'
import ManageLinksPage from './Components/ManageLinks'
import Analytics from './Components/Analytics'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="/manage" element={<ManageLinksPage />} />
        <Route path="/analytics/:shortUrl" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
