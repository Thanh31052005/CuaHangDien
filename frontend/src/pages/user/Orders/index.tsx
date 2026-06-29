import React from 'react';
import { ROUTES } from '../../../constants';
import { useApp } from '../../../contexts/AppContext';

const MOCK_ORDERS = [
  { id: 'EP240001', date: '28/06/2026', total: 285000, status: 'Đang giao', items: 2 },
  { id: 'EP240002', date: '20/06/2026', total: 1340000, status: 'Đã giao', items: 4 },
  { id: 'EP240003', date: '10/06/2026', total: 890000, status: 'Đã huỷ', items: 1 },
];

const STATUS_CLASS: Record<string, string> = {
  'Đang giao': 'badge-warning',
  'Đã giao': 'badge-success',
  'Đã huỷ': 'badge-error',
};

export default function OrdersPage() {
  const { navigate } = useApp();
  return (
    <div className="bg-base-200 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black">Đơn hàng của tôi</h1>
          <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-primary btn-sm">Tiếp tục mua sắm</button>
        </div>
        <div className="space-y-4">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="bg-base-100 rounded-xl border border-base-200 p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">#{order.id}</p>
                <p className="text-sm text-base-content/60">{order.date} · {order.items} sản phẩm</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{order.total.toLocaleString('vi-VN')}đ</p>
                <span className={`badge ${STATUS_CLASS[order.status]} badge-sm mt-1`}>{order.status}</span>
              </div>
              <button className="btn btn-ghost btn-sm">Xem chi tiết →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
