import React, { useEffect } from "react";
import { GifState } from "../Context/gifContext";
import Gif from "../Components/Gif";
import FilterGifs from "../Components/FilterGifs";

function Home() {
  const { gf, filter, setFilter, gifs, setGifs, favorites } = GifState();

  const fetchTrendingGifs = async () => {
    try {
      const { data } = await gf.trending({
        limit: 20,
        type: filter,
        rating: "g",
      });

      setGifs(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(gifs);

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]); //* Whenever the filter changes, trending gifs of that filter will be fetched.

  return (
    <section>
      <div>
        <img src="/banner.gif" alt="banner" className="rounded w-full mt-2" />

        <FilterGifs showTrending={true} alignLeft={true} />

        <div className="mt-4 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
          {gifs?.map((gif, index) => (
            <Gif key={gif.id} gif={gif} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
