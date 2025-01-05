"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { AnimeResponse } from "@/types/global";

const AnimeDetailsPage = () => {
  const params = useParams(); 
  const id = params?.id; 
  const [anime, setAnime] = useState<AnimeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const data = await response.json();
        setAnime(data.data); 
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setError("Failed to load anime details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAnimeDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Anime not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{anime.title}</h1>

        <div className="flex flex-col md:flex-row gap-8">
        
          <div className="flex-shrink-0">
            <Image
              src={anime.images?.jpg?.image_url || "/placeholder-image.jpg"}
              alt={anime.title}
              width={300}
              height={450}
              className="rounded-lg"
            />
          </div>

          
          <div className="flex-grow">
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Synopsis:</strong>{" "}
                <span className="text-gray-300">
                  {anime.synopsis || "No synopsis available."}
                </span>
              </p>
              <p className="text-lg">
                <strong>Score:</strong>{" "}
                <span className="text-gray-300">{anime.score || "N/A"}</span>
              </p>
              <p className="text-lg">
                <strong>Episodes:</strong>{" "}
                <span className="text-gray-300">{anime.episodes || "N/A"}</span>
              </p>
              <p className="text-lg">
                <strong>Status:</strong>{" "}
                <span className="text-gray-300">{anime.status || "N/A"}</span>
              </p>
              <p className="text-lg">
                <strong>Genres:</strong>{" "}
                <span className="text-gray-300">
                  {anime.genres?.map((genre) => genre.name).join(", ") || "N/A"}
                </span>
              </p>
              <p className="text-lg">
                <strong>Studios:</strong>{" "}
                <span className="text-gray-300">
                  {anime.studios?.map((studio) => studio.name).join(", ") || "N/A"}
                </span>
              </p>
              <p className="text-lg">
                <strong>Duration:</strong>{" "}
                <span className="text-gray-300">{anime.duration || "N/A"}</span>
              </p>
              <p className="text-lg">
                <strong>Rating:</strong>{" "}
                <span className="text-gray-300">{anime.rating || "N/A"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
