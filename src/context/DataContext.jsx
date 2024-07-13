import React, { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lang, setLang] = useState("pt");
  const [smartPierClicked, setSmartPierClicked] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedShapeClick, setSelectedShapeClick] = useState(false);
  const [submitClicked, setSubmitClicked] = useState({
    toggle: false,
    email: "",
  });
  const changeLanguage = (lng) => {
    setLang(lng);
    i18n.changeLanguage(lng);
    console.log(lng);
  };

  useEffect(() => {
    if (selectedShape != null && selectedShape.type == "img1")
      setSmartPierClicked(false);
  }, [selectedShape]);

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
        setSubmitClicked,
        submitClicked,
        setHistory,
        history,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
