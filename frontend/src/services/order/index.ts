import { axiosClient } from '../api/axiosClient';

export interface OrderItem { productId: number; quantity: number; price: number; }
export interface CreateOrderPayload { items: OrderItem[]; address: string; phone: string; paymentMethod: string; promoCode?: string; }
export interface CheckoutPayload { shippingAddress: string; phoneNumber: string; paymentMethod: string; promotionCode?: string; }
export interface Order { id: number; code: string; status: string; total: number; createdAt: string; items: OrderItem[]; }

export const orderService = {
  checkout: (payload: CheckoutPayload) =>
    axiosClient.post<any, Order>('/orders/checkout', payload),

  create: (payload: CreateOrderPayload) =>
    axiosClient.post<any, Order>('/orders', payload),

  getMyOrders: () =>
    axiosClient.get<any, Order[]>('/orders/me'),

  getById: (id: number) =>
    axiosClient.get<any, Order>(`/orders/${id}`),

  // Admin
  getAll: (page = 0, size = 20) =>
    axiosClient.get<any, { content: Order[]; totalPages: number }>(`/orders?page=${page}&size=${size}`),

  updateStatus: (id: number, status: string) =>
    axiosClient.put<any, Order>(`/orders/${id}/status`, { status }),
};
