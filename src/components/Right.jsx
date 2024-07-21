import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { MdDelete } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Right = ({ addShape, shapes, setShapes, saveStateToHistory }) => {
  const { t } = useTranslation();
  const {
    smartPierClicked,
    selectedShape,
    selectedShapeClick,
    setHistory,
    history,
    canvasRef,
    setSmartPierClicked,
  } = useContext(DataContext);
  const [onSelectToggle, setOnSelectToggle] = useState(false);
  const [orientation, setOrientation] = useState(
    selectedShape?.orientation ?? "Horizontal"
  );
  const dropdownRef = useRef(null);

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

  const onDelete = () => {
    const newShapeArray = shapes.filter((item) => item.id != selectedShape.id);
    setHistory([...history, shapes]);
    setShapes(newShapeArray);
  };
  const onDuplicate = () => {
    addShape(selectedShape.type);
    setHistory([...history, shapes]);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOnSelectToggle(false);
    }
  };

  useEffect(() => {
    setOrientation(selectedShape?.orientation ?? "Horizontal");
  }, [selectedShape]);

  useEffect(() => {
    if (onSelectToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onSelectToggle]);

  return (
    <aside
      id="logo-sidebar"
      className="fixed mt-[80px] border-l top-0 right-0 flex flex-col justify-between z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 bg-gray-800 border-gray-700"
      aria-label="Sidebar"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div style={{ height: "calc(50vh - 80px)" }}>
        {selectedShapeClick && (
          <div className="text-white p-4">
            <span>
              {t(`Set orientaion for pier`)} {selectedShape.id}
            </span>

            <select
              placeholder="Select the orientation"
              value={orientation}
              className="p-1 text-black border-none rounded w-full mt-2"
              onChange={(e) => handleOrientationChange(e.target.value)}
            >
              <option value="Vertical">Vertical</option>
              {["img1", "smartpier2"].includes(selectedShape.type) && (
                <option value="Horizontal">Horizontal</option>
              )}
            </select>
          </div>
        )}
        {smartPierClicked && (
          <div className=" w-full py-2 px-5">
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
                    ref={dropdownRef}
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
                          saveStateToHistory();
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
                          saveStateToHistory();
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
                          saveStateToHistory();
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
          </div>
        )}
      </div>
      {selectedShapeClick && (
        <div className="mb-2 mx-2 ">
          <button
            onClick={onDuplicate}
            className="flex items-center justify-center  w-full rounded-full border bg-sky-600 hover:bg-sky-700 p-2 my-2 text-white "
          >
            <span className="px-1">
              <IoDuplicateOutline />
            </span>
            {t(`duplicate`)}
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center rounded-full  w-full border border-[#721C24] bg-[#F8D7DA] hover:bg-red-300 p-2 my-2 text-[#721C24] "
          >
            <span className="px-1">
              <MdDelete />
            </span>
            {t(`delete`)}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Right;
