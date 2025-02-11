"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";



interface User {
  username: string;
  email: string;
  role: string;
}

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found!");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Profile fetch error:", error));
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });
    setUser({ ...user, ...form, role: user?.role || "" });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
        method: "DELETE",
        credentials: "include",
      });
      localStorage.removeItem("userId");
      router.push("/login");
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-cyan-400 overflow-hidden">


      {/* Profile Container */}
      <div className="relative z-10 p-8 max-w-lg w-full bg-gray-900/80 backdrop-blur-sm rounded-xl 
        border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-pink-400 
          bg-clip-text text-transparent">
          User Profile
        </h2>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-4">
              <input
                className="w-full p-3 bg-gray-800 border-2 border-cyan-400/30 rounded-lg text-cyan-300 
                  placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <input
                className="w-full p-3 bg-gray-800 border-2 border-cyan-400/30 rounded-lg text-cyan-300 
                  placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="flex space-x-4">
              <button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 
                  text-white font-semibold p-3 rounded-lg transition-all duration-300 
                  shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]">
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="flex-1 bg-gray-800 border-2 border-cyan-400/30 hover:border-cyan-400/50 
                  text-cyan-300 font-semibold p-3 rounded-lg transition-all duration-300">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg border-2 border-cyan-400/30">
                <p className="text-cyan-300"><span className="font-semibold">Username:</span> {user.username}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border-2 border-cyan-400/30">
                <p className="text-cyan-300"><span className="font-semibold">Email:</span> {user.email}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border-2 border-cyan-400/30">
                <p className="text-cyan-300"><span className="font-semibold">Role:</span> {user.role}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => setIsEditing(true)} 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 
                  text-white font-semibold p-3 rounded-lg transition-all duration-300 
                  shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]">
                Edit Profile
              </button>
              <button 
                onClick={handleDelete} 
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 
                  text-white font-semibold p-3 rounded-lg transition-all duration-300 
                  shadow-[0_0_15px_rgba(244,114,182,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}