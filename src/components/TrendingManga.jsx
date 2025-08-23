import React from "react";

const TrendingManga = ({ mangas = [], loading }) => {
  if (loading) return <p className="text-center">Loading trending mangas...</p>;

  return (
    <div className="trending-animes">
      <h2 className="text-left pl-10 pb-15">Trending Manga</h2>
      <ul className="pl-20">
        {mangas.map((manga, index) => (
          <li key={manga.mal_id}>
            <img className="h-full" src={manga.images.jpg.image_url} alt={manga.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingManga;
