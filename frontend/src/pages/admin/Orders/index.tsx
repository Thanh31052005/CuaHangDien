import React from 'react';
export default function AdminOrdersPage() {
  const orders = Array.from({ length: 8 }, (_, i) => ({
    id: 'EP24' + String(100 + i).padStart(4, '0'),
    customer: 'Khách hàng ' + (i + 1),
    total: (i + 1) * 150000 + 80000,
    status: ['Chờ xác nhận','Đang xử lý','Đang giao','Đã giao','Đã huỷ'][i % 5],
    date: '2026-06-' + String(28 - i).padStart(2, '0'),
  }));
  const S: Record<string,string> = {'Chờ xác nhận':'badge-ghost','Đang xử lý':'badge-info','Đang giao':'badge-warning','Đã giao':'badge-success','Đã huỷ':'badge-error'};
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black">Quản lý đơn hàng</h1>
      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table table-zebra bg-base-100">
          <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày đặt</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td className="font-mono text-sm font-bold">#{o.id}</td>
                <td>{o.customer}</td>
                <td className="text-sm text-base-content/60">{o.date}</td>
                <td className="font-semibold text-primary">{o.total.toLocaleString('vi-VN')}đ</td>
                <td><span className={"badge badge-sm " + S[o.status]}>{o.status}</span></td>
                <td><button className="btn btn-ghost btn-xs text-primary">Xem</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
