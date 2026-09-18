import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/AboutPage.css'
import './styles/AppShell.css'
import './styles/ChatPanel.css'
import './styles/PapersSidebar.css'
import './styles/PaperViewer.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
