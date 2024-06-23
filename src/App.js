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
    const shapeWidth = 200; 
    const shapeHeight = 200; 

    setShapes((prevShapes) => [
      ...prevShapes,
      {
        id: prevShapes.length + 1,
        type,
        x: (containerWidth - shapeWidth) / 2,
        y: (containerHeight - shapeHeight) / 2, 
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
