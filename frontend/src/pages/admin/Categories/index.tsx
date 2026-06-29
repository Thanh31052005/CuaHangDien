import React from 'react';
import { categories } from '../../../constants/products';
export default function AdminCategoriesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Danh mục</h1>
        <button className="btn btn-primary btn-sm">+ Thêm danh mục</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(c => (
          <div key={c.id} className="bg-base-100 rounded-xl border border-base-200 p-5 flex items-center justify-between">
            <span className="font-semibold">{c.name}</span>
            <div className="flex gap-1">
              <button className="btn btn-ghost btn-xs text-primary">Sửa</button>
              <button className="btn btn-ghost btn-xs text-error">Xoá</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
