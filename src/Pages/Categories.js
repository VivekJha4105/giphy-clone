import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/gifContext";
import Gif from "../Components/Gif";
import { ImSpinner8 } from "react-icons/im";

function Categories() {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const { gf, filter } = GifState();
  const [loading, setLoading] = useState(false);

  const fetchGifByCategory = async () => {
    try {
      // console.log("called");
      setLoading(true);
      const { data } = await gf.gifs(category, category);
      setResults(data);
      setLoading(false);
      // console.log(data, " data");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGifByCategory();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {loading ? (
        <div className="h-[50vh] w-full flex justify-center items-center">
          <ImSpinner8 size={50} />
        </div>
      ) : (
        <>
          <section className="mt-10 w-full sm:w-[30%]">
            {results.length > 0 && <Gif gif={results[0]} hover={false} />}
            <span className="md:text-sm text-slate-400 font-semibold tracking-wide">
              Don't show me, gif it to me!!!
            </span>
            <hr className="mt-4 " />
          </section>
          <section className="">
            <h1 className="my-4 font-extrabold capitalize text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-tight">
              {category.split("-").join(" & ")} GIFs :
            </h1>
            <p className="max-w-fit text-lg font-bold text-slate-400 hover:text-slate-200 cursor-pointer">
              @{category}
            </p>
            {/* <FilterGifs alignLeft={true} /> */}
            <div className="mt-6 columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
              {results?.slice(1)?.map((item, index) => (
                <Gif key={item?.id} gif={item} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Categories;
