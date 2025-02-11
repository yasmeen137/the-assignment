"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommunityDetails from "@/components/commuintyId";

interface Community {
    id: number;
    name: string;
    describe: string;
    membersCount: number;
}

export default function CommunityPage() {
    const { id } = useParams();
    const router = useRouter();

    const [community, setCommunity] = useState<Community | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || id === "undefined") {
            setError("Community ID is missing.");
            setLoading(false);
            return;
        }

        async function fetchCommunity() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/communities/${id}`);
                if (!response.ok) {
                    throw new Error("Community not found");
                }
                const data: Community = await response.json();
                setCommunity(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchCommunity();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) {
        return (
            <div className="text-center mt-6">
                <p className="text-red-500">Error: {error}</p>
                <button 
                    onClick={() => router.back()} 
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    Go Back
                </button>
            </div>
        );
    }
    if (!community) return <p className="text-center text-gray-500">Community not found</p>;

    return <CommunityDetails community={community} onBack={() => router.back()} />;
}