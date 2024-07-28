import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";

const Sidebar = ({ addShape, saveStateToHistory }) => {
  const { setSmartPierClicked,selectedShape } = useContext(DataContext);
 
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 mt-[64px] left-0 z-40 w-64 h-screen py-4 transition-transform -translate-x-full border-r sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-6 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li
              onClick={() => {
                addShape("img1");
                saveStateToHistory();
                setSmartPierClicked(false);
              }}
            >
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 hover:text-gray-700 group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 text-[#62656a] group-hover:text-gray-700 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <button className="flex items-center p-2 rounded-lg hover:text-gray-700  group">
                
                <span className="text-[#62656a]">
                Easy pier
                  </span>
       
                </button>
              </a>
            </li>
            <li
              onClick={() => {
                setSmartPierClicked(true);
                saveStateToHistory();
              }}
            >
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 hover:text-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-[#62656a] transition duration-75 group-hover:text-gray-700 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <button className="flex items-center p-2 rounded-lg hover:text-gray-700  group">
              
                <span className="text-[#62656a]">
                 Smart Pier
                </span>
               
                </button>
              </a>
            </li>
          </ul>
          <div className="p-8 relative">
            {selectedShape?.type && (
              <div
                className="relative inline-block"
                style={{
                  transform: `${selectedShape.orientation === "Horizontal" ? "rotate(90deg)" : ""}`,
                }}
              >
                <img
                  src={`/assets/${
                    selectedShape.type === "img1"
                      ? "Easy_Pier.svg"
                      : selectedShape.type === "smartpier1"
                      ? "SmartPierModule1.svg"
                      : selectedShape.type === "smartpier2"
                      ? "SmartPierModule2.svg"
                      : "SmartPierModule4.svg"
                  }`}
                  height={selectedShape.height}
                  width={selectedShape.width}
                  alt="Selected Shape"
                />
                <div
                  className="absolute -top-2 left-1/2"
                  style={{
                    width: selectedShape.width,
                    height: "2px",
                    backgroundColor: "black",
                    transform: "translateX(-50%)",
                  }}
                />
                <div
                  className="absolute -top-2 left-1/2"
                  style={{
                    transform: "translateX(-50%) translateY(-20px)",
                    backgroundColor:"white",
                    padding: "0 2px",
                  }}
                >
                <span className="text-[13px]">
                {selectedShape.width}px
                </span>
                </div>
                <div
                  className="absolute top-1/2 -left-2"
                  style={{
                    width: "2px",
                    height: selectedShape.height,
                    backgroundColor: "black",
                    transform: "translateY(-50%)",
                  }}
                />
                <div
                  className="absolute top-1/2 -left-1"
                  style={{
                    transform: "translateY(-50%) translateX(-30px) rotate(-90deg)",
                    backgroundColor: "white",
                    padding: "0 2px",
                  }}
                >
     <span className="text-[13px]">
     {selectedShape.height}px
     </span>
                </div>
              </div>
            )}
          </div>
          <img src="/assets/logo.svg" alt="logo" height={75} width={75} className="absolute top-[550px]" />

        </div>

      <div>

      </div>
    
      </aside>
    </>
  );
};

export default Sidebar;
