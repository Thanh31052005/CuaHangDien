import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../constants/products';
import { ROUTES } from '../constants';
import type { RouteName } from '../constants';
import { cartService } from '../services/cart';

// ─── Types ───────────────────────────────────────────────────────────────────
interface CartItem extends Product { quantity: number; }

interface AuthUser { name: string; email: string; role: 'user' | 'admin'; }

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentPage: RouteName;
  navigate: (page: RouteName, params?: Record<string, unknown>) => void;
  pageParams: Record<string, unknown>;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (v: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch (e) {
    return true;
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light'
  );
  const [currentPage, setCurrentPage] = useState<RouteName>(ROUTES.HOME);
  const [pageParams, setPageParams] = useState<Record<string, unknown>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem('access_token');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      return null;
    }
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setCartItems([]);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user && localStorage.getItem('access_token')) {
      cartService.getCart().then(res => {
        // Backend CartResponseDto has items array.
        if (res && res.items) {
          const items = res.items.map((item: any) => ({
            id: item.productId,
            name: item.productName,
            image: item.imageUrl,
            price: item.price,
            quantity: item.quantity
          }));
          setCartItems(items);
        }
      }).catch(err => console.error('Failed to fetch cart', err));
    } else {
      // Clear cart if logged out
      setCartItems([]);
    }
  }, [user]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const navigate = (page: RouteName, params: Record<string, unknown> = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (authUser: AuthUser) => {
    setUser(authUser);
    localStorage.setItem('user', JSON.stringify(authUser));
    setIsLoginOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate(ROUTES.HOME);
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (user) {
      try {
        await cartService.addCart(product.id, quantity);
      } catch (err) {
        console.error('Lỗi khi thêm vào giỏ DB', err);
      }
    }
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = async (id: number) => {
    if (user) {
      try {
        await cartService.removeCartItem(id);
      } catch (err) {
        console.error('Lỗi khi xóa khỏi giỏ DB', err);
      }
    }
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = async (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    
    if (user) {
      try {
        await cartService.updateQuantity(id, qty);
      } catch (err) {
        console.error('Lỗi khi cập nhật giỏ DB', err);
      }
    }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      currentPage, navigate, pageParams,
      user, isAuthenticated: !!user, isAdmin: user?.role === 'admin',
      login, logout,
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal,
      searchQuery, setSearchQuery,
      isLoginOpen, setIsLoginOpen,
      isCartOpen, setIsCartOpen,
      isSearchOpen, setIsSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
