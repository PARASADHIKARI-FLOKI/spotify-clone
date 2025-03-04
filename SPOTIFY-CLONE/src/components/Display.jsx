import React, { useContext, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";

  const album = albumsData.find((x) => x._id === albumId);
  
  // State to track background color
  const [bgColor, setBgColor] = useState(album?.bgColour || "#121212");

  useEffect(() => {
    if (album) {
      setBgColor(album.bgColour); 
    }
  }, [album?.bgColour]);  

  useEffect(() => {
    console.log("Album Data:", album);
    console.log("Background Color:", bgColor);
    
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(${bgColor}, #121212)`
        : "#121212";
    }
  }, [isAlbum, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
