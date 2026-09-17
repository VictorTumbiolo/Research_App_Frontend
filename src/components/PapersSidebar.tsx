import type { PaperEntry } from '../services/paperService'

interface PapersSidebarProps {
  papers: PaperEntry[]
  selectedPaperId: string | null
  isOpen: boolean
  isSubmitting: boolean
  error: string | null
  onToggleOpen: () => void
  onSelectPaper: (paperId: string) => void
  onRemovePaper: (event: React.MouseEvent, paperId: string) => void
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRun: () => void
}

export function PapersSidebar({
  papers,
  selectedPaperId,
  isOpen,
  isSubmitting,
  error,
  onToggleOpen,
  onSelectPaper,
  onRemovePaper,
  onUpload,
  onRun,
}: PapersSidebarProps) {
  return (
    <div className={`papers-sidebar ${isOpen ? '' : 'collapsed'}`}>
      <button
        className="sidebar-toggle"
        onClick={onToggleOpen}
        aria-label={isOpen ? 'Collapse papers panel' : 'Expand papers panel'}
        aria-expanded={isOpen}
      >
        <span className="sidebar-toggle-arrow">›</span>
      </button>

      <aside className="details-panel">
        <h2>Papers</h2>

        <div className="paper-list-container">
          {papers.length === 0 ? (
            <p className="placeholder-text">Upload a paper to see it listed here</p>
          ) : (
            <ul className="paper-list">
              {papers.map((paper) => (
                <li
                  key={paper.id}
                  className={`paper-card ${paper.id === selectedPaperId ? 'selected' : ''}`}
                  onClick={() => onSelectPaper(paper.id)}
                >
                  <span className="paper-name">{paper.name}</span>
                  <button
                    className="paper-remove"
                    onClick={(event) => onRemovePaper(event, paper.id)}
                    aria-label={`Remove ${paper.name}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="details-panel-footer">
          {papers.length > 0 && (
            <>
              <button className="run-button" onClick={onRun} disabled={isSubmitting}>
                {isSubmitting ? 'Running...' : 'Run'}
              </button>
              {error && <p className="error-text">{error}</p>}
            </>
          )}

          <label className="upload-button">
            Upload PDF
            <input type="file" accept="application/pdf" multiple onChange={onUpload} hidden />
          </label>
        </div>
      </aside>
    </div>
  )
}