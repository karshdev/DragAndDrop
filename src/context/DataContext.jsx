import React, { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lang, setLang] = useState("en");
  const [smartPierClicked, setSmartPierClicked] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedShapeClick, setSelectedShapeClick] = useState(false);

  const changeLanguage = (lng) => {
    setLang(lng);
    i18n.changeLanguage(lng);
    console.log(lng);
  };

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
        changeLanguage,
        lang,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
