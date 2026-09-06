import { axiosClient } from '../api/axiosClient';
import type { Product } from '../../constants/products';

export interface ProductListParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  size?: number;
  badge?: string; // Optional field for 'hot', 'new'
}

export interface ProductListResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export const productService = {
  getAll: (params: ProductListParams = {}) => {
    // Lọc các giá trị undefined/null ra khỏi query string
    const filteredParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      
    return axiosClient.get<any, ProductListResponse>('/products', {
      params: filteredParams,
    });
  },

  getById: (id: number | string) =>
    axiosClient.get<any, Product>(`/products/${id}`),

  create: (product: Omit<Product, 'id'>) =>
    axiosClient.post<any, Product>('/products', product),

  update: (id: number | string, product: Partial<Product>) =>
    axiosClient.put<any, Product>(`/products/${id}`, product),

  delete: (id: number | string) =>
    axiosClient.delete<any, void>(`/products/${id}`),
};
