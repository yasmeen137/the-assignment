
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from './../hooks/useAuthStore'  

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/auth') {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  
  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
