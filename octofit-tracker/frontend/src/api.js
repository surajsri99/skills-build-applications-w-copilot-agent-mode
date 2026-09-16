const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`);
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`);
  }

  const payload = await response.json();
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.data ?? payload.items ?? payload.results ?? [];
}
