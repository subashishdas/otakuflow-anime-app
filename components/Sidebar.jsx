"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    year: true,
    season: true,
    genres: true,
    studio: false,
    format: false,
    airingStatus: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Romance",
    "Slice of Life",
    "Sports",
    "Thriller",
    "Horror",
    "Mystery",
    "Sci-Fi",
  ];
  const studios = [
    "Mappa",
    "Wit Studio",
    "Toei Animation",
    "Madhouse",
    "Bones",
    "A-1 Pictures",
    "Studio Ghibli",
    "Pierrot",
  ];
  const formats = ["TV", "Movie", "OVA", "ONA", "Special"];
  const airingStatuses = ["Airing", "Finished", "Not Yet Aired"];

  const FilterSection = ({ title, items, filterKey, isExpanded, onToggle }) => (
    <div className="mb-6">
      <button
        onClick={() => onToggle(filterKey)}
        className="flex items-center justify-between w-full text-left text-white font-medium mb-3 hover:text-rose-400 transition-colors"
      >
        <span>{title}</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isExpanded && (
        <div className="space-y-2 ml-2">
          {items.map((item) => (
            <label
              key={item}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters[filterKey]?.includes(item) || false}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleFilterChange(filterKey, [
                      ...(filters[filterKey] || []),
                      item,
                    ]);
                  } else {
                    handleFilterChange(
                      filterKey,
                      filters[filterKey]?.filter((f) => f !== item) || []
                    );
                  }
                }}
                className="mr-3 w-4 h-4 text-rose-500 bg-gray-700 border-gray-600 rounded focus:ring-rose-500 focus:ring-2"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                {item}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="w-64 h-screen overflow-y-auto scrollbar-hide p-6 border-r border-gray-700 fixed left-0 top-20 z-10"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Filters</h2>

        {/* Clear All Button */}
        <button
          onClick={() => onFilterChange("clear", null)}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors mb-6"
        >
          Clear All
        </button>
      </div>

      <FilterSection
        title="Year"
        items={years}
        filterKey="year"
        isExpanded={expandedSections.year}
        onToggle={toggleSection}
      />

      <FilterSection
        title="Season"
        items={seasons}
        filterKey="season"
        isExpanded={expandedSections.season}
        onToggle={toggleSection}
      />

      <FilterSection
        title="Genres"
        items={genres}
        filterKey="genres"
        isExpanded={expandedSections.genres}
        onToggle={toggleSection}
      />

      <FilterSection
        title="Studio"
        items={studios}
        filterKey="studio"
        isExpanded={expandedSections.studio}
        onToggle={toggleSection}
      />

      <FilterSection
        title="Format"
        items={formats}
        filterKey="format"
        isExpanded={expandedSections.format}
        onToggle={toggleSection}
      />

      <FilterSection
        title="Airing Status"
        items={airingStatuses}
        filterKey="airingStatus"
        isExpanded={expandedSections.airingStatus}
        onToggle={toggleSection}
      />

      {/* View All Button */}
      <div className="mt-8 pt-4 border-t border-gray-700">
        <button className="w-full text-rose-400 hover:text-rose-300 text-sm transition-colors">
          View All →
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
