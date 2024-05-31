import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function GifSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGifs = async () => {
    if (query.trim() === "") {
      return;
    }

    // Further Search For a gif
    navigate(`/search/${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && query.length > 2) {
      console.log("called in if");
      searchGifs();
    } else {
      return;
    }
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-bl rounded-tl py-2 sm:py-4 px-4 sm:px-8 text-slate-600 text-md sm:text-lg md:text-xl outline-none border-slate-800 font-semibold"
        placeholder="Search all the Gifs and Stickers"
      />
      {query && (
        <span
          className="absolute right-20 top-5 bg-slate-300 rounded-full cursor-pointer transition-all"
          onClick={() => setQuery("")}
        >
          <HiMiniXMark size={20} />
        </span>
      )}
      <button
        onClick={searchGifs}
        className="bg-gradient-to-tr from-red-500 via-teal-400 to-orange-400 py-2 px-4 rounded-tr rounded-br"
      >
        <IoSearch size={40} className="hover:text-black" />
      </button>
    </div>
  );
}

export default GifSearch;
