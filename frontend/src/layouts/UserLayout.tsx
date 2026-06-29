import React from 'react';
import type { ReactNode } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import CartDrawer from '../components/shared/CartDrawer';
import LoginModal from '../components/shared/LoginModal';

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <LoginModal />
    </div>
  );
}
