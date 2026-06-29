import { apiClient } from '../api';

export interface UserProfile { id: number; firstName: string; lastName: string; email: string; phone: string; address?: string; role: 'user' | 'admin'; }

export const userService = {
  getProfile: () =>
    apiClient.get<UserProfile>('/users/me'),

  updateProfile: (data: Partial<UserProfile>) =>
    apiClient.put<UserProfile>('/users/me', data),

  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post<void>('/users/me/password', { oldPassword, newPassword }),

  // Admin
  getAll: (page = 0, size = 20) =>
    apiClient.get<{ content: UserProfile[]; totalPages: number }>(`/users?page=${page}&size=${size}`),

  setRole: (id: number, role: 'user' | 'admin') =>
    apiClient.put<UserProfile>(`/users/${id}/role`, { role }),
};
