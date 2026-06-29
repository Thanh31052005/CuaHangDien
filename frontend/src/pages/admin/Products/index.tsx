import React from 'react';
import { products } from '../../../constants/products';
import { formatPrice } from '../../../constants/products';

export default function AdminProductsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Quản lý sản phẩm</h1>
        <button className="btn btn-primary btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input type="text" placeholder="Tìm kiếm sản phẩm..." className="input input-bordered input-sm flex-1 min-w-[200px] focus:outline-primary" />
        <select className="select select-bordered select-sm"><option>Tất cả danh mục</option><option>Đèn</option><option>Quạt</option><option>Pin</option><option>Dây điện</option></select>
        <select className="select select-bordered select-sm"><option>Tất cả trạng thái</option><option>Còn hàng</option><option>Hết hàng</option></select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table table-zebra bg-base-100">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-medium text-sm line-clamp-1 max-w-[180px]">{p.name}</span>
                  </div>
                </td>
                <td><span className="badge badge-ghost badge-sm">{p.category}</span></td>
                <td className="font-semibold text-primary">{formatPrice(p.price)}</td>
                <td>
                  <span className={p.stock <= 10 ? 'text-error font-bold' : ''}>{p.stock}</span>
                </td>
                <td>
                  <span className={`badge badge-sm ${p.stock > 0 ? 'badge-success' : 'badge-error'}`}>
                    {p.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-ghost btn-xs text-primary">Sửa</button>
                    <button className="btn btn-ghost btn-xs text-error">Xoá</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
