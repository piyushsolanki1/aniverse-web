import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto py-10 px-6 sm:px-8 lg:px-12">
        {/* Navigation */}
        <div className="mb-8 text-center">
          <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
            Navigation
          </h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-6">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Anime" className="text-gray-400 hover:text-white">
                Anime
              </Link>
            </li>
            <li>
              <Link to="/Manga" className="text-gray-400 hover:text-white">
                Manga
              </Link>
            </li>
          </ul>
        </div>

        {/* Genres */}
        <div className="mb-8 text-center">
          <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
            Genres
          </h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-6">
            {[
              "Action",
              "Adventure",
              "Romance",
              "Comedy",
              "Drama",
              "Fantasy",
              "Horror",
              "SciFi",
            ].map((genre) => (
              <li key={genre}>
                <Link
                  to={`/genre/${genre}`}
                  className="text-gray-400 hover:text-white"
                >
                  {genre === "SciFi" ? "Sci-Fi" : genre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="mb-8 text-center">
          <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
            Help
          </h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-6">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-gray-400 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} AniVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

