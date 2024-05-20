import React, { useEffect, useState } from "react";
import { GifState } from "../Context/gifContext";
import Gif from "../Components/Gif";

function Favorites() {
  const [favoriteResults, setFavoriteResults] = useState([]);
  const { gf, favorites } = GifState();

  const fetchFavoriteGifs = async () => {
    try {
      const { data } = await gf.gifs(favorites);
      setFavoriteResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavoriteGifs();
  }, []);

  return (
    <div className="mt-6">
      <span className="text-slate-400 text-xl font-extrabold tracking-tight content-center sm:content-normal">
        My Favorites:
      </span>
      <div className="mt-2 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
        {favoriteResults?.map((item, index) => (
          <Gif key={item?.id} gif={item} hover={false} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
