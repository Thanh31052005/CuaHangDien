import React from 'react';
import type { Product } from '../../constants/products';
import { formatPrice } from '../../constants/products';
import { useApp } from '../../contexts/AppContext';
import { ROUTES } from '../../constants';

interface ProductCardProps {
  product: Product;
  size?: 'sm' | 'md';
}

export default function ProductCard({ product, size = 'md' }: ProductCardProps) {
  const { addToCart, navigate } = useApp();

  const badgeLabel = product.badge === 'hot' ? 'Bán chạy' : product.badge === 'new' ? 'Mới' : 'Sale';
  const badgeClass = product.badge === 'hot' ? 'bg-red-500 text-white' : product.badge === 'new' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white';

  return (
    <div
      className="group card bg-base-100 rounded-2xl border border-base-200/80 hover:border-primary/20 hover-lift cursor-pointer overflow-hidden"
      onClick={() => navigate(ROUTES.PRODUCT_DETAIL, { product })}
    >
      <figure className={`relative overflow-hidden ${size === 'sm' ? 'h-44' : 'h-56'} bg-base-200`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`${badgeClass} px-2.5 py-1 rounded-full text-xs font-bold shadow-lg`}>
              {badgeLabel}
            </span>
          )}
        </div>
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            -{product.discount}%
          </span>
        )}
        {/* Quick-add overlay */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            className="btn btn-primary w-full rounded-none border-0 gap-2 btn-sm shadow-lg"
            onClick={e => { e.stopPropagation(); addToCart(product); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm vào giỏ
          </button>
        </div>
      </figure>

      <div className="card-body p-4 gap-2">
        {/* Name */}
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {/* Price */}
        <div className="flex items-end gap-2 mt-auto">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs line-through text-base-content/35">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
