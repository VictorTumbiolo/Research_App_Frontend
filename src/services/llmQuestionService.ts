// const API_BASE_URL = 'http://localhost:8000'
const API_BASE_URL = import.meta.env.VITE_API_URL

export interface ChatTurn {
  role: 'user' | 'assistant'
  text: string
}

export interface QueryResponse {
  received: string
  searches?: string[]
  searched?: boolean
}

export async function sendQuestion(
  question: string,
  filename: string,
  history: ChatTurn[] = []
): Promise<QueryResponse> {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, filename, history }),
  })

  if (!response.ok) {
    throw new Error(`Query failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}