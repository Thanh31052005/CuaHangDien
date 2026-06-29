import React from 'react';
import type { ReactNode } from 'react';
import { useApp } from '../contexts/AppContext';
import { ROUTES } from '../constants';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, setIsLoginOpen, navigate } = useApp();

  if (!isAuthenticated) {
    // If not authenticated, open login modal and redirect to home
    setIsLoginOpen(true);
    navigate(ROUTES.HOME);
    return null;
  }

  return <>{children}</>;
}
