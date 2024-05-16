import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/gifContext";
import Gif from "../Components/Gif";
import FilterGifs from "../Components/FilterGifs";
import { ImSpinner8 } from "react-icons/im";

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const { gf, filter } = GifState();

  const fetchGif = async () => {
    try {
      setLoading(true);
      const { data } = await gf.search(query, {
        sort: "relevant",
        type: filter,
        limit: 20,
        lang: "en",
      });
      setResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGif();
  }, [query, filter]);

  return (
    <div className="my-4">
      <h1 className="font-semibold tracking-tight text-5xl">{query}</h1>
      <FilterGifs alignLeft={true} />
      {loading ? (
        <div className="h-[50vh] w-full flex justify-center items-center">
          <ImSpinner8 size={50} />
        </div>
      ) : (
        <div className="columns-2 sm:columns-2 md:columns-3 lg-columns-4 xl:columns-5 mt-4">
          {results?.map((item, index) => (
            <Gif gif={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
