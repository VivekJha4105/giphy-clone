import React from "react";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaWhatsapp,
  FaWindowClose,
} from "react-icons/fa";

function ShareModal({ closeModal = () => {} }) {
  const handleClick = (e) => {
    if (e.target.id === "share__container") {
      closeModal();
    }
  };

  return (
    <div
      id="share__container"
      onClick={handleClick}
      className="fixed inset-0 w-full h-full flex justify-center items-center bg-white/20 backdrop-filter backdrop-blur-sm"
    >
      {/* Modal Body */}

      <section className="w-[40%] max-w-lg rounded-lg bg-black text-slate-300 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-xl lg:text-2xl">Share on:</h2>
          <FaWindowClose
            size={25}
            className="text-red-500 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="mt-3">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="p-4 bg-white/30 rounded-lg">
              <FaTwitter className="size-8 lg:size-12  text-blue-500 mx-auto" />
            </div>
            <div className="p-4 bg-white/30 rounded-lg ">
              <FaFacebookMessenger className="size-8 lg:size-12 text-blue-600 mx-auto" />
            </div>
            <div className="p-4 bg-white/30 rounded-lg ">
              <FaInstagram className="size-8 lg:size-12  text-red-400 mx-auto" />
            </div>
            <div className="p-4 bg-white/30 rounded-lg ">
              <FaWhatsapp className="size-8 lg:size-12  text-teal-500 mx-auto" />
            </div>
          </div>
          <button
            className="mt-6 px-4 py-3 rounded-lg coursor-pointer justify-center bg-blue-500 text-slate-600 w-full flex items-center gap-1 font-extrabold tracking-tight hover:text-white"
            // onClick={}
          >
            <span>
              <FaLink size={30} />
            </span>
            COPY LINK{" "}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ShareModal;
