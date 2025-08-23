import React, { createContext, useContext, useState, useEffect } from "react";

const AnimeContext = createContext();

const AnimeProvider = ({ children }) => {
  const [animes, setAnimes] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch anime
        const animeRes = await fetch(
          "https://api.jikan.moe/v4/top/anime?filter=airing"
        );
        const animeData = await animeRes.json();
        // console.log("Fetched anime:", animeData.data);
        setAnimes(animeData.data || []);

        // Add a small delay before manga to avoid 429
        setTimeout(async () => {
          try {
            const mangaRes = await fetch("https://api.jikan.moe/v4/top/manga");
            const mangaData = await mangaRes.json();
            // console.log("Fetched manga:", mangaData.data);
            setMangas(mangaData.data || []);
          } catch (err) {
            console.error("Error fetching manga:", err);
          }
        }, 1000);

      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <AnimeContext.Provider value={{ animes, setAnimes, mangas, setMangas, loading }}>
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnime = () => useContext(AnimeContext);

export default AnimeProvider;
