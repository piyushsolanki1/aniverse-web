import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingManga = ({ mangas = [], loading }) => {
  const navigate = useNavigate();

  if (loading) return <p className="text-center">Loading trending mangas...</p>;

  return (
    <div className="trending-animes">
      <h2 className="text-left pl-10 pb-15">Trending Manga</h2>
      <ul className="pl-20 flex gap-4 overflow-x-auto">
      <div className="flex contain-content gap-8 ">
        {mangas.map((manga, index) => (
          <li key={manga.mal_id} className="cursor-pointer flex flex-col items-center shadow w-full">
            <img
              className="h-full w-full"
              src={
                manga.images?.jpg?.image_url || anime.images?.webp?.image_url
              }
              alt={manga.title}
              onClick={() => navigate(`/watch/manga/${manga.mal_id}`)}
            />
            <p className="text-white text-sm text-left">{manga.title}</p>
          </li>
          
        ))}
        </div>
      </ul>
      </div>
  );
};

export default TrendingManga;
