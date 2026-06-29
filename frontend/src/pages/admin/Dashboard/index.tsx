import React from 'react';

const STATS = [
  { label: 'Doanh thu tháng', value: '42.500.000đ', icon: '💰', change: '+12%', up: true },
  { label: 'Đơn hàng mới', value: '128', icon: '📦', change: '+8%', up: true },
  { label: 'Sản phẩm', value: '47', icon: '💡', change: '0%', up: true },
  { label: 'Khách hàng', value: '356', icon: '👥', change: '+5%', up: true },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Tổng quan</h1>
        <p className="text-base-content/60 text-sm mt-1">Chào mừng quay lại, Admin!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-base-100 rounded-xl border border-base-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.up ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>{s.change}</span>
            </div>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-sm text-base-content/60 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-base-100 rounded-xl border border-base-200 p-5">
          <h2 className="font-bold mb-4">Đơn hàng gần đây</h2>
          <div className="space-y-3">
            {['EP240128', 'EP240127', 'EP240126', 'EP240125'].map((id, i) => (
              <div key={id} className="flex items-center justify-between text-sm">
                <span className="font-medium">#{id}</span>
                <span className="text-base-content/60">{(i + 1) * 250000 + 100000}đ</span>
                <span className={`badge badge-xs ${i === 0 ? 'badge-warning' : 'badge-success'}`}>{i === 0 ? 'Đang giao' : 'Đã giao'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-base-100 rounded-xl border border-base-200 p-5">
          <h2 className="font-bold mb-4">Sản phẩm sắp hết hàng</h2>
          <div className="space-y-3">
            {[
              { name: 'Bóng LED Philips 9W', stock: 5 },
              { name: 'Pin CR2032 vỉ 5', stock: 8 },
              { name: 'Quạt bàn USB 15cm', stock: 3 },
            ].map(p => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <span className="font-medium line-clamp-1">{p.name}</span>
                <span className="badge badge-error badge-sm">Còn {p.stock}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
