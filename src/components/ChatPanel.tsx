import ReactMarkdown from 'react-markdown'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

interface ChatPanelProps {
  messages: ChatMessage[]
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
  onTest: () => void
}

export function ChatPanel({ messages, input, onInputChange, onSend, onTest }: ChatPanelProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSend()
    }
  }

  return (
    <section className="chat-panel">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <p className="placeholder-text">Ask a question about your uploaded papers</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`chat-bubble ${message.role}`}>
              {message.role === 'assistant' ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </div>
          ))
        )}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-send-button" onClick={onSend}>
          Send
        </button>

        <button className="chat-send-button" onClick={onTest}>
          Test
        </button>
      </div>
    </section>
  )
}