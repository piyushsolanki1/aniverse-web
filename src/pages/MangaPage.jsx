import React, { useState, useEffect, useRef, useCallback } from "react";
import AnimeCard from "../components/AnimeCard";

const MangaPage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const observer = useRef(null);
  const initialFetchDone = useRef(false);

  const fetchManga = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (!data?.data?.length) {
        setHasMore(false);
        return;
      }

      setMangaList((prev) => [...prev, ...data.data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error fetching manga:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (initialFetchDone.current) return;

    initialFetchDone.current = true;
    fetchManga();
  }, [fetchManga]);

  const lastMangaRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading
        ) {
          fetchManga();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, fetchManga]
  );

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-white">
      <h2 className="mb-6 text-3xl font-bold">
        Manga Collection
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {mangaList.map((manga, index) => {
          const isLastItem = index === mangaList.length - 1;

          return (
            <div
              key={manga.mal_id}
              ref={isLastItem ? lastMangaRef : null}
            >
              <AnimeCard
                anime={manga}
                type="manga"
              />
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="mt-4 text-center">
          Loading more manga...
        </p>
      )}

      {error && (
        <p className="mt-4 text-center text-red-400">
          Error: {error}
        </p>
      )}

      {!loading && mangaList.length === 0 && !error && (
        <p className="mt-4 text-center">
          No manga found.
        </p>
      )}

      {!hasMore && mangaList.length > 0 && (
        <p className="mt-4 text-center">
          No more manga to load.
        </p>
      )}
    </div>
  );
};

export default MangaPage;