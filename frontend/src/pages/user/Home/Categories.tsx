import React from 'react';
import { categories } from '../../../constants/products';
import { useApp } from '../../../contexts/AppContext';
import { ROUTES } from '../../../constants';
import ScrollReveal from '../../../components/common/ScrollReveal';

const ICONS = ['💡', '🌀', '🔋', '🔌', '🔲', '🔧'];

export default function Categories() {
  const { navigate, setSearchQuery } = useApp();
  return (
    <section className="bg-base-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-bold">Danh mục sản phẩm</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <button key={cat.id} onClick={() => { setSearchQuery(''); navigate(ROUTES.PRODUCTS, { category: cat.slug }); }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-base-200/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 group">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{ICONS[i]}</span>
                <span className="text-sm font-semibold text-center leading-tight group-hover:text-primary transition-colors">{cat.name}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
