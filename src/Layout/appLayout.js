import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

function AppLayout() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <main className="container px-10 py-4 mx-auto">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
