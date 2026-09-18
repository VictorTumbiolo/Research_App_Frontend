export interface PaperEntry {
  id: string
  name: string
  file: File
}

export interface PaperUploadResult {
  filename: string
  num_chunks: number
  status: 'chunked' | 'already_chunked' | 'rejected_too_long'
  page_count?: number
}

export interface PapersResponse {
  papers: PaperUploadResult[]
}

// const API_BASE_URL = 'http://localhost:8000'
const API_BASE_URL = import.meta.env.VITE_API_URL

export async function submitPapers(papers: PaperEntry[]): Promise<PapersResponse> {
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
