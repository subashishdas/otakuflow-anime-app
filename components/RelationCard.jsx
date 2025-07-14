import Image from "next/image";
import { ExternalLink, Book, Tv, Film } from "lucide-react";
import Link from "next/link";

const RelationCard = ({ anime }) => {
  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "manga":
        return <Book className="w-5 h-5" />;
      case "anime":
        return <Tv className="w-5 h-5" />;
      case "movie":
        return <Film className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <Link href={`/anime/${anime.mal_id}`} className="block">
      <div className="relative rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer">
        {/* Poster Image */}
        <div className="relative h-48 sm:h-56 md:h-64 w-full">
          <Image
            src={anime.images?.jpg?.image_url || "/fallback.jpg"}
            alt={anime.title || "Unknown Anime"}
            fill
            className="object-cover"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300 flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
          </div>

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
            <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 mb-1">
              {anime.title || "Unknown Title"}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm capitalize flex items-center gap-1">
              {getTypeIcon(anime.type)} {anime.type || "Unknown Type"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelationCard;
