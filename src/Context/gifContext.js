import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

export const GifContext = createContext();

const GifContextProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (gifId) => {
    if (favorites.includes(gifId)) {
      const updatedFavorites = favorites.filter((itemId) => itemId !== gifId);
      localStorage.setItem("favoriteGifs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, gifId];
      localStorage.setItem("favoriteGifs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteGifs")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        addToFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifContextProvider;
