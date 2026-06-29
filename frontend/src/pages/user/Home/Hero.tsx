import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import { ROUTES } from '../../../constants';

export default function Hero() {
  const { navigate } = useApp();
  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden min-h-[320px] lg:min-h-[380px] group">
            <img src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1400&auto=format&fit=crop" alt="Banner" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12">
              <span className="badge badge-primary badge-lg font-bold mb-4 w-fit">Chính hãng 100%</span>
              <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-3">
                Vật tư điện<br /><span className="text-primary">chất lượng cao</span>
              </h1>
              <p className="text-white/80 text-sm lg:text-base mb-6 max-w-sm">
                Cung cấp đèn, quạt, pin, dây điện và phụ kiện điện đa dạng — chính hãng, giá tốt, giao hàng nhanh.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-primary">Mua sắm ngay</button>
                <button onClick={() => navigate(ROUTES.PRODUCTS, { category: 'Đèn' })} className="btn btn-outline btn-sm text-white border-white/40 hover:bg-white/10 hover:text-white">Xem đèn LED</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden h-44 group cursor-pointer" onClick={() => navigate(ROUTES.PRODUCTS, { category: 'Quạt' })}>
              <img src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop" alt="Quạt" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white/80 text-xs mb-1">Đang có hàng</p>
                <p className="text-white font-bold text-lg">Quạt điện các loại</p>
                <p className="text-primary font-black text-sm">Quạt trần · Quạt đứng · Quạt bàn</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-44 group cursor-pointer" onClick={() => navigate(ROUTES.PRODUCTS, { category: 'Pin' })}>
              <img src="https://images.unsplash.com/photo-1606806116070-0f4b2b5cc06b?q=80&w=800&auto=format&fit=crop" alt="Pin" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white/80 text-xs mb-1">Chính hãng</p>
                <p className="text-white font-bold text-lg">Pin & Ắc quy</p>
                <p className="text-primary font-black text-sm">Giảm đến 24% →</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: '🚚', title: 'Giao hàng miễn phí', sub: 'Đơn từ 500.000đ' },
            { icon: '🔄', title: 'Đổi trả 30 ngày', sub: 'Không cần lý do' },
            { icon: '🛡️', title: 'Hàng chính hãng', sub: 'Có hoá đơn đầy đủ' },
            { icon: '💳', title: 'Thanh toán an toàn', sub: 'COD · Chuyển khoản' },
          ].map(b => (
            <div key={b.title} className="bg-base-100 rounded-xl p-4 flex items-center gap-3 border border-base-200 hover:border-primary/30 hover:shadow-sm transition-all">
              <span className="text-2xl">{b.icon}</span>
              <div><p className="font-semibold text-sm">{b.title}</p><p className="text-xs text-base-content/60">{b.sub}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
