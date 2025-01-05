"use client";
import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  name?: string;
  preview?: string;
  imageUrl?: string;
  href: string;
  rating?: number;
}

const AnimeCard = ({ name, preview, imageUrl, href, rating }: AnimeCardProps) => {
  return (
    <div className="card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
     
      {imageUrl ? (
        <div className="w-full h-48 relative">
          <Image
            src={imageUrl}
            alt={name || "Anime Image"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4">
        {/* Anime Title */}
        <h2 className="text-xl font-bold mb-2 truncate">{name || "Unknown Title"}</h2>

        {/* Preview Text (Limited to 2 lines) */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {preview || "No preview available."}
        </p>

       
        {rating !== undefined && (
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">★</span>
            <span className="text-sm text-gray-300">{rating.toFixed(1)}</span>
          </div>
        )}

       
        <Link
          href={href}
          className="inline-block px-4 py-2 bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-300 text-center w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AnimeCard;