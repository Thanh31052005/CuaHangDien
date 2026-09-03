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
    { label: '��n LED & ��n ?ng', cat: '��n' },
    { label: 'Qu?t tr?n & Qu?t d?ng', cat: 'Qu?t' },
    { label: 'Pin c�c lo?i', cat: 'Pin' },
    { label: 'D�y di?n & C�p di?n', cat: 'D�y di?n' },
    { label: '? c?m & C�ng t?c', cat: '? c?m & C�ng t?c' },
    { label: 'Ph? ki?n di?n', cat: 'Ph? ki?n di?n' },
  ];

  return (
    <footer className="bg-gradient-to-b from-neutral to-neutral-900 text-neutral-content">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center font-black text-primary-content shadow-lg shadow-primary/20">E</div>
              <span className="font-black text-xl tracking-tight">Elec<span className="text-primary">Pro</span></span>
            </div>
            <p className="text-neutral-content/60 text-sm leading-relaxed mb-5">
              Cung c?p v?t tu di?n ch�nh h�ng: d�n LED, qu?t di?n, pin, d�y di?n, ? c?m v� ph? ki?n di?n da d?ng.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'Zalo', path: 'M12.49 10.272v-.045c1.616-.381 2.678-1.725 2.678-3.405C15.168 4.394 13.18 3 10.476 3H3.403v18h7.47c2.835 0 4.994-1.596 4.994-4.156 0-2.089-1.357-3.488-3.377-3.572zm-5.62-4.164h2.858c1.313 0 2.143.631 2.143 1.724v.045c0 1.18-.83 1.769-2.143 1.769H6.87V6.108zm3.299 11.695H6.87v-4.208h3.344c1.528 0 2.451.72 2.451 2.045v.045c0 1.312-.923 2.118-2.496 2.118z' },
                { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { label: 'TikTok', path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
              ].map(s => (
                <button key={s.label} className="w-9 h-9 rounded-xl bg-neutral-content/10 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all" title={s.label}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-5 text-base">Danh m?c</h3>
            <ul className="space-y-2.5 text-sm text-neutral-content/60">
              {CATEGORY_LINKS.map(l => (
                <li key={l.label}>
                  <button onClick={() => navigate(ROUTES.PRODUCTS, { category: l.cat })} className="hover:text-primary hover:translate-x-1 transition-all text-left">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-bold mb-5 text-base">Ch�nh s�ch</h3>
            <ul className="space-y-2.5 text-sm text-neutral-content/60">
              {['Ch�nh s�ch b?o h�nh', '�?i tr? 30 ng�y', 'Giao h�ng nhanh', 'B?o m?t th�ng tin', '�i?u kho?n s? d?ng', 'Hu?ng d?n mua h�ng'].map(l => (
                <li key={l}><a className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer inline-block">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Promo code */}
          <div>
            <h3 className="font-bold mb-3 text-base">Nh?p m� gi?m gi�</h3>
            <p className="text-sm text-neutral-content/60 mb-4">
              C� m� uu d�i? Nh?p t?i d�y d? �p d?ng cho don h�ng ti?p theo.
            </p>
            <form onSubmit={handlePromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                placeholder="Vd: SALE10"
                className="input input-bordered input-sm flex-1 bg-neutral-content/5 border-neutral-content/15 focus:border-primary uppercase tracking-widest rounded-xl"
              />
              <button type="submit" className="btn btn-primary btn-sm rounded-xl">�p d?ng</button>
            </form>
            {promoStatus === 'success' && (
              <p className="mt-2 text-success text-sm font-semibold animate-fade-up">? M� h?p l? � gi?m {discount}% cho don h�ng!</p>
            )}
            {promoStatus === 'error' && (
              <p className="mt-2 text-error text-sm font-semibold animate-fade-up">? M� kh�ng h?p l? ho?c d� h?t h?n.</p>
            )}
            <div className="mt-6 space-y-2 text-sm text-neutral-content/60">
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Hotline: <span className="text-primary font-semibold">1800 1234</span>
              </p>
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                8:00 � 21:00 m?i ng�y
              </p>
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                cskh@elecpro.vn
              </p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
