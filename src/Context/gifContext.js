import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

export const GifContext = createContext();

const GifContextProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);

  return (
    <GifContext.Provider
      value={{ gf, gifs, setGifs, filter, setFilter, favorites }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifContextProvider;
