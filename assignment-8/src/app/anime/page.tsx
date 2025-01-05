"use client";

import { useState, useEffect } from 'react';
import AnimeCard from '@/components/galay';

const AnimePage = () => {
  interface Anime {
    mal_id: number;
    title: string;
    synopsis: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    score: number;
  }

  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch("/api/anime");
        if (!response.ok) {
          throw new Error("Failed to fetch anime data");
        }
        const data = await response.json();
        // Access the 'data' property from the API response
        setAnimeData(data.data || []);
      } catch (error) {
        console.error("Error fetching anime data:", error);
        setAnimeData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  return (
    <div className="manga-page min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Top Anime</h1>

        {isLoading ? (
          <div className="text-xl mt-4 text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {animeData.map((anime) => (
              <AnimeCard
                key={anime.mal_id} 
                name={anime.title} 
                preview={anime.synopsis} 
                imageUrl={anime.images?.jpg?.image_url} 
                href={`/anime/details/${anime.mal_id}`}
                rating={anime.score} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimePage;
