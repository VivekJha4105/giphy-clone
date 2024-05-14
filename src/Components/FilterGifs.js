import React from "react";
import { GifState } from "../Context/gifContext";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const filterItems = [
  {
    title: "Gifs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-400 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-400 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-500",
  },
];

function FilterGifs({ alignLeft = false, showTrending = false }) {
  const { filter, setFilter } = GifState();

  return (
    <div
      className={`mt-2 flex ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "justify-between flex-col sm:flex-row sm:items-center"
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex gap-2">
          <HiMiniArrowTrendingUp size={30} className="text-purple-400" />
          <span className="font-semibold text-slate-300 text-xl">Trending</span>
        </span>
      )}
      <div className="max-w-fit bg-slate-700 rounded-full mt-2 py-2">
        {filterItems.map((item, index) => (
          <span
            key={item.title}
            className={`${
              filter === item.value ? `${item.background}` : ""
            } font-semibold w-1/3 rounded-full py-2 px-6 text-center sm:text-lg`}
            onClick={() => setFilter(item.value)}
          >
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FilterGifs;
