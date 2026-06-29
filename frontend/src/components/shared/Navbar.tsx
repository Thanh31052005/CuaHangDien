import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { products, formatPrice } from '../../constants/products';
import { ROUTES } from '../../constants';
import { useScrollY } from '../../hooks';

const NAV_CATEGORIES = [
  { label: 'Đèn', slug: ROUTES.PRODUCTS },
  { label: 'Quạt', slug: ROUTES.PRODUCTS },
  { label: 'Pin', slug: ROUTES.PRODUCTS },
  { label: 'Dây điện', slug: ROUTES.PRODUCTS },
  { label: 'Ổ cắm & Công tắc', slug: ROUTES.PRODUCTS },
  { label: 'Phụ kiện điện', slug: ROUTES.PRODUCTS },
] as const;

export default function Navbar() {
  const {
    theme, toggleTheme,
    cartCount, setIsCartOpen,
    setIsLoginOpen, navigate,
    isSearchOpen, setIsSearchOpen,
    searchQuery, setSearchQuery,
    isAuthenticated, isAdmin, user, logout,
  } = useApp();

  const scrollY = useScrollY();
  const scrolled = scrollY > 20;
  const [localQ, setLocalQ] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) searchRef.current.focus();
  }, [isSearchOpen]);

  const suggestions = localQ.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(localQ.toLowerCase())).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localQ.trim()) return;
    setSearchQuery(localQ);
    setIsSearchOpen(false);
    navigate(ROUTES.PRODUCTS);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-content text-xs py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>🚚 Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
          <div className="flex gap-4 items-center">
            <span>Hotline: 1800 1234</span>
            <span>|</span>
            <a className="hover:underline cursor-pointer">Cửa hàng & Chi nhánh</a>
            <span>|</span>
            <a className="hover:underline cursor-pointer">Tra cứu đơn hàng</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className={`sticky top-0 z-50 bg-base-100 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-base-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <button onClick={() => navigate(ROUTES.HOME)} className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-content font-black text-sm">E</div>
              <span className="font-black text-xl">Elec<span className="text-primary">Pro</span></span>
            </button>

            {/* Category dropdown */}
            <div className="dropdown hidden lg:block">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1 font-medium text-base-content/80 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Danh mục
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 border border-base-200 rounded-xl w-52 z-[100] mt-1">
                {NAV_CATEGORIES.map(c => (
                  <li key={c.label}>
                    <button onClick={() => { setSearchQuery(''); navigate(ROUTES.PRODUCTS, { category: c.label }); }} className="hover:bg-primary/10 hover:text-primary rounded-lg font-medium">
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search bar - desktop */}
            <form onSubmit={handleSearch} className="flex-1 hidden md:flex relative max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={localQ}
                  onChange={e => setLocalQ(e.target.value)}
                  placeholder="Tìm kiếm đèn, quạt, pin, dây điện..."
                  className="input input-bordered w-full pr-12 focus:outline-primary bg-base-200/60 border-base-300 focus:bg-base-100 transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary btn-sm btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-base-100 border border-base-200 rounded-xl shadow-xl z-[200] mt-1 overflow-hidden">
                    {suggestions.map(p => (
                      <button key={p.id} type="button"
                        className="flex items-center gap-3 w-full p-3 hover:bg-primary/10 hover:text-primary transition-colors text-left"
                        onClick={() => { navigate(ROUTES.PRODUCT_DETAIL, { product: p }); setLocalQ(''); }}>
                        <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt={p.name} />
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                          <p className="text-xs text-primary font-bold">{formatPrice(p.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>

            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button className="btn btn-ghost btn-circle btn-sm md:hidden" onClick={() => setIsSearchOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
              </button>

              {/* User menu */}
              {isAuthenticated ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1.5 font-medium hidden sm:flex">
                    <div className="w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    {user?.name.split(' ').pop()}
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 border border-base-200 rounded-xl w-44 z-[100] mt-2">
                    <li><button onClick={() => navigate(ROUTES.PROFILE)} className="hover:bg-primary/10 hover:text-primary">Tài khoản</button></li>
                    <li><button onClick={() => navigate(ROUTES.ORDERS)} className="hover:bg-primary/10 hover:text-primary">Đơn hàng</button></li>
                    {isAdmin && <li><button onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)} className="hover:bg-primary/10 hover:text-primary">Quản trị</button></li>}
                    <div className="divider my-0.5" />
                    <li><button onClick={logout} className="hover:bg-error/10 hover:text-error">Đăng xuất</button></li>
                  </ul>
                </div>
              ) : (
                <button onClick={() => setIsLoginOpen(true)} className="btn btn-ghost btn-sm gap-1.5 hidden sm:flex font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Đăng nhập
                </button>
              )}

              <button onClick={() => setIsCartOpen(true)} className="btn btn-primary btn-sm gap-1.5 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="hidden sm:inline">Giỏ hàng</span>
                {cartCount > 0 && <span className="badge badge-xs badge-warning absolute -top-2 -right-2 font-bold">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Category strip */}
        <div className="hidden lg:block border-t border-base-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5">
              {NAV_CATEGORIES.map(c => (
                <button key={c.label} onClick={() => { setSearchQuery(''); navigate(ROUTES.PRODUCTS, { category: c.label }); }}
                  className="btn btn-ghost btn-xs font-medium text-base-content/70 hover:text-primary hover:bg-primary/10 whitespace-nowrap">
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-base-300/80 backdrop-blur-sm z-[200] flex flex-col" onClick={() => setIsSearchOpen(false)}>
          <div className="bg-base-100 p-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input ref={searchRef} type="text" value={localQ} onChange={e => setLocalQ(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..." className="input input-bordered flex-1 focus:outline-primary" />
              <button type="submit" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setIsSearchOpen(false)}>✕</button>
            </form>
            {suggestions.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                {suggestions.map(p => (
                  <button key={p.id} type="button" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-xl text-left"
                    onClick={() => { navigate(ROUTES.PRODUCT_DETAIL, { product: p }); setIsSearchOpen(false); setLocalQ(''); }}>
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-primary font-bold">{formatPrice(p.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
