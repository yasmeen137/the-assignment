"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableCaption, TableHead } from "../../components/ui/table";
import SearchBar from "../../components/ui/searchBar"; 
import useStore from "../../useStore"; 
import { AnimeCategory } from "@/types/global";  

const CategoryPage = () => {
  const [animeData, setAnimeData] = useState<AnimeCategory[]>([]); 
  const [loading, setLoading] = useState(true);
  const searchQuery = useStore((state) => state.searchQuery); 
  
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?type=ona")
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading anime data...</div>;
  }

  if (animeData.length === 0) {
    return <div>No anime found.</div>;
  }

  const categorizeAnime = (animeData: AnimeCategory[]) => {
    const categories: { [key: string]: AnimeCategory[] } = {};

    animeData.forEach((anime) => {
      anime.genres?.forEach((genre) => {
        if (!categories[genre.name]) {
          categories[genre.name] = [];
        }
        categories[genre.name].push(anime);
      });
    });

    return categories;
  };

  const filteredAnimeData = animeData.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categorizedAnime = categorizeAnime(filteredAnimeData);

  return (
    <div className="p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Anime Categories</h1>
      <SearchBar /> 

      {Object.keys(categorizedAnime).map((category) => {
        const categoryAnime = categorizedAnime[category];

        if (categoryAnime.length === 0) return null;

        return (
          <div key={category} className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">{category}</h3>

            <Table className="bg-gray-800">
              <TableCaption className="text-gray-400">{`Top ${category} Anime`}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Rank</TableHead>
                  <TableHead className="text-gray-400">Title</TableHead>
                  <TableHead className="text-gray-400">Synopsis</TableHead>
                  <TableHead className="text-gray-400">Details</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categoryAnime.map((anime) => (
                  <TableRow key={anime.mal_id} className="bg-gray-700 hover:bg-gray-600">
                    <TableCell className="text-gray-300">{anime.rank}</TableCell>
                    <TableCell className="text-gray-300">{anime.title}</TableCell>
                    <TableCell className="text-gray-300">{anime.synopsis?.slice(0, 100)}...</TableCell>
                    <TableCell className="text-gray-300">
                      <a
                        href={anime.url}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        Read More
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPage;
