import { apiClient } from '../api';

export interface OrderItem { productId: number; quantity: number; price: number; }
export interface CreateOrderPayload { items: OrderItem[]; address: string; phone: string; paymentMethod: string; promoCode?: string; }
export interface Order { id: number; code: string; status: string; total: number; createdAt: string; items: OrderItem[]; }

export const orderService = {
  create: (payload: CreateOrderPayload) =>
    apiClient.post<Order>('/orders', payload),

  getMyOrders: () =>
    apiClient.get<Order[]>('/orders/me'),

  getById: (id: number) =>
    apiClient.get<Order>(`/orders/${id}`),

  // Admin
  getAll: (page = 0, size = 20) =>
    apiClient.get<{ content: Order[]; totalPages: number }>(`/orders?page=${page}&size=${size}`),

  updateStatus: (id: number, status: string) =>
    apiClient.put<Order>(`/orders/${id}/status`, { status }),
};
