import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const AnimeCard = ({ anime }) => {
    const { title, images, type, releaseYear, trailer, score, episodes } = anime;
    const [isLoaded, setIsLoaded] = useState(false);
    return(
  <div className="Anime-card cursor-pointer ">
    <img
      src={images?.webp?.image_url}
      alt={title}
      loading="lazy"
      decoding="async" 
      onLoad={() => setIsLoaded(true)}
      
      // className="w-full h-auto rounded-md"
    />
    <div className="text-left">
      <h3>{title}</h3>

      <div className="content text-left">
        <div className="text-sm text-white font-light">
          {type || "N/A"} • {releaseYear} •{"  "}
          {episodes ? `${episodes} eps` : "N/A eps"}
        </div>

        {/* <div className="rating">
          <FaStar />
          <p>{score ? score.toFixed(1) :"N/A"}</p>
        </div> */}
      </div>
    </div>
  </div>
);
}
export default AnimeCard;
