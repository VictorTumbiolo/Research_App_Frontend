import { useEffect, useMemo, useRef, useState } from 'react'
import { submitPapers, type PaperEntry } from '../services/paperService'
import { sendQuestion } from '../services/llmQuestionService'
import { usePaperResize } from '../hooks/usePaperResize'
import { PapersSidebar } from '../components/PapersSidebar'
import { PaperViewer } from '../components/PaperViewer'
import { ChatPanel, type ChatMessage } from '../components/ChatPanel'
import { Nav } from '../components/Nav'

interface MainPageProps {
  papers: PaperEntry[]
  setPapers: React.Dispatch<React.SetStateAction<PaperEntry[]>>
  messages: ChatMessage[]
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  selectedPaperId: string | null
  setSelectedPaperId: React.Dispatch<React.SetStateAction<string | null>>
}

function MainPage({
  papers,
  setPapers,
  messages,
  setMessages,
  selectedPaperId,
  setSelectedPaperId,
}: MainPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [paperUrl, setPaperUrl] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const selectedPaper = useMemo(
    () => papers.find((paper) => paper.id === selectedPaperId) ?? null,
    [papers, selectedPaperId]
  )

  const { containerRef, paperPanelWidth, isResizingPaper, handleResizeMouseDown } =
    usePaperResize(!!selectedPaper)

  // Build an object URL for whichever paper is selected, and clean it up
  // when the selection changes or the component unmounts.
  useEffect(() => {
    if (!selectedPaper) {
      setPaperUrl(null)
      return
    }

    const url = URL.createObjectURL(selectedPaper.file)
    setPaperUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [selectedPaper])

  // If a paper gets removed from the list while it's open, close the viewer.
  useEffect(() => {
    if (selectedPaperId && !papers.some((paper) => paper.id === selectedPaperId)) {
      setSelectedPaperId(null)
    }
  }, [papers, selectedPaperId])

  const SAMPLE_PAPER_FILENAME =
    'Conceptualizing_Suicidal_Behavior_Utilizing_Explanations_of_Predicted_Outcomes_to_Analyze_Longitudinal_Social_Media_Data.pdf'
  const hasSampleLoaded = useRef(false)

  useEffect(() => {
    // pagination setup to remember uploaded papers
    if (hasSampleLoaded.current) return
    if (papers.length > 0) return
    hasSampleLoaded.current = true

    const loadSamplePaper = async () => {
      const response = await fetch(`/${SAMPLE_PAPER_FILENAME}`)
      const blob = await response.blob()
      const file = new File([blob], SAMPLE_PAPER_FILENAME, { type: 'application/pdf' })

      const sampleEntry: PaperEntry = {
        id: crypto.randomUUID(),
        name: file.name,
        file,
      }

      setPapers((prev) => [...prev, sampleEntry])
      setSelectedPaperId(sampleEntry.id)
    }

    loadSamplePaper()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const newEntries: PaperEntry[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      file,
    }))

    setPapers((prev) => [...prev, ...newEntries])
    event.target.value = ''
  }

  const handleRun = async () => {
    if (papers.length === 0) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await submitPapers(papers)

      const rejected = response.papers.filter((p) => p.status === 'rejected_too_long')
      if (rejected.length > 0) {
        setError('Please limit to 15 pages or less.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleSend = async () => {
    if (!input.trim() || !selectedPaper) return

    const questionText = input.trim()

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: questionText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')


    const history = messages.map(({ role, text }) => ({ role, text }))

    try {
      const response = await sendQuestion(questionText, selectedPaper.name, history)

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: response.received,
          tokensUsed: response.tokens_used,
          totalTokens: response.total_tokens,
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'Something went wrong reaching the backend.',
        },
      ])
    }
  }

  const handleTest = async () => {
    try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
      // const response = await fetch(`http://localhost:8000/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Test request failed:', error)
    }
  }

  const handlePaperClick = (paperId: string) => {
    // Clicking the already-open paper closes the viewer.
    setSelectedPaperId((prev) => (prev === paperId ? null : paperId))
  }

  const handleRemovePaper = (event: React.MouseEvent, paperId: string) => {
    // Don't let the click also select/open the paper being removed.
    event.stopPropagation()
    setPapers((prev) => prev.filter((paper) => paper.id !== paperId))
  }

  return (
    <div className="app-shell">
      <Nav />

      <main className="app-main" ref={containerRef}>
        {selectedPaper && paperUrl && (
          <PaperViewer
            paper={selectedPaper}
            url={paperUrl}
            isResizing={isResizingPaper}
            panelWidth={paperPanelWidth}
            onClose={() => setSelectedPaperId(null)}
            onResizeMouseDown={handleResizeMouseDown}
          />
        )}

        <ChatPanel
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          onTest={handleTest}
        />

        <PapersSidebar
          papers={papers}
          selectedPaperId={selectedPaperId}
          isOpen={isSidebarOpen}
          isSubmitting={isSubmitting}
          error={error}
          onToggleOpen={() => setIsSidebarOpen((prev) => !prev)}
          onSelectPaper={handlePaperClick}
          onRemovePaper={handleRemovePaper}
          onUpload={handleFileUpload}
          onRun={handleRun}
        />
      </main>
    </div>
  )
}

export default MainPage