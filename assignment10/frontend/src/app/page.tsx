"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [glitchText, setGlitchText] = useState("GIVE-UP");
  const [particles, setParticles] = useState<{ left: string; top: string; animationDuration: string; }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText((prev) =>
        prev === "GIVE-UP" ? "G1V3-UP" : "GIVE-UP"
      );
    }, 600);

    const newParticles = [...Array(15)].map(() => ({
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDuration: `${Math.random() * 5 + 2}s`,
    }));
    setParticles(newParticles);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center font-orbitron">
    <img 
  src="/image/cat.png" 
  alt="Cat" 
  className="absolute inset-0 w-full h-full object-cover" 
/>
      
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.08)_5%,transparent_70%)] z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center text-white px-6">
      <h1 className="text-xl md:text-6xl font-extrabold uppercase tracking-widest drop-shadow-xl glitch">
  Legends Never <span className="text-cyan-400 font-extrabold glitch-text">{glitchText}</span>
        </h1>
        <p className="mt-5 text-lg md:text-2xl text-gray-300 max-w-2xl drop-shadow-md">
          Discuss your strategies with players from all over the world!
        </p>
        
        <div className="mt-8 flex space-x-8">
          <Link href="/auth/login" className="px-10 py-4 bg-cyan-500 neon-button text-white rounded-lg">
            Login
          </Link>
          <Link href="/auth/register" className="px-10 py-4 bg-pink-500 neon-button text-white rounded-lg">
            Register
          </Link>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none animate-pulse">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-80 animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        
        @keyframes glitch {
          0% { transform: skew(0deg); }
          25% { transform: skew(-5deg) translateX(-2px); }
          50% { transform: skew(5deg) translateX(2px); }
          75% { transform: skew(-2deg) translateX(-1px); }
          100% { transform: skew(0deg); }
        }
        .glitch { animation: glitch 1s infinite alternate; }
        .glitch-text { text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff, 3px 3px #00ff99; }
        
        .neon-button {
          font-size: 1.2rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.9);
          transition: all 0.3s ease-in-out;
        }
        .neon-button:hover {
          box-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(255, 0, 255, 1);
        }

        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.9; }
          50% { transform: translateY(-8px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.9; }
        }
        .animate-float { animation: float 4s infinite ease-in-out; }
      `}</style>
    </div>
  );
}
