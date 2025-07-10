import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-transparent border-b border-gray-600 ">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-delius text-white hover:text-rose-400 transition-colors"
          >
            OtakuFlow
          </Link>

          {/* Nav Links - Hidden on mobile */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-sen">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/anime"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Anime
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search Bar - Responsive width */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <SearchBar />
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-sen rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors hidden sm:block"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm rounded-lg bg-rose-600 text-white font-sen hover:bg-rose-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
