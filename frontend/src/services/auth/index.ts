import { axiosClient } from '../api/axiosClient';

export interface LoginPayload { username: string; password: string; }
export interface RegisterPayload { firstName: string; lastName: string; phone: string; email: string; password: string; }
export interface AuthResponse { accessToken: string; refreshToken: string; user: { id: number; name: string; email: string; role: 'user' | 'admin' }; }

export const authService = {
  login: (payload: LoginPayload) =>
    axiosClient.post<any, AuthResponse>('/auth/login', payload),

  register: (payload: RegisterPayload) =>
    axiosClient.post<any, AuthResponse>('/auth/register', payload),

  logout: () =>
    axiosClient.post<any, void>('/auth/logout', {}),

  refreshToken: (refreshToken: string) =>
    axiosClient.post<any, AuthResponse>('/auth/refresh', { refreshToken }),

  forgotPassword: (email: string) =>
    axiosClient.post<any, { message: string }>('/auth/forgot-password', { email }),
};
