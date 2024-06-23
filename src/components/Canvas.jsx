import React, { useRef, useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

const CanvasComponent = ({ shapes, setShapes }) => {
  const { zoomLevel } = useContext(DataContext);
  const canvasRef = useRef(null);
  const [draggingShape, setDraggingShape] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [images, setImages] = useState({});
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [longPressTimeout, setLongPressTimeout] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawShapes(ctx);
  }, [shapes, images, zoomLevel, canvasOffset]);

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    Promise.all([
      loadImage("/assets/EasyPier_Connect.svg"),
      loadImage("/assets/EasyPier_New.svg"),
      loadImage("/assets/SmartPier_New.svg"),
      loadImage("/assets/BG.svg"),
    ])
      .then(([connector, img1, img2, bg]) => {
        setImages({
          connector,
          img1,
          img2,
          bg,
        });
      })
      .catch((error) => console.error("Error loading images:", error));
  }, []);

  const drawShapes = (ctx) => {
    ctx.save(); // Save the current state before applying transformations
    ctx.setTransform(zoomLevel, 0, 0, zoomLevel, canvasOffset.x, canvasOffset.y); // Apply the zoom level and offset

    if (images.bg) {
      ctx.drawImage(
        images.bg,
        0,
        0,
        canvasRef.current.width / zoomLevel,
        canvasRef.current.height / zoomLevel
      );
    } else {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    drawConnectors(ctx);

    shapes.forEach((shape) => {
      if (shape.type === "img1" && images.img1) {
        drawImage(ctx, images.img1, shape, 100, 150);
      } else if (shape.type === "img2" && images.img2) {
        drawImage(ctx, images.img2, shape, 50, 50);
      }
      drawMeasurements(ctx, shape);

      if (shape === selectedShape) {
        highlightShape(ctx, shape);
      }
    });

    ctx.restore(); // Restore the state to the original after drawing
  };

  const drawImage = (ctx, image, shape, width, height) => {
    ctx.drawImage(image, shape.x, shape.y, width, height);
  };

  const drawMeasurements = (ctx, shape) => {
    let width, height;
    if (shape.type === "img1") {
      width = 100;
      height = 150;
    } else if (shape.type === "img2") {
      width = 50;
      height = 50;
    }

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`(${width}x${height})`, shape.x, shape.y - 5);
  };

  const highlightShape = (ctx, shape) => {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      shape.x - 2,
      shape.y - 2,
      shape.type === "img1" ? 104 : 54,
      shape.type === "img2" ? 154 : 54
    );
  };

  const drawConnectors = (ctx) => {
    shapes.forEach((shape, index) => {
      shapes.slice(index + 1).forEach((otherShape) => {
        if (shape.type === otherShape.type) {
          const { closeX, closeY } = isClose(shape, otherShape);
          if (closeX || closeY) {
            drawConnector(ctx, shape, otherShape, closeX, closeY);
          }
        }
      });
    });
  };

  const isClose = (shape1, shape2) => {
    const distance = 1; // Adjust this value as needed

    const closeX =
      shape1.y === shape2.y &&
      (Math.abs(shape1.x - (shape2.x + (shape2.type === "img1" ? 100 : 50))) <=
        distance ||
        Math.abs(shape2.x - (shape1.x + (shape1.type === "img1" ? 100 : 50))) <=
          distance);

    const closeY =
      shape1.x === shape2.x &&
      (Math.abs(shape1.y - (shape2.y + (shape2.type === "img1" ? 150 : 50))) <=
        distance ||
        Math.abs(shape2.y - (shape1.y + (shape1.type === "img1" ? 150 : 50))) <=
          distance);

    return { closeX, closeY };
  };

  const drawConnector = (ctx, shape1, shape2, closeX, closeY) => {
    const x1 = shape1.x + (shape1.type === "img1" ? 50 : 25);
    const y1 = shape1.y + (shape1.type === "img1" ? 75 : 25);
    const x2 = shape2.x + (shape2.type === "img1" ? 50 : 25);
    const y2 = shape2.y + (shape2.type === "img1" ? 75 : 25);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "black";
    ctx.stroke();

    const imgX = (x1 + x2) / 2 - 10;
    const imgY = (y1 + y2) / 2 - 10;

    if (images.connector && shape1.type === "img1") {
      if (closeX) {
        // Draw 5 images horizontally
        ctx.drawImage(images.connector, imgX, imgY - 58, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY - 28, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY + 28, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY + 58, 20, 20);
      } else if (closeY) {
        // Draw 3 images vertically
        ctx.drawImage(images.connector, imgX - 28, imgY, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY, 20, 20);
        ctx.drawImage(images.connector, imgX + 28, imgY, 20, 20);
      }
    } else if (images.connector && shape1.type === "img2") {
      if (closeX) {
        // Draw 5 orange circles horizontally
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(imgX + 10, imgY - 15, 9, 0, 2 * Math.PI); // Draw circle at the top
        ctx.fill();

        ctx.beginPath();
        ctx.arc(imgX + 10, imgY + 35, 9, 0, 2 * Math.PI); // Draw circle at the bottom
        ctx.fill();
      } else if (closeY) {
        // Draw 3 orange circles vertically
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(imgX - 15, imgY + 10, 9, 0, 2 * Math.PI); // Draw circle on the left
        ctx.fill();

        ctx.beginPath();
        ctx.arc(imgX + 35, imgY + 10, 9, 0, 2 * Math.PI); // Draw circle on the right
        ctx.fill();
      }
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / zoomLevel - canvasOffset.x; // Adjust for zoom level and offset
    const mouseY = (e.clientY - rect.top) / zoomLevel - canvasOffset.y; // Adjust for zoom level and offset

    const shape = shapes.find((shape) => {
      const width = shape.type === "img1" ? 100 : 50;
      const height = shape.type === "img1" ? 150 : 50;
      return (
        mouseX >= shape.x &&
        mouseX <= shape.x + width &&
        mouseY >= shape.y &&
        mouseY <= shape.y + height
      );
    });

    if (shape) {
      setSelectedShape(shape);
      setDraggingShape({
        id: shape.id,
        offsetX: mouseX - shape.x,
        offsetY: mouseY - shape.y,
      });
    } else {
      setLongPressTimeout(
        setTimeout(() => {
          setIsPanning(true);
          setPanStart({ x: e.clientX, y: e.clientY });
        }, 500) // Long press duration (500ms)
      );
    }
  };

  const handleMouseMove = (e) => {
    if (draggingShape) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / zoomLevel - canvasOffset.x; // Adjust for zoom level and offset
      const mouseY = (e.clientY - rect.top) / zoomLevel - canvasOffset.y; // Adjust for zoom level and offset

      setShapes((prevShapes) => {
        return prevShapes.map((shape) => {
          if (shape.id === draggingShape.id) {
            const newX = mouseX - draggingShape.offsetX;
            const newY = mouseY - draggingShape.offsetY;

            // Check for snapping
            let snapX = newX;
            let snapY = newY;

            prevShapes.forEach((otherShape) => {
              if (otherShape.id !== shape.id && otherShape.type === shape.type) {
                const width = shape.type === "img1" ? 100 : 50;
                const height = shape.type === "img1" ? 150 : 50;

                const horizontalSnap =
                  Math.abs(newX - otherShape.x) <= 20 ||
                  Math.abs(newX + width - otherShape.x) <= 20 ||
                  Math.abs(newX - otherShape.x - width) <= 20;
                const verticalSnap =
                  Math.abs(newY - otherShape.y) <= 20 ||
                  Math.abs(newY + height - otherShape.y) <= 20 ||
                  Math.abs(newY - otherShape.y - height) <= 20;

                if (
                  horizontalSnap &&
                  Math.abs(newY - otherShape.y) < height / 2
                ) {
                  snapX =
                    newX < otherShape.x
                      ? otherShape.x - width
                      : otherShape.x + width;
                  snapY = otherShape.y; // Align vertically
                } else if (
                  verticalSnap &&
                  Math.abs(newX - otherShape.x) < width / 2
                ) {
                  snapY =
                    newY < otherShape.y
                      ? otherShape.y - height
                      : otherShape.y + height;
                  snapX = otherShape.x; // Align horizontally
                }
              }
            });

            return {
              ...shape,
              x: snapX,
              y: snapY,
            };
          }
          return shape;
        });
      });
    } else if (isPanning) {
      const dx = (e.clientX - panStart.x) / zoomLevel;
      const dy = (e.clientY - panStart.y) / zoomLevel;
      setPanStart({ x: e.clientX, y: e.clientY });
      setCanvasOffset((prevOffset) => ({
        x: prevOffset.x + dx,
        y: prevOffset.y + dy,
      }));
    }
  };

  const handleMouseUp = () => {
    clearTimeout(longPressTimeout);
    setDraggingShape(null);
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    clearTimeout(longPressTimeout);
    setDraggingShape(null);
    setIsPanning(false);
  };

  const canvasStyle = {
    border: "1px solid #ccc",
    display: "block",
    backgroundColor: "#fff",
    cursor: isPanning ? "grabbing" : "default",
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={610}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={canvasStyle}
      />
    </div>
  );
};

export default CanvasComponent;

