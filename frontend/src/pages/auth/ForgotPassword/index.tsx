import React from 'react';
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md border border-base-200">
        <h1 className="text-2xl font-black mb-2">Quên mật khẩu</h1>
        <p className="text-base-content/70 mb-6 text-sm">Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>
        <div className="form-control gap-2 mb-4">
          <label className="text-sm font-medium">Email</label>
          <input type="email" placeholder="example@email.com" className="input input-bordered focus:input-primary" />
        </div>
        <button className="btn btn-primary w-full">Gửi liên kết</button>
      </div>
    </div>
  );
}
