"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

interface Comment {
  id: number;
  content: string;
}

interface Thread {
  id: number;
  title: string;
  content: string;
}

export default function ThreadDetails() {
  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const threadId = params?.id;

  useEffect(() => {
    if (!threadId) {
      console.error("⚠️ threadId is undefined! Check your route structure.");
      return;
    }

    console.log(" Fetching thread with ID:", threadId);

    const fetchThread = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/threads/${threadId}`;

        console.log(" API URL:", url);

        const response = await fetch(url, {
          credentials: "include",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Failed to fetch thread details");
        }

        const data: Thread = await response.json();
        console.log("API Response:", data);
        setThread(data);
      } catch (err: any) {
        console.error(" Error fetching thread details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/threads/${threadId}/comments`;
        console.log("Fetching comments from:", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();
        setComments(data);
      } catch (err: any) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchThread();
    fetchComments();
  }, [threadId]);

  const postComment = async () => {
    if (!newComment.trim()) return;

    setCommentLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/threads/${threadId}/comments`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newCommentData = await response.json();
      setComments((prev) => [newCommentData, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-cyan-400 font-orbitron p-8 z-20">
      <header className="w-full max-w-6xl mx-auto p-4 flex items-center justify-between bg-gray-900/80 backdrop-blur-md border-2 border-cyan-400/30 shadow-md rounded-lg">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 shadow-md"
        >
          <FaArrowLeft className="text-lg" />
          <span>Back</span>
        </button>
      </header>

      {loading && <p className="text-cyan-300 text-center mt-10">Loading thread...</p>}
      {error && <p className="text-red-400 text-center mt-10">{error}</p>}

      {thread && !loading && !error && (
        <main className="w-full max-w-6xl mx-auto flex flex-col mt-6 p-6 bg-gray-900/80 rounded-lg border-2 border-cyan-400/30 shadow-lg">
          <h2 className="text-3xl font-bold text-cyan-300">{thread.title}</h2>

          {/* Preserve content formatting */}
          <p className="text-cyan-300/90 mt-4 whitespace-pre-wrap">{thread.content}</p>

          {/* Comment Input */}
          <div className="w-full max-w-6xl mx-auto mt-6 p-4 bg-gray-800/50 rounded-lg border-2 border-cyan-400/20">
            <textarea
              placeholder="Write a comment..."
              className="w-full p-3 bg-gray-900 text-cyan-300 rounded-lg border-2 border-cyan-400/30 focus:border-cyan-400 focus:ring-0"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={postComment}
              className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 shadow-md mt-3"
              disabled={commentLoading}
            >
              {commentLoading ? "Posting..." : <><FaPaperPlane className="text-lg" /><span className="ml-2">Post Comment</span></>}
            </button>
          </div>

          {/* Display Comments */}
          <h3 className="text-2xl font-semibold text-cyan-300 mt-6">Comments</h3>
          <ul className="space-y-4 mt-2">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li
                  key={comment.id}
                  className="text-cyan-300/80 bg-gray-800 p-4 rounded-lg border border-cyan-400/20"
                >
                  {comment.content}
                </li>
              ))
            ) : (
              <p className="text-cyan-400/70 italic">No comments yet.</p>
            )}
          </ul>
        </main>
      )}
    </div>
  );
}