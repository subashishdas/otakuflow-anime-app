"use client";
import { Bookmark, Check, Eye, PlayIcon, Plus, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";
import {
  getAnimeCharacters,
  getAnimeDetails,
  getSpecialForYou,
  getAnimeRelations,
  getStaffDetails,
} from "@/lib/jikanApi";
import { useParams } from "next/navigation";
import ImageCard from "@/components/ImageCard";
import RelationCard from "@/components/RelationCard";
import StaffCard from "@/components/StaffCard";

const AnimeDetailsPage = () => {
  const params = useParams();
  const animeId = params?.id;

  const [animeDetails, setAnimeDetails] = useState(null);
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [animeRelations, setAnimeRelations] = useState([]);
  const [animeStaff, setAnimeStaff] = useState([]);
  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [showAllStaff, setShowAllStaff] = useState(false);

  const [specialForYouAnime, setSpecialForYouAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [watchStatus, setWatchStatus] = useState("To Watch");
  const tabs = ["Overview", "Relations", "Characters", "Staff", "Reviews"];
  const watchStatusOptions = ["Watching", "To Watch", "Watched"];

  const handleWatchStatusChange = (status) => {
    setWatchStatus(status);
  };

  const visibleCharacters = showAllCharacters
    ? animeCharacters
    : animeCharacters.slice(0, 12);

  const visibleStaff = showAllStaff ? animeStaff : animeStaff.slice(0, 12);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAnimeDetails(animeId);
        const specialForYou = await getSpecialForYou(6);
        setAnimeDetails(data);
        setSpecialForYouAnime(specialForYou);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (animeId) fetchDetails();
  }, [animeId]);

  useEffect(() => {
    if (activeTab === "Characters" && animeCharacters.length === 0) {
      const fetchCharacters = async () => {
        try {
          const characters = await getAnimeCharacters(animeId);
          setAnimeCharacters(characters);
        } catch (err) {
          console.error("Failed to fetch characters", err);
        }
      };
      fetchCharacters();
    }
  }, [activeTab, animeId]);

  useEffect(() => {
    if (activeTab === "Relations" && animeRelations.length === 0) {
      const fetchRelations = async () => {
        try {
          const relations = await getAnimeRelations(animeId);
          console.log(relations);
          setAnimeRelations(relations);
        } catch (err) {
          console.error("Failed to fetch relations", err);
        }
      };
      fetchRelations();
    }
  }, [activeTab, animeId]);

  useEffect(() => {
    if (activeTab === "Staff" && animeStaff.length === 0) {
      const fetchStaff = async () => {
        try {
          const staff = await getStaffDetails(animeId);
          setAnimeStaff(staff);
        } catch (err) {
          console.error("Failed to fetch staff", err);
        }
      };
      fetchStaff();
    }
  }, [activeTab, animeId]);

  return (
    <div className="min-h-screen font-sen">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] -mt-16 sm:-mt-20">
          {animeDetails?.images?.jpg?.image_url && (
            <Image
              src={animeDetails.images.jpg.image_url}
              alt={
                animeDetails?.title_english ||
                animeDetails?.title ||
                "Anime Poster"
              }
              fill
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute bottom-4 right-4 z-20">
            <button className="flex items-center gap-2 bg-white hover:bg-white/90 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-black transition-colors">
              <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">
                Watch Trailer
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Anime Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-4 sm:gap-6 md:gap-8 flex-col md:flex-row">
          {/* Poster */}
          <div className="flex-shrink-0 sm:-mt-24 md:-mt-32 relative z-30 mx-auto md:mx-0">
            {animeDetails?.images?.jpg?.image_url && (
              <Image
                src={animeDetails?.images?.jpg?.image_url}
                alt={
                  animeDetails?.title_english ||
                  animeDetails?.title ||
                  "Anime Poster"
                }
                width={200}
                height={300}
                className="rounded-lg shadow-lg object-cover sm:w-[250px] sm:h-[375px] md:w-[300px] md:h-[450px]"
              />
            )}
          </div>

          {/* Right Side */}
          <div className="flex-1 mt-4 sm:mt-6 md:mt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center md:text-left font-delius">
              {animeDetails?.title_english || animeDetails?.title}
            </h1>
            <div className="flex items-center gap-2 mb-4 sm:mb-6 justify-center md:justify-start">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-base sm:text-lg font-semibold text-gray-300">
                {animeDetails?.score}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {watchStatusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleWatchStatusChange(status)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                      watchStatus === status
                        ? "bg-green-600 text-white"
                        : "bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]"
                    }`}
                  >
                    {status === "Watching" && <Eye className="w-4 h-4" />}
                    {status === "To Watch" && <Bookmark className="w-4 h-4" />}
                    {status === "Watched" && <Check className="w-4 h-4" />}
                    {status}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm justify-center">
                <Plus className="w-4 h-4" />
                Add to Collection
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-6 sm:mb-8 mt-4 sm:mt-6">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Details</h3>
              <div className="space-y-3 bg-[#1A1A1A] p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Type
                  </span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    {animeDetails?.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Episodes
                  </span>
                  <span className="text-white text-sm sm:text-base">
                    {animeDetails?.episodes}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Genres
                  </span>
                  <span className="text-white text-sm sm:text-base text-right">
                    {animeDetails?.genres
                      ?.map((genre) => genre.name)
                      .join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Aired
                  </span>
                  <span className="text-white text-sm sm:text-base">
                    {animeDetails?.aired?.string}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Description
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p className="text-gray-400 text-sm sm:text-base">
                  {animeDetails?.synopsis}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Relation Tab */}
        {activeTab === "Relations" && (
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tighter">
              Relations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {animeRelations?.map((relation, index) => {
                const mainEntry = relation.entry?.[0];

                if (!mainEntry) return null;

                return (
                  <RelationCard
                    key={`${mainEntry.mal_id}-${index}`}
                    relation={relation}
                  />
                );
              })}
            </div>
          </div>
        )}
        {/* Characters Tab */}
        {activeTab === "Characters" && (
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Characters
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {visibleCharacters.map((character) => (
                <ImageCard key={character.mal_id} character={character} />
              ))}
            </div>

            {animeCharacters.length > 12 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllCharacters(!showAllCharacters)}
                  className="text-blue-400 hover:text-blue-300 text-sm sm:text-base font-medium"
                >
                  {showAllCharacters ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === "Staff" && (
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Staff</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {visibleStaff.map((staff) => (
                <StaffCard key={staff.mal_id} staff={staff} />
              ))}
            </div>

            {animeStaff.length > 12 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllStaff(!showAllStaff)}
                  className="text-blue-400 hover:text-blue-300 text-sm sm:text-base font-medium"
                >
                  {showAllStaff ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Special For You Section */}
        <div className="py-6 sm:py-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
            You might also like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : specialForYouAnime.length > 0 ? (
              specialForYouAnime.map((anime, index) => (
                <Link href={`/anime/${anime.mal_id}`} key={index}>
                  <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
                </Link>
              ))
            ) : (
              <p className="text-gray-400">No anime found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
