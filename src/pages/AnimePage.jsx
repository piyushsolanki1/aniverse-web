import React, { useState, useEffect, useRef, useCallback } from 'react';
import AnimeCard from '../components/AnimeCard';

const AnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchAnime = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
      const data = await res.json();
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setAnimeList((prev) => [...prev, ...data.data]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error fetching anime:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAnime();
  }, []);

  // Infinite scroll
  const observer = useRef();
  const lastAnimeRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchAnime();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h2 className="text-3xl mb-4 text-left">Anime Collection</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {animeList.map((anime, index) => {
          if (index === animeList.length - 1) {
            return <div ref={lastAnimeRef} key={anime.mal_id}><AnimeCard anime={anime} /></div>;
          } else {
            return <AnimeCard key={anime.mal_id} anime={anime} />;
          }
        })}
      </div>
      {loading && <p className="text-center mt-4">Loading more anime...</p>}
      {!hasMore && <p className="text-center mt-4">No more anime to load</p>}
    </div>
  );
};

export default AnimePage;

