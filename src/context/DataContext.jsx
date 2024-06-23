import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [smartPierClicked, setSmartPierClicked] = useState(false);

  return (
    <DataContext.Provider
      value={{ setZoomLevel, zoomLevel, setSmartPierClicked, smartPierClicked }}
    >
      {children}
    </DataContext.Provider>
  );
};

