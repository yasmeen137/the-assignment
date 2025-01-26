"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function LogoutPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setMessage(data.message);
            router.push("/auth");
        } catch (err) {
            console.error(err);
            setError("Failed to log out. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200 text-white">
            <div className="max-w-md w-full bg-white text-gray-800 p-8 rounded-2xl shadow-xl transform transition-all hover:scale-105">
                <h1 className="text-3xl font-extrabold text-center mb-6">Logout</h1>
                <p className="text-center text-gray-600 mb-4">
                    Are you sure you want to log out? You will need to sign in again to access your account.
                </p>
                <button
                    onClick={handleLogout}
                    className={`w-full py-3 rounded-lg font-semibold text-white ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Logging out..." : "Log Out"}
                </button>
                {message && (
                    <p className="mt-4 text-center text-sm text-green-600 font-medium">{message}</p>
                )}
                {error && (
                    <p className="mt-4 text-center text-sm text-red-600 font-medium">{error}</p>
                )}
            </div>
        </div>
    );
}

export default LogoutPage;