import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [smartPierClicked, setSmartPierClicked] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedShapeClick, setSelectedShapeClick] = useState(false);

  return (
    <DataContext.Provider
      value={{
        setZoomLevel,
        zoomLevel,
        setSmartPierClicked,
        smartPierClicked,
        selectedShape,
        setSelectedShape,
        selectedShapeClick,
        setSelectedShapeClick,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
