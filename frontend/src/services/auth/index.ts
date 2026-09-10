import { axiosClient } from '../api/axiosClient';

export interface LoginPayload { username: string; password: string; }
export interface RegisterPayload { username: string; email: string; password: string; fullName: string; }
export interface AuthResponse { token: string; username: string; fullName: string; email: string; role: string; message?: string; }

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
