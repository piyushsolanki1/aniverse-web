import React, { useState, useEffect, useRef, useCallback } from 'react';
import AnimeCard from '../components/AnimeCard';

const AnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnime = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
      if (!res.ok) {
        if (res.status === 429) {
          console.warn("Rate limited. Retrying in 2 seconds...");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
          return fetchAnime(); // retry after waiting
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      }

      const data = await res.json();

      // guard against missing data
      if (!data || !data.data) {
        setHasMore(false);
        return;
      }

      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setAnimeList((prev) => [...prev, ...data.data]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching anime:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // add a slight delay before initial fetch to avoid double call in dev
    const timer = setTimeout(() => fetchAnime(), 500);
    return () => clearTimeout(timer);
  }, []);

  const observer = useRef();
  const lastAnimeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchAnime();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h2 className="text-3xl mb-4 text-left">Anime Collection</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {animeList.map((anime, index) => {
          if (index === animeList.length - 1) {
            return (
              <div ref={lastAnimeRef} key={anime.mal_id}>
<AnimeCard anime={anime} type="anime" />
</div>
            );
          } else {
            return <AnimeCard key={anime.mal_id} anime={anime} />;
          }
        })}
      </div>

      {loading && <p className="text-center mt-4">Loading more anime...</p>}
      {error && <p className="text-center mt-4 text-red-400">{error}</p>}
      {!hasMore && <p className="text-center mt-4">No more anime to load</p>}
    </div>
  );
};

export default AnimePage;
