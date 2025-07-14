"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getAnimeList } from "@/lib/jikanApi";
import AnimeCard from "@/components/AnimeCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const AnimePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    year: [],
    season: [],
    genres: [],
    studio: [],
    format: [],
    airingStatus: [],
  });
  const [sortBy, setSortBy] = useState("title");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Genre mapping - Jikan API uses genre IDs
  const genreMap = {
    Action: 1,
    Adventure: 2,
    Comedy: 4,
    Drama: 8,
    Fantasy: 10,
    Romance: 22,
    "Slice of Life": 36,
    Sports: 30,
    Thriller: 41,
    Horror: 14,
    Mystery: 7,
    "Sci-Fi": 24,
  };

  // Status mapping
  const statusMap = {
    Airing: "airing",
    Finished: "complete",
    "Not Yet Aired": "upcoming",
  };

  // Format mapping
  const formatMap = {
    TV: "tv",
    Movie: "movie",
    OVA: "ova",
    ONA: "ona",
    Special: "special",
  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query params based on filters
        const queryParams = {
          q: search || "",
          limit: 24,
          page: currentPage,
          order_by: sortBy,
          sort: "desc",
        };

        // Add year filter
        if (filters.year.length > 0) {
          queryParams.start_date = `${filters.year[0]}-01-01`;
          queryParams.end_date = `${filters.year[0]}-12-31`;
        }

        // Add genre filter
        if (filters.genres.length > 0) {
          const genreIds = filters.genres
            .map((genre) => genreMap[genre])
            .filter(Boolean);
          if (genreIds.length > 0) {
            queryParams.genres = genreIds.join(",");
          }
        }

        // Add status filter
        if (filters.airingStatus.length > 0) {
          queryParams.status = statusMap[filters.airingStatus[0]];
        }

        // Add format filter
        if (filters.format.length > 0) {
          queryParams.type = formatMap[filters.format[0]];
        }

        const response = await getAnimeList(queryParams);
        const { data: animeData, pagination } = response;
        setAnimeList(animeData);

        // Calculate pagination info from API response
        if (pagination) {
          const totalItems = pagination.items?.total || 0;
          const itemsPerPage = pagination.items?.per_page || 24;
          const totalPages = Math.ceil(totalItems / itemsPerPage);

          setTotalPages(totalPages || 1);
          setHasNextPage(pagination.has_next_page || false);
          setHasPrevPage(pagination.has_previous_page || false);
        } else {
          // Fallback calculation if pagination data is not available
          const estimatedTotal =
            animeData.length === 24 ? currentPage * 24 + 24 : currentPage * 24;
          const estimatedPages = Math.ceil(estimatedTotal / 24);

          setTotalPages(estimatedPages);
          setHasNextPage(animeData.length === 24);
          setHasPrevPage(currentPage > 1);
        }

        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message || "Failed to fetch anime data");
        setLoading(false);
      }
    };

    fetchAnime();
  }, [search, filters, sortBy, currentPage]);

  const handleFilterChange = (filterType, value) => {
    // Reset to first page when filters change
    setCurrentPage(1);

    if (filterType === "clear") {
      setFilters({
        year: [],
        season: [],
        genres: [],
        studio: [],
        format: [],
        airingStatus: [],
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  const handleSortChange = (newSortBy) => {
    setCurrentPage(1); // Reset to first page when sort changes
    setSortBy(newSortBy);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce(
      (count, filterArray) => count + filterArray.length,
      0
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const Pagination = () => {
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            hasPrevPage
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-rose-600 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            hasNextPage
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />

      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {search ? `Search Results for "${search}"` : "Catalog"}
              </h1>
              {getActiveFiltersCount() > 0 && (
                <p className="text-gray-400 text-sm">
                  {getActiveFiltersCount()} filter
                  {getActiveFiltersCount() > 1 ? "s" : ""} applied
                </p>
              )}
              {!loading && animeList.length > 0 && (
                <p className="text-gray-400 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="title">Title</option>
                <option value="score">Rating</option>
                <option value="popularity">Popularity</option>
                <option value="start_date">Release Date</option>
                <option value="episodes">Episodes</option>
              </select>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-white">Loading...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : animeList.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                {animeList.map((anime, index) => (
                  <Link href={`/anime/${anime.mal_id}`} key={index}>
                    <AnimeCard
                      key={`${anime.mal_id}-${currentPage}-${index}`}
                      anime={anime}
                    />
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <Pagination />
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">No anime found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
