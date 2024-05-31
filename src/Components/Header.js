import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3BottomRight, HiEllipsisVertical } from "react-icons/hi2";
import { GifState } from "../Context/gifContext";
import GifSearch from "./GifSearch";

function Header() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { gf, favorites } = GifState();

  const fetchGifCategories = async () => {
    try {
      const { data } = await gf.categories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" alt="Logo" className="w-8" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight cursor-pointer">
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
            // onBlur={() => setShowCategories(!showCategories)}
          >
            <HiEllipsisVertical size={28} />
          </button>
          {favorites?.length > 0 && (
            <button className="px-4 py-2 text-xs sm:text-lg bg-slate-700 text-white rounded">
              <Link to="/favorites">Favorite Gifs</Link>
            </button>
          )}
          <div className="relative">
            <button
              className="text-sky-400 block lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HiBars3BottomRight size={30} />
            </button>
            {isMenuOpen && (
              <div className="absolute z-30 mt-3 -left-10 flex flex-col items-center bg-slate-500 text-white rounded-lg">
                {categories?.slice(0, 4).map((category, index) => (
                  <Link
                    key={category.name}
                    to={`/${category?.name_encoded}`}
                    className="hover:gradient w-full px-4 py-2"
                  >
                    {category.name}
                  </Link>
                ))}
                <span
                  className="hover:gradient w-full px-4 py-2"
                  onClick={() => {
                    setShowCategories(!showCategories);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  More+
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {showCategories && (
        <section className="absolute lg:w-[85%] px-6 py-4  gradient z-10 font-bold opacity-100 transition-all">
          <span className="text-3xl font-extrabold">Categories</span>
          <hr className="bg-slate-700 opacity-70 my-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/${category?.name_encoded}`}
                className="text-slate-300 hover:text-white"
                onClick={() => setShowCategories(!showCategories)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Search */}
      <GifSearch />
    </nav>
  );
}

export default Header;
