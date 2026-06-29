import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import { ROUTES } from '../../../constants';

export default function ProfilePage() {
  const { user, navigate } = useApp();
  return (
    <div className="bg-base-200 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl font-black mb-6">Tài khoản của tôi</h1>
        <div className="bg-base-100 rounded-2xl border border-base-200 p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary font-black text-2xl flex items-center justify-center">
              {user?.name.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <div>
              <p className="font-bold text-lg">{user?.name}</p>
              <p className="text-base-content/60 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="divider" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Họ và tên', value: user?.name ?? '—' },
              { label: 'Email', value: user?.email ?? '—' },
              { label: 'Số điện thoại', value: '09xxxxxxxx' },
              { label: 'Địa chỉ', value: '123 Đường ABC, Quận 1' },
            ].map(f => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">{f.label}</label>
                <p className="font-medium">{f.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn btn-primary">Chỉnh sửa thông tin</button>
            <button className="btn btn-outline" onClick={() => navigate(ROUTES.ORDERS)}>Đơn hàng của tôi</button>
          </div>
        </div>
      </div>
    </div>
  );
}
