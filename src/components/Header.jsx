import React, { useContext, useState } from "react";
import { TbArrowBackUp, TbArrowForwardUp } from "react-icons/tb";
import { PiCube } from "react-icons/pi";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";
import { BsArrowsFullscreen } from "react-icons/bs";
import { DataContext } from "../context/DataContext";

const Header = ({ setShapes, undo, redo }) => {
  const { setZoomLevel } = useContext(DataContext);

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel * 1.2, 5)); // Limit max zoom level to 5
    console.log("gushdishd");
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel / 1.2, 0.2)); // Limit min zoom level to 0.2
  };
  return (
    <header className="text-gray-600 body-font border-b-2 w-full z-[1000]">
      <div className=" mx-auto flex flex-wrap py-4 px-1 flex-col md:flex-row justify-between items-center">
        <div className="flex pl-2 w-auto">
          <div className="flex px-4">
            <div className="flex flex-col items-center px-2">
              <TbArrowBackUp className="text-2xl" onClick={undo} />
              <span className="flex flex-col items-center px-2">Undo</span>
            </div>
            <div className="flex flex-col items-center px-2">
              <TbArrowForwardUp className="text-2xl" onClick={redo} />
              <span>Redo</span>
            </div>
          </div>
          <button
            onClick={() => setShapes([])}
            className="rounded border border-slate-400 hover:bg-gray-200 px-2"
          >
            Start Over
          </button>
        </div>
        <div className="flex pl-2 ">
          <div className="flex px-4 w-[21rem] ml-auto justify-around">
            <div
              onClick={handleZoomIn}
              className="flex flex-col items-center px-2"
            >
              <CiZoomIn className="text-2xl " />
              <span className="flex flex-col items-center px-2 text-sm max-w-max">
                Zoom In
              </span>
            </div>
            <div className="flex flex-col items-center px-2">
              <BsArrowsFullscreen className="text-2xl " />
              <span className="flex flex-col items-center px-2 text-sm  max-w-max">
                Center
              </span>
            </div>
            <div
              onClick={handleZoomOut}
              className="flex flex-col items-center px-2"
            >
              <CiZoomOut className="text-2xl " />
              <span className="flex flex-col items-center  text-sm  max-w-max">
                Zoom Out
              </span>
            </div>
            <div className="flex flex-col items-center px-2">
              <PiCube className="text-2xl " />
              <span className="flex flex-col items-center px-2 text-sm  max-w-max">
                3D
              </span>
            </div>
          </div>
          <button className="rounded border border-slate-400 hover:bg-gray-200 px-2 text-black mx-4  max-w-max">
            Parts Breakdown
          </button>
          <button className="rounded border bg-sky-600 hover:bg-sky-300 px-2 text-white mx-4  max-w-max">
            Request Quotes
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
