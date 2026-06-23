// services/api.js
// Central API client for all CarBazaar backend calls.
// Automatically attaches the JWT token from localStorage to every request.

const BASE = import.meta.env.VITE_API_URL || 'https://carbazaar-backend-pqag.onrender.com';

function getToken() {
  return localStorage.getItem('carBazaarToken');
}

// Core fetch wrapper — attaches auth header and throws on non-OK responses
async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── AUTH ──────────────────────────────────────────────────────
export const authAPI = {
  register: (body) =>
    request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
};

// ── USER PROFILE ──────────────────────────────────────────────
export const userAPI = {
  getProfile: () => request('/api/users/profile'),
  updateProfile: (body) =>
    request('/api/users/profile', { method: 'PUT', body: JSON.stringify(body) }),
};

// ── CARS ──────────────────────────────────────────────────────
export const carAPI = {
  getAll: () => request('/api/cars'),
  getNew: () => request('/api/cars/new'),
  getOld: () => request('/api/cars/old'),
  getById: (id) => request(`/api/cars/${id}`),
  create: (body) =>
    request('/api/cars', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/api/cars/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) =>
    request(`/api/cars/${id}`, { method: 'DELETE' }),
};

// ── WISHLIST ──────────────────────────────────────────────────
export const wishlistAPI = {
  add: (carId) =>
    request('/api/wishlist/add', { method: 'POST', body: JSON.stringify({ carId }) }),
  get: (userId) => request(`/api/wishlist/${userId}`),
  remove: (carId) => request(`/api/wishlist/${carId}`, { method: 'DELETE' }),
};

// ── BOOKING ───────────────────────────────────────────────────
export const bookingAPI = {
  create: (body) => request('/api/bookings', { method: 'POST', body: JSON.stringify(body) }),
  getMyBookings: () => request('/api/bookings/my'),
};

// ── CHAT ────────────────────────────────────────────────
export const chatAPI = {
  getUserChats: () => request('/api/chat'),
  start: (sellerId) =>
    request('/api/chat/start', { method: 'POST', body: JSON.stringify({ sellerId }) }),
  getChat: (chatId) => request(`/api/chat/${chatId}`),
  sendMessage: (chatId, text) =>
    request('/api/chat/message', { method: 'POST', body: JSON.stringify({ chatId, text }) }),
};

// ── UPLOAD ──────────────────────────────────────────────
export const uploadAPI = {
  upload: async (file) => {
    const token = getToken();
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`${BASE}/api/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    // Return the full URL so it can be used as an img src
    return `${BASE}${data.url}`;
  },
};

// ── ADMIN ─────────────────────────────────────────────────────
export const adminAPI = {
  getUsers: () => request('/api/admin/users'),
  deleteUser: (id) => request(`/api/admin/user/${id}`, { method: 'DELETE' }),
  getCars: () => request('/api/admin/cars'),
  getBookings: () => request('/api/admin/bookings'),
};

// ── HELPER: normalize API car → UI car shape ──────────────────
// The backend Car model fields differ from what UI components expect.
// This mapper bridges the gap without changing either side.
const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800';

export function normalizeCar(c) {
  const gallery = Array.isArray(c.images) && c.images.length
    ? c.images.filter(Boolean)
    : c.image
      ? [c.image]
      : [];
  const cover = c.image || gallery[0] || PLACEHOLDER_IMG;
  const images = gallery.length ? gallery : [cover];

  return {
    id: c._id,
    _id: c._id,
    brand: c.brand || '',
    title: c.name || `${c.brand} Car`,
    subtitle: c.year ? `${c.year} • ${c.fuelType || ''}` : (c.brand || ''),
    price: c.price || 0,
    year: c.year || 0,
    mileage: c.mileage || 0,
    fuelType: c.fuelType || 'Gasoline',
    location: c.location || 'N/A',
    image: cover,
    images,
    description: c.description || '',
    features: Array.isArray(c.features) ? c.features : [],
    transmission: c.transmission || 'Automatic',
    bodyType: c.bodyType || 'Sedan',
    color: c.color || '',
    type: c.type,
    seller: c.seller,
  };
}
