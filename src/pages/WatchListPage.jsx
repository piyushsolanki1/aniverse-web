import React, { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";

const WatchListPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedList);
  }, []);

  const animeList = watchlist.filter((item) => item.contentType === "anime");
  const mangaList = watchlist.filter((item) => item.contentType === "manga");

  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      {/* Anime Section */}
      <h2 className="text-2xl font-semibold mb-4">Anime</h2>
      {animeList.length === 0 ? (
        <p className="text-gray-400 mb-6">No anime in your watchlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} type="anime" />
          ))}
        </div>
      )}

      {/* Manga Section */}
      <h2 className="text-2xl font-semibold mb-4">Manga</h2>
      {mangaList.length === 0 ? (
        <p className="text-gray-400">No manga in your watchlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {mangaList.map((manga) => (
            <AnimeCard key={manga.mal_id} anime={manga} type="manga" />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchListPage;
