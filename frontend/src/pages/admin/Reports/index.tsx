import React from 'react';
export default function AdminReportsPage() {
  const monthly = [42,35,58,47,63,71,55,80,68,90,75,88];
  const max = Math.max(...monthly);
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black">Báo cáo doanh thu</h1>
      <div className="bg-base-100 rounded-xl border border-base-200 p-6">
        <h2 className="font-bold mb-6">Doanh thu theo tháng (triệu đồng)</h2>
        <div className="flex items-end gap-3 h-40">
          {monthly.map((v,i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-semibold text-primary">{v}M</span>
              <div className="w-full bg-primary/20 rounded-t-md relative" style={{height: (v/max*100)+'%', minHeight:'8px'}}>
                <div className="absolute inset-0 bg-primary rounded-t-md opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs text-base-content/50">T{i+1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[{label:'Tổng doanh thu năm',value:'752.000.000đ'},{label:'Đơn hàng hoàn thành',value:'1.248'},{label:'Khách hàng mới',value:'356'},{label:'Tỉ lệ huỷ đơn',value:'2.3%'}].map(s=>(
          <div key={s.label} className="bg-base-100 rounded-xl border border-base-200 p-5">
            <p className="text-2xl font-black text-primary">{s.value}</p>
            <p className="text-sm text-base-content/60 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
