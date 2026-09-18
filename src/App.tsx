import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import { AboutPage } from './pages/AboutPage'
import type { PaperEntry } from './services/paperService'
import type { ChatMessage } from './components/ChatPanel'

function App() {
  const [papers, setPapers] = useState<PaperEntry[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            papers={papers}
            setPapers={setPapers}
            messages={messages}
            setMessages={setMessages}
            selectedPaperId={selectedPaperId}
            setSelectedPaperId={setSelectedPaperId}
          />
        }
      />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}

export default App
