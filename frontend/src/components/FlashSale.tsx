import React, { useState, useEffect } from 'react';
import { products, formatPrice } from '../data/products';
import { useApp } from '../context/AppContext';

function useCountdown(targetMs: number) {
  const [timeLeft, setTimeLeft] = useState(targetMs - Date.now());
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(targetMs - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  const total = Math.max(0, timeLeft);
  const h = Math.floor(total / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  return { h, m, s };
}

export default function FlashSale() {
  const { navigate, addToCart } = useApp();
  // 6h from now
  const target = Date.now() + 6 * 3600 * 1000;
  const { h, m, s } = useCountdown(target);

  const saleProducts = products.filter(p => p.badge === 'sale').slice(0, 4);

  return (
    <section className="bg-base-100 py-10 border-t border-base-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <h2 className="text-xl font-black text-error">Flash Sale</h2>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-error text-error-content font-black text-lg px-2.5 py-1 rounded-lg tabular-nums min-w-[2.2rem] text-center">{String(h).padStart(2, '0')}</span>
              <span className="text-error font-black text-xl">:</span>
              <span className="bg-error text-error-content font-black text-lg px-2.5 py-1 rounded-lg tabular-nums min-w-[2.2rem] text-center">{String(m).padStart(2, '0')}</span>
              <span className="text-error font-black text-xl">:</span>
              <span className="bg-error text-error-content font-black text-lg px-2.5 py-1 rounded-lg tabular-nums min-w-[2.2rem] text-center">{String(s).padStart(2, '0')}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('products', { filter: 'sale' })}
            className="btn btn-ghost btn-sm text-primary gap-1 font-semibold"
          >
            Xem tất cả
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {saleProducts.map(p => (
            <div key={p.id} className="card bg-base-100 border border-error/20 hover:border-error/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer" onClick={() => navigate('product', { product: p })}>
              <figure className="relative h-44 bg-base-200 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 badge badge-error font-bold shadow">-{p.discount}%</div>
                {/* Progress bar */}
                <div className="absolute bottom-0 inset-x-0 bg-base-100/90 px-3 py-1.5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-base-content/70">Đã bán {Math.floor(Math.random() * 40 + 50)}%</span>
                    <span className="text-error font-medium">Còn {p.stock}</span>
                  </div>
                  <progress className="progress progress-error h-1.5 w-full" value={Math.floor(Math.random() * 40 + 50)} max="100"></progress>
                </div>
              </figure>
              <div className="card-body p-3 gap-1.5">
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-error transition-colors">{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-error font-black">{formatPrice(p.price)}</span>
                  <span className="text-xs line-through text-base-content/40">{formatPrice(p.oldPrice!)}</span>
                </div>
                <button
                  className="btn btn-error btn-xs w-full mt-1"
                  onClick={e => { e.stopPropagation(); addToCart(p); }}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
