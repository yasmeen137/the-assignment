'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, roles }: {
  children: React.ReactNode;
  roles?: string[];
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (roles && !roles.includes(user.role)) {
      router.push('/');
    }
  }, [user, roles, router]);

  return <>{children}</>;
}