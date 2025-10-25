import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WatchPage = () => {
  const { id, type } = useParams(); // "anime" or "manga"
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id || !type) return;

      try {
        const response = await fetch(`https://api.jikan.moe/v4/${type}/${id}`);
        const data = await response.json();
        setContent(data.data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };
    fetchContent();
  }, [id, type]);

  if (!content) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  const {
    title,
    images,
    trailer,
    type: contentType,
    episodes,
    chapters,
    volumes,
    score,
    synopsis,
  } = content;

  const handleAddToWatchlist = () => {
    const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!storedList.some(item => item.mal_id === content.mal_id)) {
      storedList.push({ ...content, contentType: type });
      localStorage.setItem("watchlist", JSON.stringify(storedList));
      alert(`${title} added to your watchlist!`);
    } else {
      alert(`${title} is already in your watchlist.`);
    }
  };

  const handleWatchTrailer = () => {
    if (trailer?.url) window.open(trailer.url, "_blank");
  };

  const truncateText = (text, maxLength = 200) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="bg-gray-900 min-h-screen px-4 py-12 text-white flex justify-center">
      <div className="flex flex-col items-center max-w-5xl w-full bg-gray-800 p-6 rounded-2xl">
        {!isLoaded && (
          <div className="w-full h-80 bg-gray-700 animate-pulse rounded-2xl mb-4" />
        )}
        <img
          src={images?.webp?.large_image_url}
          alt={title}
          onLoad={() => setIsLoaded(true)}
          className={`rounded-2xl transition-opacity duration-500 h-80 mb-4 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <h1 className="text-3xl font-bold mb-4">{title}</h1>

        <div className="mt-4 text-gray-300 text-sm">
          {type === "anime" ? (
            <p>
              <strong>Type:</strong> {contentType} •{" "}
              <strong>Episodes:</strong> {episodes || "N/A"} •{" "}
              <strong>Score:</strong> {score || "N/A"}
            </p>
          ) : (
            <p>
              <strong>Type:</strong> {contentType} •{" "}
              <strong>Chapters:</strong> {chapters || "N/A"} •{" "}
              <strong>Volumes:</strong> {volumes || "N/A"} •{" "}
              <strong>Score:</strong> {score || "N/A"}
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleWatchTrailer}
            className={`px-4 py-2 rounded text-white transition ${
              trailer?.url ? "bg-red-400 hover:bg-red-500" : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Watch Trailer
          </button>

          <button
            onClick={handleAddToWatchlist}
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition"
          >
            Add to Watchlist
          </button>
        </div>

        {synopsis && (
          <div className="mt-6 text-gray-400 leading-relaxed max-w-3xl text-justify">
            <p>{showFullDescription ? synopsis : truncateText(synopsis)}</p>
            {synopsis.length > 200 && (
              <button
                onClick={() => setShowFullDescription(prev => !prev)}
                className="text-blue-400 hover:underline mt-2"
              >
                {showFullDescription ? "See Less" : "See More"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;

