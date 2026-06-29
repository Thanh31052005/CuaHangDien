import React from 'react';
import { useApp } from '../../../contexts/AppContext';
export default function RegisterPage() {
  const { setIsLoginOpen } = useApp();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Đăng ký</h1>
      <button onClick={() => setIsLoginOpen(true)} className="btn btn-primary">Mở form đăng ký</button>
    </div>
  );
}
