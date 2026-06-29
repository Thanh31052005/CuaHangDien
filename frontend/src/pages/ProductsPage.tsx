import React, { useState, useMemo } from 'react';
import { products, categories, formatPrice } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const { pageParams, searchQuery, navigate } = useApp();
  const initCat = (pageParams.category as string) || '';
  const initFilter = (pageParams.filter as string) || '';

  const [selectedCategory, setSelectedCategory] = useState(initCat);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 40000000]);
  const [sort, setSort] = useState<SortKey>('default');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchQuery) {
      list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory) {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (initFilter === 'sale') {
      list = list.filter(p => p.badge === 'sale' || (p.discount && p.discount > 0));
    }

    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'discount': list.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
    }

    return list;
  }, [searchQuery, selectedCategory, priceRange, sort, initFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><button onClick={() => navigate('home')} className="hover:text-primary">Trang chủ</button></li>
            {selectedCategory ? (
              <>
                <li><button onClick={() => setSelectedCategory('')} className="hover:text-primary">Sản phẩm</button></li>
                <li className="text-primary font-semibold">{selectedCategory}</li>
              </>
            ) : (
              <li className="text-primary font-semibold">
                {searchQuery ? `Kết quả: "${searchQuery}"` : initFilter === 'sale' ? 'Đang giảm giá' : 'Tất cả sản phẩm'}
              </li>
            )}
          </ul>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="w-60 flex-shrink-0 hidden lg:block space-y-4">
            {/* Category filter */}
            <div className="bg-base-100 rounded-xl p-4 border border-base-200">
              <h3 className="font-bold mb-3 text-sm">Danh mục</h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-base-200'}`}
                >
                  Tất cả sản phẩm
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryChange(c.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === c.slug ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-base-200'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="bg-base-100 rounded-xl p-4 border border-base-200">
              <h3 className="font-bold mb-3 text-sm">Khoảng giá</h3>
              <div className="space-y-3">
                {[
                  { label: 'Dưới 5 triệu', range: [0, 5000000] as [number, number] },
                  { label: '5 – 15 triệu', range: [5000000, 15000000] as [number, number] },
                  { label: '15 – 25 triệu', range: [15000000, 25000000] as [number, number] },
                  { label: 'Trên 25 triệu', range: [25000000, 40000000] as [number, number] },
                ].map(({ label, range }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      className="radio radio-primary radio-sm"
                      checked={priceRange[0] === range[0] && priceRange[1] === range[1]}
                      onChange={() => { setPriceRange(range); setPage(1); }}
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="radio radio-primary radio-sm" checked={priceRange[0] === 0 && priceRange[1] === 40000000} onChange={() => { setPriceRange([0, 40000000]); setPage(1); }} />
                  <span className="text-sm">Tất cả mức giá</span>
                </label>
              </div>
            </div>

            {/* Promo filter */}
            <div className="bg-base-100 rounded-xl p-4 border border-base-200">
              <h3 className="font-bold mb-3 text-sm">Khuyến mãi</h3>
              <div className="space-y-2">
                {[
                  { label: '🔥 Bán chạy', badge: 'hot' },
                  { label: '⚡ Đang giảm giá', badge: 'sale' },
                  { label: '✨ Hàng mới về', badge: 'new' },
                ].map(({ label }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <p className="text-sm text-base-content/60">
                <span className="font-bold text-base-content">{filtered.length}</span> sản phẩm
              </p>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button onClick={() => setShowFilters(v => !v)} className="btn btn-ghost btn-sm gap-1 lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h10a1 1 0 010 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h6a1 1 0 010 2H4a1 1 0 01-1-1z" />
                  </svg>
                  Bộ lọc
                </button>

                <select
                  value={sort}
                  onChange={e => { setSort(e.target.value as SortKey); setPage(1); }}
                  className="select select-bordered select-sm focus:outline-primary"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="discount">Giảm giá nhiều nhất</option>
                </select>
              </div>
            </div>

            {/* Mobile filter drawer */}
            {showFilters && (
              <div className="lg:hidden bg-base-100 rounded-xl p-4 border border-base-200 mb-4">
                <h3 className="font-bold mb-3">Danh mục</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button onClick={() => { handleCategoryChange(''); setShowFilters(false); }} className={`btn btn-xs ${!selectedCategory ? 'btn-primary' : 'btn-ghost'}`}>Tất cả</button>
                  {categories.map(c => (
                    <button key={c.id} onClick={() => { handleCategoryChange(c.slug); setShowFilters(false); }} className={`btn btn-xs ${selectedCategory === c.slug ? 'btn-primary' : 'btn-ghost'}`}>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-base-content/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-lg">Không tìm thấy sản phẩm</p>
                <button onClick={() => { setSelectedCategory(''); setPriceRange([0, 40000000]); }} className="btn btn-primary btn-sm">Xóa bộ lọc</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginated.map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="join">
                      <button className="join-item btn btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>«</button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`join-item btn btn-sm ${page === i + 1 ? 'btn-primary' : ''}`}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button className="join-item btn btn-sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>»</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
