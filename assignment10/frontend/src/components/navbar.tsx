'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            Gamers Hub
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/profile" className="text-gray-600 hover:text-primary">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary">
                  Login
                </Link>
                <Link href="/register" className="text-gray-600 hover:text-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}