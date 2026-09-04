import React, { useState, useEffect } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { ROUTES } from '../../../constants';
import ProductCard from '../../../components/common/ProductCard';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { productService } from '../../../services/product';
import type { Product } from '../../../constants/products';

export default function FeaturedProducts() {
  const { navigate } = useApp();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming backend returns hottest/newest when requested or we just fetch a small list
    // In a real app, you might pass a badge or sort parameter
    productService.getAll({ size: 8, badge: 'hot' })
      .then(res => {
        const list = Array.isArray(res) ? res : res.content;
        setFeatured(list.slice(0, 8));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-base-200/50 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <div>
                <h2 className="text-xl font-bold">Sản phẩm nổi bật</h2>
                <p className="text-sm text-base-content/50 mt-0.5">Được khách hàng tin dùng nhiều nhất</p>
              </div>
            </div>
            <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-ghost btn-sm text-primary gap-1.5 font-semibold hover:bg-primary/5 rounded-xl">
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          
          {loading ? (
             <div className="flex justify-center py-10">
               <span className="loading loading-spinner text-primary"></span>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
