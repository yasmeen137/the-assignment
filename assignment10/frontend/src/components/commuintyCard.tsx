/* eslint-disable @next/next/no-img-element */

"use client";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface CommunityCardProps {
  name: string;
  description: string;
  membersCount: number;
  photoUrl?: string;
  id: string;
}

export default function CommunityCard({ name, membersCount, photoUrl, id }: CommunityCardProps) {
  const fullPhotoUrl = photoUrl ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${photoUrl}` : null;

  return (
    <Card className="relative group bg-gray-900/80 backdrop-blur-sm border-1 border-cyan-400/30 rounded-xl 
      shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] 
      transition-all duration-300 hover:border-cyan-400/50 h-80 flex flex-col justify-between">
      
      {/* Image Section */}
      {fullPhotoUrl && (
        <div className="relative h-40 overflow-hidden rounded-t-xl">
          <img
            src={fullPhotoUrl}
            alt="Community"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>
      )}

      {/* Content Section */}
      <CardContent className="px-4 py-3 flex-grow flex flex-col justify-between">
        <div className="text-center">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 
            bg-clip-text text-transparent">
            {name}
          </CardTitle>
          <p className="text-sm text-cyan-300/80 mt-1">{membersCount} Members</p>
        </div>

        {/* Join Button Inside Card */}
        <div className="mt-4">
          <Link href={`/community/${id}`}>
            <Button
              className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 
              text-white font-semibold p-3 rounded-lg transition-all duration-300 
              shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]"
            >
              Join the Community
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}