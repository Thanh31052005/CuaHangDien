import React, { useState } from 'react';
import type { Product } from '../data/products';
import { products, formatPrice } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { pageParams, navigate, addToCart, setIsCartOpen } = useApp();
  const product = pageParams.product as Product;
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<'desc' | 'spec' | 'reviews'>('desc');

  if (!product) {
    navigate('home');
    return null;
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setIsCartOpen(true);
  };

  const badgeClass = product.badge === 'hot' ? 'badge-error' : product.badge === 'new' ? 'badge-success' : 'badge-warning';
  const badgeLabel = product.badge === 'hot' ? 'Bán chạy' : product.badge === 'new' ? 'Mới' : 'Sale';

  const specs = [
    { label: 'Thương hiệu', value: product.name.split(' ')[0] },
    { label: 'Danh mục', value: product.category },
    { label: 'Xuất xứ', value: 'Hàn Quốc / Nhật Bản' },
    { label: 'Bảo hành', value: '24 tháng chính hãng' },
    { label: 'Tình trạng', value: product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng' },
  ];

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><button onClick={() => navigate('home')} className="hover:text-primary">Trang chủ</button></li>
            <li><button onClick={() => navigate('products', { category: product.category })} className="hover:text-primary">{product.category}</button></li>
            <li className="text-base-content/60 line-clamp-1 max-w-[200px]">{product.name}</li>
          </ul>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Images */}
          <div className="bg-base-100 rounded-2xl p-4 border border-base-200">
            <div className="aspect-square rounded-xl overflow-hidden mb-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-primary' : 'border-base-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {product.badge && <span className={`badge ${badgeClass} font-semibold`}>{badgeLabel}</span>}
              {product.discount && <span className="badge badge-error font-bold">Giảm {product.discount}%</span>}
              <span className="badge badge-ghost text-xs">{product.category}</span>
            </div>

            <h1 className="text-2xl font-black leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex text-warning">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-base-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-base-content/50 text-sm">({product.reviews} đánh giá)</span>
              <div className="divider divider-horizontal mx-0" />
              <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                {product.stock > 0 ? `✓ Còn hàng` : '✗ Hết hàng'}
              </span>
            </div>

            {/* Price */}
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-primary">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-lg line-through text-base-content/40">{formatPrice(product.oldPrice)}</span>
                )}
                {product.discount && (
                  <span className="badge badge-error font-bold">Tiết kiệm {formatPrice(product.oldPrice! - product.price)}</span>
                )}
              </div>
            </div>

            {/* Promotions */}
            <div className="space-y-2">
              {['🚚 Miễn phí vận chuyển toàn quốc', '🔄 Đổi trả miễn phí trong 30 ngày', '🛡️ Bảo hành chính hãng 24 tháng', '📦 Giao hàng trong 24h nội thành'].map(t => (
                <p key={t} className="text-sm text-base-content/70">{t}</p>
              ))}
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center border border-base-300 rounded-xl overflow-hidden">
                <button onClick={() => setQty(v => Math.max(1, v - 1))} className="btn btn-ghost btn-sm rounded-none w-10">-</button>
                <span className="text-base font-bold w-10 text-center">{qty}</span>
                <button onClick={() => setQty(v => Math.min(product.stock, v + 1))} className="btn btn-ghost btn-sm rounded-none w-10">+</button>
              </div>
              <button onClick={handleAddToCart} className="btn btn-primary flex-1 gap-2" disabled={product.stock === 0}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Thêm vào giỏ hàng
              </button>
              <button className="btn btn-outline btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-base-100 rounded-2xl border border-base-200 mb-8 overflow-hidden">
          <div className="tabs tabs-bordered border-b border-base-200 px-4">
            {(['desc', 'spec', 'reviews'] as const).map(t => (
              <button key={t} className={`tab tab-lg font-semibold ${tab === t ? 'tab-active text-primary' : ''}`} onClick={() => setTab(t)}>
                {t === 'desc' ? 'Mô tả' : t === 'spec' ? 'Thông số' : `Đánh giá (${product.reviews})`}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === 'desc' && (
              <p className="text-base-content/80 leading-relaxed">{product.description}</p>
            )}
            {tab === 'spec' && (
              <table className="table table-zebra w-full max-w-lg">
                <tbody>
                  {specs.map(s => (
                    <tr key={s.label}>
                      <td className="font-semibold text-sm w-40">{s.label}</td>
                      <td className="text-sm text-base-content/80">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === 'reviews' && (
              <div className="space-y-4">
                {[5, 4, 5, 4, 5].map((r, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-base-200 last:border-0">
                    <div className="avatar placeholder flex-shrink-0">
                      <div className="w-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                        {String.fromCharCode(65 + i)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">Khách hàng {i + 1}</span>
                        <div className="flex text-warning">
                          {[...Array(5)].map((_, j) => (
                            <svg key={j} xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${j < r ? 'fill-current' : 'fill-base-300'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-base-content/40">• {i + 1} ngày trước</span>
                      </div>
                      <p className="text-sm text-base-content/70">Sản phẩm chất lượng, giao hàng nhanh. Rất hài lòng với trải nghiệm mua hàng!</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
