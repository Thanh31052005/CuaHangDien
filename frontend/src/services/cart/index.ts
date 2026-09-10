import { axiosClient } from '../api/axiosClient';
import type { Product } from '../../constants/products';

export interface CartItem {
  id: number; // Tùy backend trả về
  productId: number;
  product?: Product;
  quantity: number;
}

export const cartService = {
  addCart: (productId: number, quantity: number) =>
    axiosClient.post<any, any>('/carts/add', { productId, quantity }),

  getCart: () =>
    axiosClient.get<any, any>('/carts'),

  updateQuantity: (productId: number, quantity: number) =>
    axiosClient.put<any, any>(`/carts/products/${productId}?quantity=${quantity}`),

  removeCartItem: (productId: number) =>
    axiosClient.delete<any, any>(`/carts/products/${productId}`),
};
