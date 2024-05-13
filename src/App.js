import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/appLayout";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Search from "./Pages/Search";
import Favorites from "./Pages/Favorites";
import SingleGif from "./Pages/Single-gif";
import GifContextProvider from "./Context/gifContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Categories />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
    ],
  },
]);

function App() {
  return (
    <GifContextProvider>
      <RouterProvider router={router} />
    </GifContextProvider>
  );
}

export default App;
