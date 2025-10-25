import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingAnime = ({ trendingAnimes = [], loading }) => {
  const navigate = useNavigate();

  if (loading) return <p className="text-center">Loading trending animes...</p>;

  return (
    <div className="trending-animes">
      <h2 className="text-left pl-10 pb-15">Trending Animes</h2>
      <div>
      <ul className="pl-20 flex gap-4 overflow-x-auto">
        <div className="flex contain-content gap-8 ">
        {trendingAnimes.map((anime) => (
          <li key={anime.mal_id} className="cursor-pointer flex flex-col items-center shadow w-full">
            
            <img
              className="h-full w-full"
              src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url}
              alt={anime.title}
              onClick={() => navigate(`/watch/anime/${anime.mal_id}`)}
            />
            <p className="text-white text-sm text-left ">{anime.title}</p>
            
          </li>
        ))}
        </div>
      </ul>
      </div>
    </div>
  );
};

export default TrendingAnime;

