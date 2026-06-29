import React from 'react';
export default function AdminUsersPage() {
  const users = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, name: 'Nguyễn Văn ' + String.fromCharCode(65+i), email: 'user' + (i+1) + '@email.com', role: i === 0 ? 'admin' : 'user', orders: i * 2 + 1 }));
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black">Quản lý người dùng</h1>
      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table table-zebra bg-base-100">
          <thead><tr><th>Tên</th><th>Email</th><th>Vai trò</th><th>Đơn hàng</th><th>Thao tác</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="font-semibold">{u.name}</td>
                <td className="text-sm">{u.email}</td>
                <td><span className={"badge badge-sm " + (u.role === 'admin' ? 'badge-primary' : 'badge-ghost')}>{u.role}</span></td>
                <td>{u.orders}</td>
                <td><div className="flex gap-1"><button className="btn btn-ghost btn-xs text-primary">Sửa</button><button className="btn btn-ghost btn-xs text-error">Khoá</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
