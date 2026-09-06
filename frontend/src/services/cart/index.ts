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
    axiosClient.get<any, CartItem[]>('/carts'),
};
