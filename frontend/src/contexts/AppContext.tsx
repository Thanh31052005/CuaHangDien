import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../constants/products';
import { ROUTES } from '../constants';
import type { RouteName } from '../constants';

// ─── Types ───────────────────────────────────────────────────────────────────
interface CartItem extends Product { quantity: number; }

interface AuthUser { name: string; email: string; role: 'user' | 'admin'; }

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  // Navigation
  currentPage: RouteName;
  navigate: (page: RouteName, params?: Record<string, unknown>) => void;
  pageParams: Record<string, unknown>;
  // Auth
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  cartCount: number;
  cartTotal: number;
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // Modals
  isLoginOpen: boolean;
  setIsLoginOpen: (v: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (v: boolean) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextType | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light'
  );
  const [currentPage, setCurrentPage] = useState<RouteName>(ROUTES.HOME);
  const [pageParams, setPageParams] = useState<Record<string, unknown>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const navigate = (page: RouteName, params: Record<string, unknown> = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (authUser: AuthUser) => {
    setUser(authUser);
    setIsLoginOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    navigate(ROUTES.HOME);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      currentPage, navigate, pageParams,
      user, isAuthenticated: !!user, isAdmin: user?.role === 'admin',
      login, logout,
      cartItems, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal,
      searchQuery, setSearchQuery,
      isLoginOpen, setIsLoginOpen,
      isCartOpen, setIsCartOpen,
      isSearchOpen, setIsSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
