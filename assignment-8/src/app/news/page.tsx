"use client";
import { useEffect, useState } from "react";
import {AnimeNews} from "@/types/global";
const NewsPage = () => {

    const [newsArticles, setNewsArticles] = useState<AnimeNews[]>([]);  
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/seasons/upcoming")
      .then((response) => response.json())
      .then((data) => {
        setNewsArticles(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 bg-gray-900 text-white">Loading news...</div>;
  }

  if (error) {
    return <div className="p-8 bg-gray-900 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Animes</h1>
      {newsArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newsArticles.map((anime, index) => (
            <div
              key={index}
              className="card bg-gray-800 border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col"
            >
              {anime.images?.jpg?.image_url && ( 
              <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-64 object-cover" />

              )}

              <div className="p-4 flex-grow">
                <h2 className="text-2xl font-bold mb-2 text-center">{anime.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{anime.aired.string}</p>
                <p className="text-gray-300 text-base line-clamp-3 mb-4">{anime.synopsis}</p>
              </div>


              <div className="p-4 mt-auto text-center">
                <a
                  href={anime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 inline-block"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No news available at the moment.</p>
      )}
    </div>
  );
};

export default NewsPage;
