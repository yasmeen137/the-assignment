"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

interface CommunityAnalytics {
  id: number;
  name: string;
  _count: { members: number };
}

export default function CommunityAnalyticsPage() {
  const [communities, setCommunities] = useState<CommunityAnalytics[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/communities/analytics/member-counts`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP Error ${response.status}: ${errorMessage}`);
        }

        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-orbitron p-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
        Analytics
      </h1>

      {/* Table Container */}
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-xl border-2 border-cyan-400/20 bg-gradient-to-br from-gray-900/50 to-cyan-900/20">
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20 pointer-events-none" />

        <Table className="backdrop-blur-sm">
          <TableHeader>
            <TableRow className="border-b-2 border-cyan-400/30 hover:bg-transparent">
              <TableHead className="text-cyan-300 text-lg font-bold py-4 bg-gradient-to-r from-cyan-400/30 to-transparent">
                <span className="flex items-center">
                  <span className="mr-2"></span>
                  Community Name
                </span>
              </TableHead>
              <TableHead className="text-cyan-300 text-lg font-bold py-4 bg-gradient-to-r from-pink-400/30 to-transparent text-right">
                Members
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-cyan-400/20">
            {communities.map((community) => (
              <TableRow
                key={community.id}
                className="group hover:bg-cyan-900/10 transition-all duration-300"
              >
                <TableCell className="py-4 text-cyan-300/90 font-medium">
                  {community.name}
                </TableCell>
                <TableCell className="py-4 text-pink-400 font-semibold text-right">
                  {community._count.members}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}