import axios from 'axios';
import { API_BASE_URL } from '../../constants';

// Tạo instance Axios
export const axiosClient = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động đính kèm Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Xử lý lỗi chung (Ví dụ: 401 Unauthorized)
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về response data luôn cho tiện (tùy backend format)
    // Nếu backend bọc data trong `data: {}`, thì return response.data;
    // Ở đây dùng axios chuẩn nên giữ nguyên response.data cho các service xử lý.
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Hết hạn token hoặc không có quyền -> Đăng xuất
      localStorage.removeItem('access_token');
      localStorage.removeItem('user'); 
      // Kích hoạt event hoặc đổi href
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);
