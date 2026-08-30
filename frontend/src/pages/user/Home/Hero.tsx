import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import { ROUTES } from '../../../constants';

export default function Hero() {
  const { navigate } = useApp();
  return (
    <section className="bg-base-200/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[320px] lg:min-h-[400px] group">
            <img src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1400&auto=format&fit=crop" alt="Banner" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12">
              <span className="inline-flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm text-primary-content px-4 py-1.5 rounded-full text-xs font-bold mb-5 w-fit shadow-lg shadow-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Chính hãng 100%
              </span>
              <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4">
                Vật tư điện<br /><span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">chất lượng cao</span>
              </h1>
              <p className="text-white/70 text-sm lg:text-base mb-7 max-w-sm leading-relaxed">
                Cung cấp đèn, quạt, pin, dây điện và phụ kiện điện đa dạng — chính hãng, giá tốt, giao hàng nhanh.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-primary rounded-xl shadow-lg shadow-primary/30 gap-2">
                  Mua sắm ngay
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
                <button onClick={() => navigate(ROUTES.PRODUCTS, { category: 'Đèn' })} className="btn btn-ghost btn-sm text-white/80 border border-white/20 hover:bg-white/10 hover:text-white rounded-xl backdrop-blur-sm">Xem đèn LED</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden h-[192px] group cursor-pointer" onClick={() => navigate(ROUTES.PRODUCTS, { category: 'Quạt' })}>
              <img src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop" alt="Quạt" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white/60 text-xs mb-1 font-medium">Đang có hàng</p>
                <p className="text-white font-bold text-lg">Quạt điện các loại</p>
                <p className="text-primary font-bold text-sm flex items-center gap-1 mt-0.5">
                  Quạt trần · Quạt đứng · Quạt bàn
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[192px] group cursor-pointer" onClick={() => navigate(ROUTES.PRODUCTS, { category: 'Pin' })}>
              <img src="https://images.unsplash.com/photo-1606806116070-0f4b2b5cc06b?q=80&w=800&auto=format&fit=crop" alt="Pin" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white/60 text-xs mb-1 font-medium">Chính hãng</p>
                <p className="text-white font-bold text-lg">Pin & Ắc quy</p>
                <p className="text-primary font-bold text-sm flex items-center gap-1 mt-0.5">
                  Giảm đến 24%
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 stagger-children">
          {[
            { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>, title: 'Giao hàng miễn phí', sub: 'Đơn từ 500.000đ' },
            { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>, title: 'Đổi trả 30 ngày', sub: 'Không cần lý do' },
            { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: 'Hàng chính hãng', sub: 'Có hoá đơn đầy đủ' },
            { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>, title: 'Thanh toán an toàn', sub: 'COD · Chuyển khoản' },
          ].map(b => (
            <div key={b.title} className="bg-base-100 rounded-2xl p-4 flex items-center gap-4 border border-base-200/80 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                {b.icon}
              </div>
              <div>
                <p className="font-semibold text-sm">{b.title}</p>
                <p className="text-xs text-base-content/50 mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
