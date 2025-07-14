import Image from "next/image";
import { Play } from "lucide-react";

const AnimeCard = ({ anime }) => {
  const imageUrl =
    anime?.images?.jpg?.image_url || anime?.images?.jpg?.large_image_url;
  const title = anime?.title_english || anime?.title || "Unknown Title";
  const year = anime?.year || "N/A";
  const score = anime?.score || "N/A";
  const genres =
    anime?.genres
      ?.slice(0, 2)
      .map((genre) => genre.name)
      .join(", ") || "Unknown";

  return (
    <div className="rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Image container with text overlay */}
      <div className="relative h-48 sm:h-56 md:h-64">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:bg-black/50 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="w-8 h-8 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4">
          <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm">
            {year} • {genres}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
