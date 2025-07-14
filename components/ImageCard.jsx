import Image from "next/image";
import React from "react";

const ImageCard = ({ character }) => {
  // Extract character data
  const characterImage = character.character?.images?.jpg?.image_url;
  const characterName = character.character?.name || "Unknown Character";
  const characterRole = character.role || "Unknown Role";

  // Get Japanese voice actor (first one with Japanese language)
  const voiceActor =
    character.voice_actors?.find((va) => va.language === "Japanese") ||
    character.voice_actors?.[0];
  const voiceArtistImage = voiceActor?.person?.images?.jpg?.image_url;
  const voiceArtistName = voiceActor?.person?.name || "Unknown VA";
  const voiceArtistLanguage = voiceActor?.language || "Unknown Language";

  return (
    <div className="rounded-lg overflow-hidden group cursor-pointer">
      <div className="relative h-48 sm:h-56 md:h-64">
        {/* Character Image - visible by default */}
        {characterImage && (
          <Image
            src={characterImage}
            alt={characterName}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
        )}

        {/* Voice Artist Image - visible on hover */}
        {voiceArtistImage && (
          <Image
            src={voiceArtistImage}
            alt={voiceArtistName}
            fill
            className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        )}

        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4">
          {/* Character Info - visible by default */}
          <div className="transition-opacity duration-300 group-hover:opacity-0">
            <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 mb-1">
              {characterName}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">
              {characterRole}
            </p>
          </div>

          {/* Voice Artist Info - visible on hover */}
          <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 mb-1">
              {voiceArtistName}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">
              Voice Actor ({voiceArtistLanguage})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
