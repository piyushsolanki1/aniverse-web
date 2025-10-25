import React, { createContext, useContext, useState, useEffect } from "react";

const AnimeContext = createContext();

const AnimeProvider = ({ children }) => {
  const [animes, setAnimes] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to safely fetch with retry and delay on 429
  const safeFetch = async (url, retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      const res = await fetch(url);
      if (res.status === 429) {
        console.warn("Rate limited. Waiting 2s before retry...");
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    }
    throw new Error(`Failed to fetch after ${retries} retries`);
  };

  useEffect(() => {
    let isMounted = true; // avoid state updates on unmounted component

    const fetchContent = async () => {
      setLoading(true);
      try {
        const animeData = await safeFetch("https://api.jikan.moe/v4/top/anime?filter=airing");
        if (isMounted) setAnimes(animeData.data || []);

        // Wait a bit before fetching manga to avoid rate limit
        await new Promise((r) => setTimeout(r, 1500));

        const mangaData = await safeFetch("https://api.jikan.moe/v4/top/manga");
        if (isMounted) setMangas(mangaData.data || []);

      } catch (err) {
        console.error("Error fetching content:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Add small delay to avoid double call in dev
    const timer = setTimeout(fetchContent, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimeContext.Provider value={{ animes, setAnimes, mangas, setMangas, loading, error }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnime = () => useContext(AnimeContext);
export default AnimeProvider;
