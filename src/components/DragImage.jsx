import React from "react";
import CanvasComponent from "./Canvas";

const DragImage = ({ shapes, setShapes }) => {
  return (
    <div className="ml-[256px] mr-[256px]">
      <CanvasComponent shapes={shapes} setShapes={setShapes}  />
    </div>
  );
};

export default DragImage;

