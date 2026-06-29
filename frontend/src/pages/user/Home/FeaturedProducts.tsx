import React from 'react';
import { products } from '../../../constants/products';
import { useApp } from '../../../contexts/AppContext';
import { ROUTES } from '../../../constants';
import ProductCard from '../../../components/common/ProductCard';

export default function FeaturedProducts() {
  const { navigate } = useApp();
  const featured = products.filter(p => p.badge === 'hot' || p.badge === 'new');
  return (
    <section className="bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Sản phẩm nổi bật</h2>
            <p className="text-sm text-base-content/60 mt-0.5">Được khách hàng tin dùng nhiều nhất</p>
          </div>
          <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-ghost btn-sm text-primary gap-1 font-semibold">
            Xem tất cả
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
