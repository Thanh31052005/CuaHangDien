import React from 'react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  size?: 'sm' | 'md';
}

export default function ProductCard({ product, size = 'md' }: ProductCardProps) {
  const { addToCart, navigate } = useApp();

  const badgeLabel = product.badge === 'hot' ? 'Bán chạy' : product.badge === 'new' ? 'Mới' : 'Sale';
  const badgeClass = product.badge === 'hot' ? 'badge-error' : product.badge === 'new' ? 'badge-success' : 'badge-warning';

  return (
    <div
      className="group card bg-base-100 border border-base-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate('product', { product })}
    >
      <figure className={`relative overflow-hidden ${size === 'sm' ? 'h-44' : 'h-56'} bg-base-200`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`badge ${badgeClass} absolute top-3 left-3 font-semibold shadow`}>
            {badgeLabel}
          </span>
        )}
        {product.discount && (
          <span className="badge badge-error absolute top-3 right-3 font-bold shadow">
            -{product.discount}%
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="btn btn-primary w-full rounded-none border-0 gap-2"
            onClick={e => { e.stopPropagation(); addToCart(product); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Thêm vào giỏ
          </button>
        </div>
      </figure>

      <div className="card-body p-4 gap-2">
        <div className="flex items-center gap-1 text-warning">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-base-300'}`} viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-base-content/60 ml-1">({product.reviews})</span>
        </div>

        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="flex items-end gap-2 mt-1">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs line-through text-base-content/40">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {product.stock <= 10 && (
          <p className="text-xs text-error font-medium">Chỉ còn {product.stock} sản phẩm</p>
        )}
      </div>
    </div>
  );
}
