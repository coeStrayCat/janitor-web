'use client';

import React from 'react';
import { useRequireAuth, useGuestOnly } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  if (requireAuth) {
    const { isAuthenticated } = useRequireAuth();
    
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      );
    }
  } else {
    useGuestOnly();
  }

  return <>{children}</>;
};

export default ProtectedRoute;
