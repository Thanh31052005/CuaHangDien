import React from 'react';
import type { ReactNode } from 'react';
import { useApp } from '../contexts/AppContext';
import { ROUTES } from '../constants';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isAdmin, navigate } = useApp();

  if (!isAuthenticated || !isAdmin) {
    navigate(ROUTES.HOME);
    return null;
  }

  return <>{children}</>;
}
