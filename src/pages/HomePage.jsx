import React from "react";
import HeroSection from "../components/HeroSection";
import TrendingAnime from "../components/TrendingAnime";
import TrendingManga from "../components/TrendingManga";
import { useAnime } from "../components/AnimeContext";

const HomePage = () => {
  const { animes, mangas, loading } = useAnime();

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="flex-grow">
        <HeroSection animes={animes.slice(0, 5)} />
        {animes && animes.length > 0 ? (
        <TrendingAnime trendingAnimes={animes.slice(0, 10)} loading={loading} />
        ) : (
            <p className="text-white text-center mt-10">
            No trending anime available.
          </p>
        )}
        {mangas && mangas.length > 0 ? (
          <TrendingManga mangas={mangas.slice(0, 10)} loading={loading} />
        ) : (
          <p className="text-white text-center mt-10">
            No trending manga available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
