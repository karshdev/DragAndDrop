import React, { useState } from "react";
import "./App.css";
import DragImage from "./components/DragImage";
import Header from "./components/Header";
import Right from "./components/Right";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);

  const canvasWidth = 1000;
  const canvasHeight = 610;

  const addShape = (type) => {
    const shapes = {
      smartpier1: { width: 50, height: 50 },
      smartpier2: { width: 50, height: 100 },
      smartpier4: { width: 100, height: 100 },
      img1: { width: 100, height: 150 },
    };
    const shapeWidth = shapes[type].width;
    const shapeHeight = shapes[type].height;

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
    console.log("Clicked");
    if (history.length > 0) {
      console.log("history.length", history.length);

      const lastState = history[history.length - 1];
      setHistory(history.slice(0, history.length - 1));
      setShapes(lastState);
    }
  };
  return (
    <>
      <div id="app">
        <Header setShapes={setShapes} undo={undo} />
        <Sidebar addShape={addShape} saveStateToHistory={saveStateToHistory} />
        <DragImage shapes={shapes} setShapes={setShapes} />
        <Right addShape={addShape} shapes={shapes} setShapes={setShapes} />
      </div>
    </>
  );
};

export default App;
