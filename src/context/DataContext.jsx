import React, {  createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <DataContext.Provider value={{ setZoomLevel, zoomLevel }}>
      {children}
    </DataContext.Provider>
  );
};

