import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Right = ({ addShape, shapes, setShapes }) => {
  const { t } = useTranslation();
  const {
    smartPierClicked,
    setSmartPierClicked,
    selectedShape,
    setSelectedShape,
    selectedShapeClick,
    setSelectedShapeClick,
  } = useContext(DataContext);
  const [onSelectToggle, setOnSelectToggle] = useState(false);
  const [orientation, setOrientation] = useState(
    selectedShape?.orientation ?? "Horizontal"
  );

  const handleOrientationChange = (newOrientation) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        const shapeFound = {
          ...shape,
          orientation: newOrientation,
        };

        setOrientation(shapeFound.orientation);
        return shapeFound;
      }
      return shape;
    });
    setShapes(newShapes);
  };

  useEffect(() => {
    setOrientation(selectedShape?.orientation ?? "Horizontal");
  }, [selectedShape]);

  return (
    <aside
      id="logo-sidebar"
      className="fixed mt-[80px] border-l top-0 right-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      {selectedShapeClick && (
        <div className="text-white p-4">
          <span>Set orientation for Pier#{selectedShape.id}</span>
          <select
            placeholder="Select the orientation"
            value={orientation}
            className="p-1 text-black border-none rounded w-full mt-2"
            onChange={(e) => handleOrientationChange(e.target.value)}
          >
            <option value="Horizontal">Horizontal</option>
            <option value="Vertical">Vertical</option>
          </select>
        </div>
      )}
      {smartPierClicked && (
        <div
          className=" flex flex-col w-full justify-between py-2 px-5 overflow-y-auto bg-white dark:bg-gray-800"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="text-white">
            <div>
              {t(`image`)} : <strong>Smart Pier</strong>
            </div>
            <div className="relative text-left mt-4">
              <div className="w-full">
                <button
                  onClick={() => setOnSelectToggle(!onSelectToggle)}
                  type="button"
                  className="flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {t(`selectModule`)}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {onSelectToggle && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      onClick={() => {
                        addShape("smartpier1");
                        setOnSelectToggle(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      {t(`1module`)}
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        addShape("smartpier2");
                        setOnSelectToggle(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      {t(`2module`)}
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        addShape("smartpier4");
                        setOnSelectToggle(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      {t(`4module`)}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4 ">
            <button className="rounded-lg w-full border bg-sky-600 hover:bg-sky-700 p-2 my-2 text-white ">
              {t(`duplicate`)}
            </button>
            <button className="flex items-center justify-center rounded-lg w-full border border-[#721C24] bg-[#F8D7DA] hover:bg-red-300 p-2 my-2 text-[#721C24] ">
              <span className="px-1">
                <MdDelete />
              </span>
              {t(`delete`)}
            </button>
          </div>
        </div>
      )}
      {!smartPierClicked && (
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li onClick={() => addShape("img1")}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  Easy Pier
                </button>
              </a>
            </li>
            <li onClick={() => setSmartPierClicked(true)}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  Smart Pier
                </button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Right;
