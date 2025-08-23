import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimeCard from "../components/AnimeCard"; // adjust path if needed

const genreMap = {
  Action: 1,
  Adventure: 2,
  Comedy: 4,
  Drama: 8,
  Fantasy: 10,
  Horror: 14,
  Romance: 22,
  SciFi: 24,
};

const GenrePage = () => {
  const { genreName } = useParams();
  const [animes, setAnimes] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenreData = async () => {
      setLoading(true);
      try {
        const genreId = genreMap[genreName];
        if (!genreId) {
          console.error("Genre not found in map:", genreName);
          setLoading(false);
          return;
        }

        // Fetch anime
        const animeRes = await fetch(
          `https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity&limit=20`
        );
        const animeData = await animeRes.json();

        // Fetch manga
        const mangaRes = await fetch(
          `https://api.jikan.moe/v4/manga?genres=${genreId}&order_by=popularity&limit=20`
        );
        const mangaData = await mangaRes.json();

        setAnimes(animeData.data || []);
        setMangas(mangaData.data || []);
      } catch (err) {
        console.error("Error fetching genre data:", err);
      }
      setLoading(false);
    };

    fetchGenreData();
  }, [genreName]);

  if (loading)
    return <p className="text-center text-white">Loading {genreName}...</p>;

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      {/* Anime Section */}
      <h2 className="text-3xl mb-4 text-left">{genreName} Anime</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {animes.length > 0 ? (
          animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))
        ) : (
          <p>No anime found in this genre.</p>
        )}
      </div>

      {/* Manga Section */}
      <h2 className="text-3xl mt-8 mb-4 text-left">{genreName} Manga</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {mangas.length > 0 ? (
          mangas.map((manga) => (
            <AnimeCard key={manga.mal_id} anime={manga} />
          ))
        ) : (
          <p>No manga found in this genre.</p>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
