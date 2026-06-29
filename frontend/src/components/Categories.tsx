import React from 'react';
import { categories } from '../data/products';
import { useApp } from '../context/AppContext';

export default function Categories() {
  const { navigate, setSearchQuery } = useApp();
  const icons = ['📺', '🧊', '👕', '❄️', '🔊', '🏠'];

  return (
    <section className="bg-base-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-5">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => { setSearchQuery(''); navigate('products', { category: cat.slug }); }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-base-200 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-200 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{icons[i]}</span>
              <span className="text-xs sm:text-sm font-semibold text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
