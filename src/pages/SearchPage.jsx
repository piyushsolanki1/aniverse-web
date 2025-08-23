import React, { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import { useLocation } from "react-use";

const SearchPage = () => {
  const [animeResults, setAnimeResults] = useState([]);
  const [mangaResults, setMangaResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Fetch Anime
        const animeRes = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`
        );
        const animeData = await animeRes.json();
        setAnimeResults(animeData.data || []);

        // Fetch Manga
        const mangaRes = await fetch(
          `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}`
        );
        const mangaData = await mangaRes.json();
        setMangaResults(mangaData.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-xl mb-4">Search results for: "{query}"</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Anime Results */}
          {animeResults.length > 0 && (
            <div>
              <h2 className="text-3xl mb-4 text-left">Anime</h2>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                {animeResults.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </div>
          )}

          {/* Manga Results */}
          {mangaResults.length > 0 && (
            <div>
              <h3 className="text-3xl mb-4 text-left">Manga</h3>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                {mangaResults.map((manga) => (
                  <AnimeCard key={manga.mal_id} anime={manga} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {animeResults.length === 0 && mangaResults.length === 0 && (
            <p>No anime or manga found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
