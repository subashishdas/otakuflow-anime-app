import Image from "next/image";
import { User, ExternalLink } from "lucide-react";

const StaffCard = ({ staff }) => {
  const imageUrl = staff.person?.images?.jpg?.image_url;
  const name = staff.person?.name || "Unknown Staff";
  const positions = staff.positions || [];
  const url = staff.person?.url;

  // Get primary position or first position
  const primaryPosition = positions[0] || "Unknown Position";
  const additionalPositions = positions.length > 1 ? positions.length - 1 : 0;

  const getPositionColor = (position) => {
    const pos = position?.toLowerCase();
    switch (pos) {
      case "director":
        return "bg-purple-600";
      case "producer":
        return "bg-blue-600";
      case "character design":
      case "character designer":
        return "bg-green-600";
      case "music":
      case "composer":
        return "bg-yellow-600";
      case "animation director":
        return "bg-red-600";
      case "sound director":
        return "bg-orange-600";
      case "script":
      case "screenplay":
        return "bg-indigo-600";
      case "original creator":
        return "bg-rose-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Image container with text overlay */}
      <div className="relative h-48 sm:h-56 md:h-64">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Placeholder when no image
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <User className="w-16 h-16 text-gray-600" />
          </div>
        )}

        {/* External link overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:bg-black/50 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ExternalLink className="w-8 h-8 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Position badge */}
        <div
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${getPositionColor(
            primaryPosition
          )}`}
        >
          {primaryPosition}
        </div>

        {/* Additional positions badge */}
        {additionalPositions > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
            +{additionalPositions} more
          </div>
        )}

        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4">
          <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 mb-1">
            {name}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm">
            {primaryPosition}
            {additionalPositions > 0 && (
              <span className="opacity-70">
                {" "}
                • +{additionalPositions} roles
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
