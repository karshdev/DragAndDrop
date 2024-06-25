import React from "react";
import CanvasComponent from "./Canvas";

const DragImage = ({ shapes, setShapes }) => {
  return <CanvasComponent shapes={shapes} setShapes={setShapes} />;
};

export default DragImage;
