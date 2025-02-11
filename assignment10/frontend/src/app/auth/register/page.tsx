'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await register(username, email, password);
      router.push('/auth/login'); 
    } catch {
      setError('Registration failed. Please check your details and try again.');
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

      {/* Register Card */}
      <div className="relative z-10 max-w-md w-full bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl 
        border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 
          bg-clip-text text-transparent">
          Create an Account
        </h1>

        {error && (
          <div className="mb-4 p-3 text-center bg-red-500/20 border border-red-400 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-800 border-2 border-cyan-400/30 rounded-lg text-cyan-300 
              placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 border-2 border-cyan-400/30 rounded-lg text-cyan-300 
              placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 border-2 border-cyan-400/30 rounded-lg text-cyan-300 
              placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
            required
            minLength={6}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 
              text-white font-semibold p-3 rounded-lg transition-all duration-300 
              shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-cyan-300/80">
          Already have an account?{' '}
          <Link 
            href="/auth/login" 
            className="text-pink-400 hover:text-pink-300 underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}