'use client';

import { useAuth } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); 
      router.push('/communities'); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black text-cyan-400">
      {/* Video Background */}
      <img 
  src="/image/cat.png" 
  alt="Cat" 
  className="absolute inset-0 w-full h-full object-cover" 
/>
      
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> 

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl 
        border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 
          bg-clip-text text-transparent">
          Login
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 border-2 border-cyan-400/30 rounded-lg text-cyan-300 
                placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border-2 border-cyan-400/30 rounded-lg text-cyan-300 
                placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 
              text-white font-semibold p-3 rounded-lg transition-all duration-300 
              shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-cyan-300/80">
          Don&apos;t have an account?{' '}
          <button 
            onClick={() => router.push('/auth/register')} 
            className="text-pink-400 hover:text-pink-300 underline"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}