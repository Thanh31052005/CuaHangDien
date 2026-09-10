import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { authService } from '../../services/auth';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, login } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ fullName: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoginOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login(loginForm);
      if (res.token) {
        localStorage.setItem('access_token', res.token);
        login({ name: res.fullName || res.username, email: res.email, role: res.role as 'user' | 'admin' });
        setIsLoginOpen(false);
      }
    } catch (err: any) {
      setError(err.response?.data || err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.register(registerForm);
      // Automatically log in or switch to login tab
      setTab('login');
      setLoginForm({ username: registerForm.username, password: registerForm.password });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
    } catch (err: any) {
      setError(err.response?.data || err.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)} />
      <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-primary/5 border-b border-base-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-content font-black">E</div>
            <span className="font-black text-lg">Elec<span className="text-primary">Pro</span></span>
          </div>
          <div className="flex bg-base-200 p-1 rounded-xl w-full">
            <button className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === 'login' ? 'bg-base-100 shadow-sm text-primary' : 'text-base-content/60 hover:text-base-content'}`} onClick={() => setTab('login')}>
              Đăng nhập
            </button>
            <button className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === 'register' ? 'bg-base-100 shadow-sm text-primary' : 'text-base-content/60 hover:text-base-content'}`} onClick={() => setTab('register')}>
              Đăng ký
            </button>
          </div>
        </div>

        <button onClick={() => setIsLoginOpen(false)} className="btn btn-ghost btn-sm btn-circle absolute right-4 top-4 hover:rotate-90 transition-transform">✕</button>

        <div className="p-6">
          {error && <div className="alert alert-error text-sm mb-4 p-2">{error}</div>}
          
          {tab === 'login' ? (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tên đăng nhập</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="input input-bordered focus:input-primary w-full" 
                    placeholder="Tên đăng nhập" 
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Mật khẩu</label>
                <div className="relative">
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    className="input input-bordered focus:input-primary w-full pr-12" 
                    placeholder="••••••••" 
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content" onClick={() => setShowPass(v => !v)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPass ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Đăng nhập'}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Họ và tên</label>
                <input 
                  type="text" 
                  className="input input-bordered focus:input-primary" 
                  placeholder="Nguyễn Văn A" 
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tên đăng nhập</label>
                <input 
                  type="text" 
                  className="input input-bordered focus:input-primary" 
                  placeholder="Tên đăng nhập" 
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  className="input input-bordered focus:input-primary" 
                  placeholder="example@email.com" 
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Mật khẩu</label>
                <input 
                  type="password" 
                  className="input input-bordered focus:input-primary" 
                  placeholder="Tối thiểu 8 ký tự" 
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Tạo tài khoản'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
