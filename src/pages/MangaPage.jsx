import React, { useState, useEffect, useRef, useCallback } from 'react';
import AnimeCard from '../components/AnimeCard';

const MangaPage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchManga = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga?page=${page}`);
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setHasMore(false);
      } else {
        setMangaList((prev) => [...prev, ...data.data]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error fetching manga:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchManga();
  }, []);

  // Infinite scroll
  const observer = useRef();
  const lastMangaRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchManga();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h2 className="text-3xl mb-4 text-left">Manga Collection</h2>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
      {mangaList.map((manga, index) => {
  if (index === mangaList.length - 1) {
    return (
      <div ref={lastMangaRef} key={`${manga.mal_id}-${index}`}>
        <AnimeCard anime={manga} />
      </div>
    );
  } else {
    return <AnimeCard key={`${manga.mal_id}-${index}`} anime={manga} />;
  }
})}

      </div>
      {loading && <p className="text-center mt-4">Loading more Manga...</p>}
      {!hasMore && <p className="text-center mt-4">No more manga to load</p>}
    </div>
  );
};

export default MangaPage;
