import React, { useContext } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";
import { DataContext } from "../context/DataContext";

const Header = ({ setShapes, undo, redo }) => {
  const { setZoomLevel } = useContext(DataContext);

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel / 1.2, 0.1));
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
          
            <div
              onClick={handleZoomOut}
              className="flex flex-col items-center px-2"
            >
              <CiZoomOut className="text-2xl " />
              <span className="flex flex-col items-center  text-sm  max-w-max">
                Zoom Out
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

