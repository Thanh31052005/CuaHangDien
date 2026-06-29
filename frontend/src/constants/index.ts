// ─── API ────────────────────────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

// ─── Route keys (state-based navigation) ────────────────────────────────────
export const ROUTES = {
  HOME: 'home',
  PRODUCTS: 'products',
  PRODUCT_DETAIL: 'product',
  CART: 'cart',
  CHECKOUT: 'checkout',
  PROFILE: 'profile',
  ORDERS: 'orders',
  // Auth
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  // Admin
  ADMIN_DASHBOARD: 'admin-dashboard',
  ADMIN_PRODUCTS: 'admin-products',
  ADMIN_CATEGORIES: 'admin-categories',
  ADMIN_ORDERS: 'admin-orders',
  ADMIN_USERS: 'admin-users',
  ADMIN_INVENTORY: 'admin-inventory',
  ADMIN_REPORTS: 'admin-reports',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];

// ─── Pagination ──────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 8;

// ─── Promo codes (mock — replace with API) ───────────────────────────────────
export const VALID_PROMO_CODES: Record<string, number> = {
  SALE10: 10,
  MOIDK: 15,
  KHACHHANG: 20,
};

// ─── Free shipping threshold ─────────────────────────────────────────────────
export const FREE_SHIPPING_THRESHOLD = 500_000;
export const SHIPPING_FEE = 35_000;
