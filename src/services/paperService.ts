export interface PaperEntry {
  id: string
  name: string
  file: File
}

// const API_BASE_URL = 'http://localhost:8000'
const API_BASE_URL = import.meta.env.VITE_API_URL

export async function submitPapers(papers: PaperEntry[]): Promise<unknown> {
  const formData = new FormData()

  papers.forEach((paper) => {
    formData.append('files', paper.file, paper.name)
  })

  const response = await fetch(`${API_BASE_URL}/papers`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}