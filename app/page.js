import { Play, Plus, Star, Calendar, Clock } from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="h-screen bg-gradient-to-r from-black via-black/50 to-transparent">
        <div className="absolute inset-0 bg-cover bg-center">
          <Image
            src="/chainsaw_man_poster.jpg"
            alt="Chainsaw Man Poster"
            fill
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Content area - Mobile responsive */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-2 font-sen leading-tight">
              Chainsaw Man
            </h1>
            <div className="flex items-center gap-4 mb-4 text-gray-300">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">8.5</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                <span>2022</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>12 episodes</span>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Denji is a young man who becomes a devil-human hybrid after making
              a contract with a chainsaw-wielding devil.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded-full text-white text-base sm:text-lg font-bold transition-colors">
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full text-white text-base sm:text-lg font-bold transition-colors">
                <Plus className="w-5 h-5" />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
