import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3BottomRight, HiEllipsisVertical } from "react-icons/hi2";
import { GifState } from "../Context/gifContext";

function Header() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, filter, setFilter, gifs, setGifs, favorites } = GifState();

  const fetchGifCategories = async () => {
    try {
      const { data } = await gf.categories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(categories);
  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" alt="Logo" className="w-8" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="flex gap-4 items-center">
          {/* render categories */}
          {categories?.slice(0, 4).map((category, index) => (
            <Link
              key={category.name}
              to={`/${category?.name_encoded}`}
              className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
            >
              {category.name}
            </Link>
          ))}
          <button
            className="p-0.5 hover:gradient border-b-4 text-xl hidden lg:block"
            onClick={() => setShowCategories(!showCategories)}
          >
            <HiEllipsisVertical size={28} />
          </button>
          {favorites.length > 0 && (
            <button className="px-4 py-2 bg-slate-700 text-white rounded">
              <Link to="/favorites">Favorite Gifs</Link>
            </button>
          )}
          <button className="text-sky-400 block lg:hidden">
            <HiBars3BottomRight size={30} />
          </button>
        </div>
      </div>
      {showCategories && (
        <section className="absolute w-[95%] px-6 py-4  gradient z-10 font-bold opacity-100">
          <span className="text-3xl font-extrabold">Categories</span>
          <hr className="bg-slate-700 opacity-70 my-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} to={`/${category.name_encoded}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </nav>
  );
}

export default Header;
