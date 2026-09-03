import React from 'react';
export default function AdminOrdersPage() {
  const orders = Array.from({ length: 8 }, (_, i) => ({
    id: 'EP24' + String(100 + i).padStart(4, '0'),
    customer: 'Kh�ch h�ng ' + (i + 1),
    total: (i + 1) * 150000 + 80000,
    status: ['Ch? x�c nh?n','�ang x? l�','�ang giao','�� giao','�� hu?'][i % 5],
    date: '2026-06-' + String(28 - i).padStart(2, '0'),
  }));
  const S: Record<string,string> = {'Ch? x�c nh?n':'badge-ghost','�ang x? l�':'badge-info','�ang giao':'badge-warning','�� giao':'badge-success','�� hu?':'badge-error'};
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black">Qu?n l� don h�ng</h1>
      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table table-zebra bg-base-100">
          <thead><tr><th>M� don</th><th>Kh�ch h�ng</th><th>Ng�y d?t</th><th>T?ng ti?n</th><th>Tr?ng th�i</th><th>Thao t�c</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td className="font-mono text-sm font-bold">#{o.id}</td>
                <td>{o.customer}</td>
                <td className="text-sm text-base-content/60">{o.date}</td>
                <td className="font-semibold text-primary">{o.total.toLocaleString('vi-VN')}d</td>
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
