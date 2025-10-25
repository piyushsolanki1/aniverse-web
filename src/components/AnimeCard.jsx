import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnimeCard = ({ anime, type }) => {
  const { mal_id, title, images, releaseYear, episodes } = anime;
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // fallback to "anime" if type is not provided
  const contentType = type || "anime";

  const handleClick = () => {
    navigate(`/watch/${contentType}/${mal_id}`);
  };

  return (
    <div
      className="p-1 shadow-2xl shadow-gray-800 rounded-t-2xl bg-gray-800 cursor-pointer"
      onClick={handleClick}
    >
      {!isLoaded && (
        <div className="h-80 w-full bg-gray-700 animate-pulse rounded-t-2xl mb-2" />
      )}

      <img
        className={`h-80 w-full object-fill rounded-t-2xl mb-2 transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={images?.webp?.image_url}
        alt={title}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />

      <div className="p-2 text-left">
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
        <div className="text-sm text-gray-300 font-light">
          {contentType} • {releaseYear || "Unknown"} •{" "}
          {episodes ? `${episodes} eps` : "N/A eps"}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
