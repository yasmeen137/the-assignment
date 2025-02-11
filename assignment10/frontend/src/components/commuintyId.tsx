"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Community {
  id: number;
  name: string;
  describe: string;
  membersCount: number;
}

interface Thread {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
}

interface CommunityDetailsProps {
  community: Community;
  onBack: () => void;
}

export default function CommunityDetails({ community, onBack }: CommunityDetailsProps) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [showCreateThread, setShowCreateThread] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/communities/${community.id}/threads`, {
      credentials: "include",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(errorMessage || "Failed to fetch threads");
        }
        return res.json();
      })
      .then((data) => setThreads(data))
      .catch((err) => console.error("Failed to fetch threads:", err));
  }, [community.id]);

  const createThread = async () => {
    if (!newThreadTitle || !newThreadContent) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found! User needs to be logged in.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/communities/${community.id}/threads`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newThreadTitle, content: newThreadContent }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to create thread");
      }

      const newThread = await response.json();
      setThreads([...threads, newThread]);
      setNewThreadTitle("");
      setNewThreadContent("");
      setShowCreateThread(false);
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-cyan-400 font-orbitron p-8 z-20">
      <header className="w-full max-w-6xl mx-auto p-4 flex items-center justify-between bg-gray-900/80 backdrop-blur-md border-2 border-cyan-400/30 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent capitalize">
          {community.name} Community
        </h2>
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 shadow-md"
        >
          <FaArrowLeft className="text-lg" />
          <span>Back</span>
        </button>
      </header>

      <main className="w-full max-w-6xl mx-auto flex flex-col md:flex-row mt-6 gap-6">
        <aside className="w-full md:w-1/4 bg-gray-900/80 p-6 rounded-xl border-2 border-cyan-400/30 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-cyan-300">Members</h3>
            <p className="text-2xl font-bold text-pink-400 border-2 border-cyan-400/30 rounded-lg p-2">
              {community.membersCount}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-cyan-300">Description</h3>
            <p className="text-cyan-300/80">{community.describe}</p>
          </div>
        </aside>

        <section className="w-full md:w-3/4 space-y-6">
          <button
            onClick={() => setShowCreateThread(!showCreateThread)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 shadow-md"
          >
            <FaPlus className="text-lg" />
            <span>Create Thread</span>
          </button>

          {showCreateThread && (
            <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-cyan-400/20 space-y-4">
              <input
                type="text"
                placeholder="Thread Title"
                className="w-full p-3 bg-gray-900 text-cyan-300 rounded-lg border-2 border-cyan-400/30 focus:border-cyan-400 focus:ring-0"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
              />
              <textarea
                placeholder="Thread Content"
                className="w-full p-3 bg-gray-900 text-cyan-300 rounded-lg border-2 border-cyan-400/30 focus:border-cyan-400 focus:ring-0"
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
              ></textarea>
              <button
                onClick={createThread}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-pink-700 transition-all duration-300 shadow-md"
              >
                Post Thread
              </button>
            </div>
          )}

          {/* Threads Table */}
          <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Active Threads</h3>

          {/* ✅ Fixed JSX structure */}
          <div className="relative overflow-hidden rounded-xl border-2 border-cyan-400/20 bg-gradient-to-br from-gray-900/50 to-cyan-900/20">
            <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20 pointer-events-none" />
            
            <Table className="backdrop-blur-sm">
              <TableHeader>
                <TableRow className="border-b-2 border-cyan-400/30 hover:bg-transparent">
                  <TableHead className="text-cyan-300 text-lg font-bold py-4 bg-gradient-to-r from-cyan-400/30 to-transparent">
                    <span className="flex items-center">
                      <span className="mr-2"></span>
                      Thread Title
                    </span>
                  </TableHead>
                  <TableHead className="text-cyan-300 text-lg font-bold py-4 bg-gradient-to-r from-pink-400/30 to-transparent text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-cyan-400/20">
                {threads.map((thread) => (
                  <TableRow key={thread.id} className="group hover:bg-cyan-900/10 transition-all duration-300">
                    <TableCell className="py-4">{thread.title}</TableCell>
                    <TableCell className="py-4 text-right">
                      <Link href={`/threads/${thread.id}`} className="px-4 py-2 bg-cyan-500 text-white rounded-lg">Explore</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}