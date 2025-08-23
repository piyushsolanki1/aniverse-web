import React from 'react'



const TrendingAnime = ({ trendingAnimes= [], loading }) => {
    if (loading) return <p className="text-center">Loading trending animes...</p>;

    return (
        <div className="trending-animes">
            <h2 className='text-left pl-10 pb-15'>Trending Animes</h2>
            <ul className='pl-20'>
                {trendingAnimes.map((anime, index) => (
                    <li key={anime.mal_id}>
                        <img className='h-full' src={anime.images.jpg.image_url} alt="" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TrendingAnime