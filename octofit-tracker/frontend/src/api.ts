const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

type CollectionResponse<T> = T[] | { data?: T[]; items?: T[]; results?: T[] }

export async function fetchCollection<T>(resource: string): Promise<T[]> {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  const payload = (await response.json()) as CollectionResponse<T>
  if (Array.isArray(payload)) {
    return payload
  }

  return payload.data ?? payload.items ?? payload.results ?? []
}