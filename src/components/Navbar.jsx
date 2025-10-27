import React from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "react-use";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import WatchListPage from "../pages/WatchListPage";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const navigate = useNavigate();
  useDebounce(() => setDebouncedTerm(searchTerm), 300, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };
  
  return (
    <nav className=" bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-purple-500">
               <a href="/">
               Aniverse
               </a>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="/Anime"
                  className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Anime
                </a>
                <a
                  href="/Manga"
                  className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Manga
                </a>
                <a
                  href="/WatchList"
                  className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  WatchList
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <form onSubmit={handleSearch} className="hidden md:block w-1/3">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </form>
              <button className="ml-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate("/login")}>
                Sign In
              </button>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/Anime"
              className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Anime
            </a>
            <a
              href="/Manga"
              className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Manga
            </a>
          </div>
          <div className="px-2 pt-2 pb-3">
          <form onSubmit={handleSearch}>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </form>
            <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
