import { API_BASE_URL } from '../../constants';

/**
 * Base HTTP client.
 * Replace body with axios instance when backend is ready:
 *   import axios from 'axios';
 *   export const apiClient = axios.create({ baseURL: API_BASE_URL, ... });
 */

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? 'API error');
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
