import type { PaperEntry } from '../services/paperService'

interface PaperViewerProps {
  paper: PaperEntry
  url: string
  isResizing: boolean
  panelWidth: number | null
  onClose: () => void
  onResizeMouseDown: (event: React.MouseEvent) => void
}

export function PaperViewer({
  paper,
  url,
  isResizing,
  panelWidth,
  onClose,
  onResizeMouseDown,
}: PaperViewerProps) {
  return (
    <>
      <section
        className={`paper-viewer-panel ${isResizing ? 'resizing' : ''}`}
        style={panelWidth ? { flex: `0 0 ${panelWidth}px` } : undefined}
      >
        <div className="paper-viewer-header">
          <span className="paper-viewer-title">{paper.name}</span>
          <button className="paper-viewer-close" onClick={onClose} aria-label="Close paper">
            ×
          </button>
        </div>
        <div className="paper-viewer-body">
          <iframe key={paper.id} src={`${url}#page=1`} title={paper.name} />
        </div>
      </section>

      <div
        className={`resize-handle ${isResizing ? 'active' : ''}`}
        onMouseDown={onResizeMouseDown}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize paper viewer"
      />
    </>
  )
}