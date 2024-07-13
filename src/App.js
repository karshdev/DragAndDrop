import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import DragImage from "./components/DragImage";
import Header from "./components/Header";
import Right from "./components/Right";
import Sidebar from "./components/Sidebar";
import AttentionModal from "./components/AttentionModal";
import { DataContext } from "./context/DataContext";

const App = () => {
  const { setHistory, history } = useContext(DataContext);

  const [shapes, setShapes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const canvasWidth = 1000;
  const canvasHeight = 610;

  const addShape = (type) => {
    const shape = {
      smartpier1: { width: 50, height: 50 },
      smartpier2: { width: 50, height: 100 },
      smartpier4: { width: 100, height: 100 },
      img1: { width: 100, height: 150 },
    };
    const shapeWidth = shape[type].width;
    const shapeHeight = shape[type].height;

    const centerX = (canvasWidth - shapeWidth) / 2;
    const centerY = (canvasHeight - shapeHeight) / 2;

    setShapes((prevShapes) => [
      ...prevShapes,
      {
        id: prevShapes.length + 1,
        type,
        x: centerX,
        y: centerY,
        width: shapeWidth,
        height: shapeHeight,
        orientation: "Vertical",
      },
    ]);
  };

  const saveStateToHistory = () => {
    setHistory([...history, shapes]);
  };

  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setHistory(history.slice(0, history.length - 1));
      setShapes(lastState);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {isMobile && (
        <div id="app">
          <AttentionModal />
        </div>
      )}
      {!isMobile && (
        <div id="app">
          <Header setShapes={setShapes} undo={undo} />
          <Sidebar
            addShape={addShape}
            saveStateToHistory={saveStateToHistory}
          />
          <DragImage shapes={shapes} setShapes={setShapes} />
          <Right
            addShape={addShape}
            shapes={shapes}
            setShapes={setShapes}
            saveStateToHistory={saveStateToHistory}
          />
        </div>
      )}
    </>
  );
};

export default App;
