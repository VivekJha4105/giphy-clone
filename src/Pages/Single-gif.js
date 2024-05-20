import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../Context/gifContext";
import Gif from "../Components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gif", "sticker", "text"];

function SingleGif() {
  const { type, slug } = useParams();
  const [gif, setGif] = useState();
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { gf, favorites, addToFavorites } = GifState();

  const getSingleGif = async () => {
    try {
      const slugArr = slug.split("-");
      const id = slugArr[slugArr.length - 1];
      const { data } = await gf.gif(id);
      const { data: relatedGifArray } = await gf.related(id, { limit: 10 });
      setGif(data);
      setRelatedGifs(relatedGifArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    getSingleGif();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 my-6">
      <section className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-2 sm:hidden md:block">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="py-2">
                <p className="font-bold">{gif?.user?.display_name}</p>
                <p className="text-slate-400 hover:text-white transition-all">
                  @{gif?.user?.username}
                </p>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="text-sm whitespace-pre-line py-2 text-slate-300">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 50) + "..."}

                <div
                  onClick={() => setReadMore(!readMore)}
                  className="font-semibold text-white hover:underline hover:text-slate-300 cursor-pointer"
                >
                  {readMore ? (
                    <>
                      Read Less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read More <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
            <hr />
            {gif?.source && (
              <div className="mt-6">
                <span className="text-slate-300">Source:</span>
                <div className="flex gap-2 mt-2">
                  <HiOutlineExternalLink size={25} />
                  <a
                    href={gif.source}
                    target="_blank"
                    className="truncate hover:underline text-sm hover:font-semibold transition-all"
                    rel="noreferrer"
                  >
                    {gif.source}
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      <section className="col-span-4 sm:col-span-3">
        <div className="flex gap-4">
          <div className="w-full sm:w-3/4">
            <h3 className="text-slate-300 hover:text-white truncate mb-2">
              <span className="font-bold text-white">By:</span> <br />
              {gif?.title}
            </h3>
            <Gif gif={gif} hover={false} />
            {/* mobile UI */}

            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="py-2">
                <p className="font-bold">{gif?.user?.display_name}</p>
                <p className="text-slate-400 hover:text-white transition-all">
                  @{gif?.user?.username}
                </p>
              </div>
              <button
                className="ml-auto"
                // onClick={shareGif}
              >
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          {/* Favorite / Share / Embed */}

          <div className="hidden sm:flex flex-col gap-4 mx-auto text-2xl">
            <button
              className="flex font-bold items-center gap-2"
              onClick={() => addToFavorites(gif?.id)}
            >
              <HiMiniHeart
                className={favorites?.includes(gif?.id) ? "text-red-500" : ""}
                size={25}
              />
              Favorites
            </button>
            <button
              className="flex font-bold items-center gap-2 "
              // onClick={shareGif}
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              className="flex font-bold items-center gap-2"
              // onClick={embedGif}
            >
              <IoCodeSharp size={25} />
              Embed
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <h3 className="faded-text font-extrabold truncate mb-2 text-xl md:text-2xl">
            Related Gifs:
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedGifs?.map((item, index) => (
              <Gif key={item?.id} gif={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleGif;
