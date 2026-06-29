import React from 'react';
import type { ReactNode } from 'react';
import { useApp } from '../contexts/AppContext';
import { ROUTES } from '../constants';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { navigate, logout, theme, toggleTheme } = useApp();

  const NAV_ITEMS = [
    { label: 'Tổng quan', route: ROUTES.ADMIN_DASHBOARD, icon: '📊' },
    { label: 'Sản phẩm', route: ROUTES.ADMIN_PRODUCTS, icon: '💡' },
    { label: 'Danh mục', route: ROUTES.ADMIN_CATEGORIES, icon: '📁' },
    { label: 'Đơn hàng', route: ROUTES.ADMIN_ORDERS, icon: '📦' },
    { label: 'Người dùng', route: ROUTES.ADMIN_USERS, icon: '👥' },
    { label: 'Kho hàng', route: ROUTES.ADMIN_INVENTORY, icon: '🏭' },
    { label: 'Báo cáo', route: ROUTES.ADMIN_REPORTS, icon: '📈' },
  ] as const;

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r border-base-200 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-base-200 cursor-pointer hover:bg-base-200 transition-colors" onClick={() => navigate(ROUTES.HOME)}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-content font-black text-sm">E</div>
            <span className="font-black text-lg">Elec<span className="text-primary">Admin</span></span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors text-left"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-base-200 space-y-2">
          <button onClick={toggleTheme} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-base-200 transition-colors">
            <span className="text-lg">{theme === 'light' ? '🌙' : '☀️'}</span>
            Giao diện {theme === 'light' ? 'Tối' : 'Sáng'}
          </button>
          <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">
            <span className="text-lg">🚪</span>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-base-100 border-b border-base-200 flex items-center justify-between px-6 flex-shrink-0">
          <h2 className="font-bold">Hệ thống quản trị</h2>
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">A</div>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
