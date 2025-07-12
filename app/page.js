"use client";
import AnimeCard from "@/components/AnimeCard";
import FeatureCard from "@/components/FeatureCard";
import {
  getPopularAnime,
  getSpecialForYou,
  getTrendingAnime,
} from "@/lib/jikanApi";
import { Play, Plus, Star, Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function page() {
  const pathname = usePathname();

  const [specialForYouAnime, setSpecialForYouAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data when we're on the home page
    if (pathname !== "/") return;

    const fetchAllAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        // Add delays between API calls to respect rate limits
        const specialForYou = await getSpecialForYou(6);

        // Wait 1 second before next call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const trendingAnime = await getTrendingAnime(6);

        // Wait 1 second before next call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const popularAnime = await getPopularAnime(18);

        console.log("specialForYou", specialForYou);
        console.log("trendingAnime", trendingAnime);
        console.log("popularAnime", popularAnime);

        setSpecialForYouAnime(specialForYou);
        setTrendingAnime(trendingAnime);
        setPopularAnime(popularAnime);
      } catch (err) {
        console.error("Failed to fetch anime:", err);
        setError("Failed to load anime");
        setSpecialForYouAnime([]);
        setTrendingAnime([]);
        setPopularAnime([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnime();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black text-white font-sen">
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

      {/* Special For You Section */}
      <div className="bg-black/10 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold  text-white">
              Special For You
            </h2>

            <button className=" text-white text-xs md:text-lg transition-colors flex items-center gap-1 hover:text-rose-600 cursor-pointer">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : specialForYouAnime.length > 0 ? (
              specialForYouAnime.map((anime, index) => (
                <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
              ))
            ) : (
              <p className="text-gray-400">No anime found</p>
            )}
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-black/10 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Featured Collections
          </h2>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch">
            <FeatureCard
              title="The Best Mystical Anime"
              images={[
                "/jujutsu_kaisen.jpg",
                "/jujutsu_kaisen.jpg",
                "/jujutsu_kaisen.jpg",
              ]}
            />
            <FeatureCard
              title="The Best Action Anime"
              images={[
                "/chainsaw_man_poster.jpg",
                "/chainsaw_man_poster.jpg",
                "/chainsaw_man_poster.jpg",
              ]}
            />
            <FeatureCard
              title="The Best Comedy Anime"
              images={[
                "/chainsaw_man_poster.jpg",
                "/chainsaw_man_poster.jpg",
                "/chainsaw_man_poster.jpg",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold  text-white">
              Trending Now
            </h2>

            <button className=" text-white text-xs md:text-lg transition-colors flex items-center gap-1 hover:text-rose-600 cursor-pointer">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : trendingAnime.length > 0 ? (
              trendingAnime.map((anime, index) => (
                <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
              ))
            ) : (
              <p className="text-gray-400">No anime found</p>
            )}
          </div>
        </div>
      </div>

      {/* Popular Section */}
      <div className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold  text-white">
              Popular Now
            </h2>

            <button className=" text-white text-xs md:text-lg transition-colors flex items-center gap-1 hover:text-rose-600 cursor-pointer">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : popularAnime.length > 0 ? (
              popularAnime.map((anime, index) => (
                <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
              ))
            ) : (
              <p className="text-gray-400">No anime found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
