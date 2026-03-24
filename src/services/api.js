// API client and endpoints - e.g. auth, listings
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}
