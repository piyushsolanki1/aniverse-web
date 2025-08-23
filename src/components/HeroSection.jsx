import React, { useState, useEffect } from "react";
import { PlayCircleIcon, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = ({ animes = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 sec
  useEffect(() => {
    if (animes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [animes]);

  if (!animes || animes.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-white">
        Loading hero anime...
      </div>
    );
  }

  const currentAnime = animes[currentIndex] || {};

  // Manual navigation
  const goPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + animes.length) % animes.length
    );
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animes.length);
  };

  return (
    <div className="relative h-[72vh] w-full overflow-hidden bg-gray-900">
      {/* Background Image */}
      <img
        key={currentAnime.mal_id}
        src={currentAnime.images.jpg.image_url}
        alt={currentAnime.title}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>

      {/* Content at Bottom */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-12 lg:px-16 z-20 pb-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {currentAnime.title}
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-6 line-clamp-3">
            {currentAnime.synopsis}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-3xl flex items-center">
              <PlayCircleIcon className="mr-2" size={20} />
              Watch Now
            </button>
            <button className="bg-transparent border border-white text-white font-bold py-3 px-6 rounded-3xl hover:bg-white/10">
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/50 text-white p-3 rounded-lg z-30 hover:bg-purple-600"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/50 text-white p-3 rounded-lg z-30 hover:bg-purple-600"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default HeroSection;

