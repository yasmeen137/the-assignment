"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";




export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        router.push("/"); 
      } catch (error) {
        console.error("❌ Logout failed:", error);
      }
    };

    handleLogout();
  }, [logout, router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-cyan-400 font-orbitron">
      {/* Logout Message */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          Logging Out...
        </h1>
        <p className="mt-4 text-lg text-cyan-300/80">
          Redirecting to the main page
        </p>
      </div>
    </div>
  );
}