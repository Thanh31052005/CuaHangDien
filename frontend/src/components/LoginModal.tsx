import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)} />
      <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-primary/5 border-b border-base-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-content font-black">E</div>
            <span className="font-black text-lg">Elec<span className="text-primary">Pro</span></span>
          </div>
          <div className="tabs tabs-boxed bg-base-200 p-1 w-full">
            <button
              className={`tab flex-1 font-semibold transition-all ${tab === 'login' ? 'tab-active' : ''}`}
              onClick={() => setTab('login')}
            >
              Đăng nhập
            </button>
            <button
              className={`tab flex-1 font-semibold transition-all ${tab === 'register' ? 'tab-active' : ''}`}
              onClick={() => setTab('register')}
            >
              Đăng ký
            </button>
          </div>
        </div>

        <button onClick={() => setIsLoginOpen(false)} className="btn btn-ghost btn-sm btn-circle absolute right-4 top-4 hover:rotate-90 transition-transform">✕</button>

        <div className="p-6">
          {tab === 'login' ? (
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium">Email hoặc số điện thoại</span></label>
                <input type="text" className="input input-bordered focus:input-primary" placeholder="example@email.com" />
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text font-medium">Mật khẩu</span></label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} className="input input-bordered focus:input-primary w-full pr-12" placeholder="••••••••" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content" onClick={() => setShowPass(v => !v)}>
                    {showPass ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
                <label className="label py-1 justify-end">
                  <a className="label-text-alt link link-primary">Quên mật khẩu?</a>
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-full">Đăng nhập</button>

              <div className="divider text-xs text-base-content/50">hoặc đăng nhập với</div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="btn btn-outline btn-sm gap-2 font-medium">
                  <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Google
                </button>
                <button type="button" className="btn btn-outline btn-sm gap-2 font-medium">
                  <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  Facebook
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Họ</label>
                  <input type="text" className="input input-bordered focus:input-primary" placeholder="Nguyễn" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Tên</label>
                  <input type="text" className="input input-bordered focus:input-primary" placeholder="Văn A" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Số điện thoại</label>
                <input type="tel" className="input input-bordered focus:input-primary" placeholder="09xxxxxxxx" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" className="input input-bordered focus:input-primary" placeholder="example@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Mật khẩu</label>
                <input type="password" className="input input-bordered focus:input-primary" placeholder="Tối thiểu 8 ký tự" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="text-sm text-base-content/70">Tôi đồng ý với <a className="link link-primary">Điều khoản dịch vụ</a></span>
              </label>
              <button type="submit" className="btn btn-primary w-full">Tạo tài khoản</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
