import React, { useState, useEffect, useRef, useCallback } from "react";
import AnimeCard from "../components/AnimeCard";

const AnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const observer = useRef(null);
  const initialFetchDone = useRef(false);

  const fetchAnime = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${page}`
      );

      if (!res.ok) {
        if (res.status === 429) {
          console.warn("Rate limited. Retrying later...");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (!data?.data?.length) {
        setHasMore(false);
        return;
      }

      setAnimeList((prev) => [...prev, ...data.data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error fetching anime:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (initialFetchDone.current) return;

    initialFetchDone.current = true;
    fetchAnime();
  }, [fetchAnime]);

  const lastAnimeRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchAnime();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchAnime]
  );

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-white">
      <h2 className="mb-6 text-3xl font-bold">Anime Collection</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {animeList.map((anime, index) => {
          const isLastItem = index === animeList.length - 1;

          return (
            <div
              key={anime.mal_id}
              ref={isLastItem ? lastAnimeRef : null}
            >
              <AnimeCard anime={anime} type="anime" />
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="mt-4 text-center">
          Loading more anime...
        </p>
      )}

      {error && (
        <p className="mt-4 text-center text-red-400">
          {error}
        </p>
      )}

      {!hasMore && (
        <p className="mt-4 text-center">
          No more anime to load
        </p>
      )}
    </div>
  );
};

export default AnimePage;