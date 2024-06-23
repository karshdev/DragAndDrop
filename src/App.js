import React, { useState } from "react";
import "./App.css";
import DragImage from "./components/DragImage";
import Header from "./components/Header";
import Right from "./components/Right";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [shapes, setShapes] = useState([]);

  const addShape = (type) => {
    const containerWidth = 800;
    const containerHeight = 600;
    const shapes = {
      smartpier1: { width: 50, height: 50 },
      smartpier2: { width: 50, height: 100 },
      smartpier4: { width: 100, height: 100 },
      img1: { width: 100, height: 150 },
    };
    const shapeWidth = shapes[type].width;
    const shapeHeight = shapes[type].height;

    setShapes((prevShapes) => [
      ...prevShapes,
      {
        id: prevShapes.length + 1,
        type,
        x: shapeWidth,
        y: shapeHeight,
        width: shapeWidth,
        height: shapeHeight,
      },
    ]);
  };

  return (
    <>
      <Header setShapes={setShapes} />
      <Sidebar addShape={addShape} />
      <DragImage shapes={shapes} setShapes={setShapes} />
      <Right addShape={addShape} />
    </>
  );
};

export default App;
