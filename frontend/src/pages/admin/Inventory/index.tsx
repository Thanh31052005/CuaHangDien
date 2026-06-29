import React from 'react';
import { products } from '../../../constants/products';
import { formatPrice } from '../../../constants/products';
export default function AdminInventoryPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black">Kho hàng</h1>
      <div className="grid grid-cols-3 gap-4 mb-2">
        {[{label:'Tổng sản phẩm',value:products.length,cls:'text-primary'},{label:'Cần nhập thêm',value:products.filter(p=>p.stock<=10).length,cls:'text-error'},{label:'Còn đủ hàng',value:products.filter(p=>p.stock>10).length,cls:'text-success'}].map(s=>(
          <div key={s.label} className="bg-base-100 rounded-xl border border-base-200 p-4 text-center">
            <p className={"text-3xl font-black "+s.cls}>{s.value}</p>
            <p className="text-sm text-base-content/60 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table table-zebra bg-base-100">
          <thead><tr><th>Sản phẩm</th><th>Danh mục</th><th>Tồn kho</th><th>Giá</th><th>Cập nhật</th></tr></thead>
          <tbody>
            {products.sort((a,b)=>a.stock-b.stock).map(p=>(
              <tr key={p.id}>
                <td className="font-medium text-sm line-clamp-1 max-w-[200px]">{p.name}</td>
                <td><span className="badge badge-ghost badge-sm">{p.category}</span></td>
                <td><span className={p.stock<=10?'text-error font-bold':''}>{p.stock} {p.stock<=10&&'⚠️'}</span></td>
                <td className="text-primary font-semibold">{formatPrice(p.price)}</td>
                <td><button className="btn btn-ghost btn-xs text-primary">Nhập thêm</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
