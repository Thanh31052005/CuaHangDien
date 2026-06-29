import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ROUTES } from '../constants';

// Layouts
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Wrappers
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// User Pages
import HomePage from '../pages/user/Home';
import ProductsPage from '../pages/user/Product';
import ProductDetailPage from '../pages/user/ProductDetail';
import CartPage from '../pages/user/Cart';
import CheckoutPage from '../pages/user/Checkout';
import ProfilePage from '../pages/user/Profile';
import OrdersPage from '../pages/user/Orders';

// Admin Pages
import AdminDashboardPage from '../pages/admin/Dashboard';
import AdminProductsPage from '../pages/admin/Products';
import {
  AdminCategoriesPage,
  AdminOrdersPage,
  AdminUsersPage,
  AdminInventoryPage,
  AdminReportsPage
} from '../pages/admin';

export default function AppRoutes() {
  const { currentPage } = useApp();

  // Route matching logic
  const renderRoute = () => {
    switch (currentPage) {
      // User public routes
      case ROUTES.HOME: return <UserLayout><HomePage /></UserLayout>;
      case ROUTES.PRODUCTS: return <UserLayout><ProductsPage /></UserLayout>;
      case ROUTES.PRODUCT_DETAIL: return <UserLayout><ProductDetailPage /></UserLayout>;
      case ROUTES.CART: return <UserLayout><CartPage /></UserLayout>;
      case ROUTES.CHECKOUT: return <UserLayout><CheckoutPage /></UserLayout>;
      
      // User private routes
      case ROUTES.PROFILE: return <PrivateRoute><UserLayout><ProfilePage /></UserLayout></PrivateRoute>;
      case ROUTES.ORDERS: return <PrivateRoute><UserLayout><OrdersPage /></UserLayout></PrivateRoute>;
      
      // Admin routes
      case ROUTES.ADMIN_DASHBOARD: return <AdminRoute><AdminLayout><AdminDashboardPage /></AdminLayout></AdminRoute>;
      case ROUTES.ADMIN_PRODUCTS: return <AdminRoute><AdminLayout><AdminProductsPage /></AdminLayout></AdminRoute>;
      case ROUTES.ADMIN_CATEGORIES: return <AdminRoute><AdminLayout><AdminCategoriesPage /></AdminLayout></AdminRoute>;
      case ROUTES.ADMIN_ORDERS: return <AdminRoute><AdminLayout><AdminOrdersPage /></AdminLayout></AdminRoute>;
      case ROUTES.ADMIN_USERS: return <AdminRoute><AdminLayout><AdminUsersPage /></AdminLayout></AdminRoute>;
      case ROUTES.ADMIN_INVENTORY: return <AdminRoute><AdminLayout><AdminInventoryPage /></AdminLayout></AdminRoute>;
      case ROUTES.ADMIN_REPORTS: return <AdminRoute><AdminLayout><AdminReportsPage /></AdminLayout></AdminRoute>;
      
      // Default fallback
      default: return <UserLayout><HomePage /></UserLayout>;
    }
  };

  return renderRoute();
}
