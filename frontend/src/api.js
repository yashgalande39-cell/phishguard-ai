// Central API base URL — reads from .env (VITE_API_BASE_URL)
// Falls back to localhost:5000 for local development
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
