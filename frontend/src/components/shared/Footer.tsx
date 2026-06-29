import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ROUTES, VALID_PROMO_CODES } from '../../constants';

export default function Footer() {
  const { navigate } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [discount, setDiscount] = useState(0);

  const handlePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    const pct = VALID_PROMO_CODES[code];
    if (pct) {
      setDiscount(pct);
      setPromoStatus('success');
    } else {
      setPromoStatus('error');
    }
    setTimeout(() => setPromoStatus('idle'), 4000);
  };

  const CATEGORY_LINKS = [
    { label: 'Đèn LED & Đèn ống', cat: 'Đèn' },
    { label: 'Quạt trần & Quạt đứng', cat: 'Quạt' },
    { label: 'Pin các loại', cat: 'Pin' },
    { label: 'Dây điện & Cáp điện', cat: 'Dây điện' },
    { label: 'Ổ cắm & Công tắc', cat: 'Ổ cắm & Công tắc' },
    { label: 'Phụ kiện điện', cat: 'Phụ kiện điện' },
  ];

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black text-primary-content">E</div>
              <span className="font-black text-xl">Elec<span className="text-primary">Pro</span></span>
            </div>
            <p className="text-neutral-content/70 text-sm leading-relaxed mb-4">
              Cung cấp vật tư điện chính hãng: đèn LED, quạt điện, pin, dây điện, ổ cắm và phụ kiện điện đa dạng.
            </p>
            <div className="flex gap-3">
              {['📘', '💬', '📺', '🎵'].map((icon, i) => (
                <button key={i} className="btn btn-ghost btn-xs btn-circle hover:bg-primary/20 hover:text-primary transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Danh mục</h3>
            <ul className="space-y-2 text-sm text-neutral-content/70">
              {CATEGORY_LINKS.map(l => (
                <li key={l.label}>
                  <button onClick={() => navigate(ROUTES.PRODUCTS, { category: l.cat })} className="hover:text-primary transition-colors text-left">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-bold mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm text-neutral-content/70">
              {['Chính sách bảo hành', 'Đổi trả 30 ngày', 'Giao hàng nhanh', 'Bảo mật thông tin', 'Điều khoản sử dụng', 'Hướng dẫn mua hàng'].map(l => (
                <li key={l}><a className="hover:text-primary cursor-pointer transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Promo code */}
          <div>
            <h3 className="font-bold mb-2">Nhập mã giảm giá</h3>
            <p className="text-sm text-neutral-content/70 mb-4">
              Có mã ưu đãi? Nhập tại đây để áp dụng cho đơn hàng tiếp theo.
            </p>
            <form onSubmit={handlePromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                placeholder="Vd: SALE10"
                className="input input-bordered input-sm flex-1 bg-neutral-focus border-neutral-content/20 focus:border-primary uppercase tracking-widest"
              />
              <button type="submit" className="btn btn-primary btn-sm">Áp dụng</button>
            </form>
            {promoStatus === 'success' && (
              <p className="mt-2 text-success text-sm font-semibold">✓ Mã hợp lệ — giảm {discount}% cho đơn hàng!</p>
            )}
            {promoStatus === 'error' && (
              <p className="mt-2 text-error text-sm font-semibold">✕ Mã không hợp lệ hoặc đã hết hạn.</p>
            )}
            <div className="mt-5 space-y-1 text-sm text-neutral-content/70">
              <p>📞 Hotline: <span className="text-primary font-semibold">1800 1234</span></p>
              <p>🕐 8:00 – 21:00 mỗi ngày</p>
              <p>📧 cskh@elecpro.vn</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-content/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-neutral-content/50">
          <p>© 2026 ElecPro. Tất cả quyền được bảo lưu.</p>
          <p>123 Nguyễn Trãi, Quận 1, TP.HCM | GPKD: 0123456789</p>
        </div>
      </div>
    </footer>
  );
}
