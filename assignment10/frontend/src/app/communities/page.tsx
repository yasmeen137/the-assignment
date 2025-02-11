"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUsers, FaSignOutAlt, FaUser, FaChartArea } from "react-icons/fa";
import CommunityCard from "@/components/commuintyCard";
import Image from "next/image";

interface Community {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  photoUrl: string;
}

export default function HomePage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/communities`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Communities:", data);
        setCommunities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden bg-black text-cyan-400 font-orbitron">
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 flex flex-col items-center border-r-2 border-cyan-400/30 relative z-10">
        <h1 className="text-1xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-8 neon-text">
          LEGENDS ARENA
        </h1>

        {/* Navigation */}
        <nav className="space-y-4 w-full">
          {[
            { href: "/profile", icon: <FaUser className="text-cyan-400" />, text: "Profile" },
            { href: "/create_communities", icon: <FaUsers className="text-pink-400" />, text: "Create Communities" },
            { href: "/analytical", icon: <FaChartArea className="text-purple-400" />, text: "Analytical" },
            { href: "/auth/logout", icon: <FaSignOutAlt className="text-red-400" />, text: "Logout" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg 
              hover:bg-gradient-to-r hover:from-cyan-600/30 hover:to-pink-600/30 
              transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/50
              group shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
            >
              {link.icon} 
              <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {link.text}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10 relative z-10">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20 pointer-events-none"></div>

        <div className="bg-gradient-to-r from-cyan-900/30 to-pink-900/30 p-6 rounded-lg 
  border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.3)] 
  min-h-[320px] overflow-visible flex items-center relative mb-10">

  {/* Text Content */}
  <div className="relative z-10 flex-1 pr-8 space-y-6">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 
      bg-clip-text text-transparent leading-tight mb-4">
      Welcome to <span className="neon-text">Legends Arena</span>
    </h1>
    
    <div className="space-y-4">  
      <div className="border-l-4 border-cyan-400/60 pl-4">
      </div>
      
      <ul className="grid grid-cols-2 gap-4 mt-6">
        <li className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
          <span className="text-cyan-300/90">Create and join communities</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
          <span className="text-cyan-300/90">Share and explore strategies</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
          <span className="text-cyan-300/90">Track and compare member</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
          <span className="text-cyan-300/90">enhance your experience</span>
        </li>
      </ul>
    </div>
  </div>

          {/* Image */}
          <div className="relative w-[50%] h-[250px] -mr-0 overflow-visible -translate-y-16 translate-x-28">
       {/* Image - Positioned Like the Characters */}
    <div className="absolute right-0 w-[450px] h-auto flex items-end -translate-y-2">
       <Image
    src="/cyber.png" // New Image
    alt="Cyberpunk Character"
    width={200} // Adjusted to fit better
    height={100} // Adjusted to fit better
    className="object-contain"
    style={{ filter: 'drop-shadow(-10px 10px 20px rgba(255, 0, 255, 0.5))' }}
      />
        </div>
          </div>
        </div>

        {/* Communities Section */}
        <h2 className="text-3xl font-bold mt-8 mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
           COMMUNITIES
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        ) : communities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id.toString()}
                name={community.name}
                description={community.description}
                membersCount={community.membersCount}
                photoUrl={community.photoUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No communities available.</p>
        )}
      </div>
    </div>
  );
}
