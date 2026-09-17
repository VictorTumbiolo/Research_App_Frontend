import { useEffect, useRef, useState } from 'react'

const MIN_PAPER_WIDTH = 280
const MIN_CHAT_WIDTH = 320
const SIDE_RESERVE = 260 // rough space to leave for the papers sidebar + gaps

export function usePaperResize(isPanelOpen: boolean) {
  const containerRef = useRef<HTMLElement>(null)
  const [paperPanelWidth, setPaperPanelWidth] = useState<number | null>(null)
  const [isResizingPaper, setIsResizingPaper] = useState(false)

  // Reset the manual width whenever the viewer closes, so it reopens at the
  // default ratio rather than remembering a stale drag position.
  useEffect(() => {
    if (!isPanelOpen) {
      setPaperPanelWidth(null)
    }
  }, [isPanelOpen])

  useEffect(() => {
    if (!isResizingPaper) return

    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const maxWidth = Math.max(
        MIN_PAPER_WIDTH,
        rect.width - MIN_CHAT_WIDTH - SIDE_RESERVE
      )
      const nextWidth = Math.min(
        Math.max(event.clientX - rect.left, MIN_PAPER_WIDTH),
        maxWidth
      )
      setPaperPanelWidth(nextWidth)
    }

    const handleMouseUp = () => {
      setIsResizingPaper(false)
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizingPaper])

  const handleResizeMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsResizingPaper(true)
  }

  return {
    containerRef,
    paperPanelWidth,
    isResizingPaper,
    handleResizeMouseDown,
  }
}