const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
const TOKEN_KEY = 'smartbee_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = token =>
  token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY)

async function request(method, path, body) {
  const token = getToken()
  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  if (res.status === 401 && token) {
    setToken(null)
    window.location.assign('/login')
  }
  if (!res.ok) {
    const error = new Error(json.error || json.message || 'Something went wrong')
    error.status = res.status
    throw error
  }
  return json.data
}

export const api = {
  get: path => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  patch: (path, body) => request('PATCH', path, body),
  del: path => request('DELETE', path),
}
