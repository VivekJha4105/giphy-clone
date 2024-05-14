import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/gifContext";
import Gif from "../Components/Gif";

function Categories() {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const { gf, filter } = GifState();

  const fetchGifByCategory = async () => {
    try {
      // console.log("called");
      const { data } = await gf.gifs(category, {
        sort: "relevant",
        // type: filter,
        limit: 20,
        lang: "en",
      });
      setResults(data);
      // console.log(data, " data");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGifByCategory();
  }, [category]);

  return (
    <div className="mt-2">
      <h1 className="font-semibold text-3xl tracking-tight my-2">{category}</h1>
      {/* <FilterGifs alignLeft={true} /> */}
      <div className="mt-4 columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {results?.map((item, index) => (
          <Gif key={item?.id} gif={item} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
