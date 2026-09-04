import { ROUTES } from '../../../constants'
import React, { useState, useEffect } from 'react';
import type { Product } from '../../../constants/products';
import { formatPrice } from '../../../constants/products';
import { useApp } from '../../../contexts/AppContext';
import ProductCard from '../../../components/common/ProductCard';
import { productService } from '../../../services/product';

export default function ProductDetailPage() {
  const { pageParams, navigate, addToCart, setIsCartOpen } = useApp();
  
  // Either we get the full product from navigation state, or just the ID
  const initialProduct = pageParams.product as Product;
  const productId = initialProduct?.id || pageParams.productId;

  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct);
  const [related, setRelated] = useState<Product[]>([]);
  
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<'desc' | 'spec' | 'reviews'>('desc');

  useEffect(() => {
    if (!productId) {
      navigate(ROUTES.HOME);
      return;
    }

    // Always fetch latest product details
    setLoading(true);
    productService.getById(productId)
      .then(res => {
        setProduct(res);
        // Fetch related products
        return productService.getAll({ category: res.category, size: 4 });
      })
      .then(res => {
        // Handle both paginated response and list array
        const relatedList = Array.isArray(res) ? res : res.content;
        setRelated(relatedList.filter((p: Product) => p.id !== productId).slice(0, 4));
      })
      .catch(err => console.error('Failed to fetch product details', err))
      .finally(() => setLoading(false));
  }, [productId, navigate]);

  if (loading && !product) {
    return (
      <div className="bg-base-200 min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-base-200 min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate(ROUTES.HOME)} className="btn btn-primary">Về trang chủ</button>
      </div>
    );
  }

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
            <li><button onClick={() => navigate(ROUTES.HOME)} className="hover:text-primary">Trang chủ</button></li>
            <li><button onClick={() => navigate(ROUTES.PRODUCTS, { category: product.category })} className="hover:text-primary">{product.category}</button></li>
            <li className="text-base-content/60 line-clamp-1 max-w-[200px]">{product.name}</li>
          </ul>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Images */}
          <div className="bg-base-100 rounded-2xl p-4 border border-base-200 relative">
            {loading && (
               <div className="absolute top-2 right-2 z-10"><span className="loading loading-spinner loading-xs text-primary"></span></div>
            )}
            <div className="aspect-square rounded-xl overflow-hidden mb-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-base-100 rounded-2xl p-6 border border-base-200 flex flex-col">
            <div className="mb-2">
              {product.badge && <span className={`badge ${badgeClass} badge-sm font-bold mr-2 uppercase`}>{badgeLabel}</span>}
              <div className="rating rating-sm align-middle">
                {[...Array(5)].map((_, i) => (
                  <input key={i} type="radio" className={`mask mask-star-2 ${i < Math.floor(product.rating) ? 'bg-warning' : 'bg-base-300'}`} disabled />
                ))}
                <span className="text-xs text-base-content/50 ml-2 align-middle">({product.reviews} đánh giá)</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            <div className="mb-6 pb-6 border-b border-base-200">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-3xl font-black text-primary">{formatPrice(product.price)}</span>
                {(product.oldPrice && product.oldPrice > product.price) && (
                  <span className="text-lg text-base-content/40 line-through mb-1">{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              {product.discount && product.discount > 0 ? (
                <span className="text-sm font-semibold text-success">Tiết kiệm {formatPrice(product.discount)}</span>
              ) : null}
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <div className="text-sm">
                <span className="text-base-content/60 inline-block w-24">Tình trạng:</span>
                <span className="font-semibold text-success">{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
              </div>
              <div className="text-sm">
                <span className="text-base-content/60 inline-block w-24">Giao hàng:</span>
                <span className="font-semibold">Miễn phí giao hàng toàn quốc</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="join border border-base-200 rounded-xl bg-base-200">
                <button className="join-item btn btn-ghost btn-sm text-lg px-4" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                <div className="join-item flex items-center justify-center px-4 font-semibold w-12 text-sm">{qty}</div>
                <button className="join-item btn btn-ghost btn-sm text-lg px-4" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button onClick={handleAddToCart} className="btn btn-primary flex-1 gap-2 rounded-xl" disabled={product.stock <= 0}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {product.stock > 0 ? 'Thêm vào giỏ' : 'Tạm hết hàng'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-base-100 rounded-2xl border border-base-200 mb-8 overflow-hidden">
          <div className="flex border-b border-base-200 overflow-x-auto hide-scrollbar">
            {[
              { id: 'desc', label: 'Mô tả chi tiết' },
              { id: 'spec', label: 'Thông số kỹ thuật' },
              { id: 'reviews', label: `Đánh giá (${product.reviews})` },
            ].map(t => (
              <button
                key={t.id}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${tab === t.id ? 'border-primary text-primary' : 'border-transparent text-base-content/60 hover:text-base-content'}`}
                onClick={() => setTab(t.id as any)}
              >
                {t.label}
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
