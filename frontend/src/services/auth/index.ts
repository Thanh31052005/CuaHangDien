import { apiClient } from '../api';

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { firstName: string; lastName: string; phone: string; email: string; password: string; }
export interface AuthResponse { accessToken: string; refreshToken: string; user: { id: number; name: string; email: string; role: 'user' | 'admin' }; }

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>('/auth/login', payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>('/auth/register', payload),

  logout: () =>
    apiClient.post<void>('/auth/logout', {}),

  refreshToken: (refreshToken: string) =>
    apiClient.post<AuthResponse>('/auth/refresh', { refreshToken }),

  forgotPassword: (email: string) =>
    apiClient.post<{ message: string }>('/auth/forgot-password', { email }),
};
