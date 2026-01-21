import React, { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import { useLocation } from "react-use";

const SearchPage = () => {
  const [animeResults, setAnimeResults] = useState([]);
  const [mangaResults, setMangaResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700); 

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const animeRes = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(debouncedQuery)}`
        );
        const animeData = await animeRes.json();
        setAnimeResults(animeData.data || []);

        const mangaRes = await fetch(
          `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(debouncedQuery)}`
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
  }, [debouncedQuery]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-xl mb-4">
        Search results for: "{debouncedQuery}"
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {animeResults.length > 0 && (
            <div>
              <h2 className="text-3xl mb-4">Anime</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {animeResults.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            </div>
          )}

          {mangaResults.length > 0 && (
            <div className="mt-12">
              <h3 className="text-3xl font-bold mb-4">Manga</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {mangaResults.map((manga) => (
                  <AnimeCard
                    key={manga.mal_id}
                    anime={manga}
                    type="manga"
                  />
                ))}
              </div>
            </div>
          )}

          {animeResults.length === 0 &&
            mangaResults.length === 0 &&
            !loading && <p>No anime or manga found.</p>}
        </>
      )}
    </div>
  );
};

export default SearchPage;
