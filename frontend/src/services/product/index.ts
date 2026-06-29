import { apiClient } from '../api';
import type { Product } from '../../constants/products';

export interface ProductListParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  size?: number;
}

export interface ProductListResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export const productService = {
  getAll: (params: ProductListParams = {}) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return apiClient.get<ProductListResponse>(`/products?${query}`);
  },

  getById: (id: number) =>
    apiClient.get<Product>(`/products/${id}`),

  create: (product: Omit<Product, 'id'>) =>
    apiClient.post<Product>('/products', product),

  update: (id: number, product: Partial<Product>) =>
    apiClient.put<Product>(`/products/${id}`, product),

  delete: (id: number) =>
    apiClient.delete<void>(`/products/${id}`),
};
