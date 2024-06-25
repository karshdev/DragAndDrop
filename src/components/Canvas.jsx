import React, { useRef, useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { FaRotate } from "react-icons/fa6";
import { renderToStaticMarkup } from "react-dom/server";

const CanvasComponent = ({ shapes, setShapes }) => {
  const [hoveredShape, setHoveredShape] = useState(null);
  const { zoomLevel } = useContext(DataContext);
  const canvasRef = useRef(null);
  const [draggingShape, setDraggingShape] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [rotatingShape, setRotatingShape] = useState(null);
  const [images, setImages] = useState({});
  const [rotateIconImage, setRotateIconImage] = useState(null);
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
      loadImage("/assets/Smartpier1.svg"),
      loadImage("/assets/SmartPier2.svg"),
      loadImage("/assets/SmartPier4.svg"),
      loadImage("/assets/BG.svg"),
    ])
      .then(([connector, img1, smartpier1, smartpier2, smartpier4, bg]) => {
        setImages({
          connector,
          img1,
          smartpier1,
          smartpier2,
          smartpier4,
          bg,
        });
      })
      .catch((error) => console.error("Error loading images:", error));

    // const iconMarkup = renderToStaticMarkup(<FaRotate />);
    // const blob = new Blob([iconMarkup], { type: "image/svg+xml" });
    // const url = URL.createObjectURL(blob);
    // const iconImage = new Image();
    // iconImage.src = url;
    // iconImage.onload = () => {
    //   setRotateIconImage(iconImage);
    //   URL.revokeObjectURL(url); // Clean up object URL after image has loaded
    // };
  }, []);

  const drawGrid = (ctx, width, height, gridSize) => {
    ctx.save();
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  };

  const renderCanvas = (
    ctx,
    canvas,
    shapes,
    images,
    zoomLevel,
    canvasOffset,
    hoveredShape,
    selectedShape
  ) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (static background)
    drawGrid(ctx, canvas.width, canvas.height, 50);
    drawConnectors(ctx);

    // Draw each shape with zoom applied
    shapes.forEach((shape) => {
      const baseWidth =
        shape.type === "img1" ? 100 : shape.type === "smartpier4" ? 100 : 50;
      const baseHeight =
        shape.type === "img1" ? 150 : shape.type === "smartpier2" ? 100 : 50;
      const width = baseWidth * zoomLevel;
      const height = baseHeight * zoomLevel;
      const x = shape.x * zoomLevel;
      const y = shape.y * zoomLevel;

      // Draw shape or image
      if (shape.type === "img1" && images.img1) {
        drawImage(ctx, images.img1, { ...shape, x, y }, width, height);
      } else if (shape.type === "smartpier1" && images.smartpier1) {
        drawImage(ctx, images.smartpier1, { ...shape, x, y }, width, height);
      } else if (shape.type === "smartpier2" && images.smartpier2) {
        drawImage(ctx, images.smartpier2, { ...shape, x, y }, width, height);
      } else if (shape.type === "smartpier4" && images.smartpier4) {
        drawImage(ctx, images.smartpier4, { ...shape, x, y }, width, height);
      }

      // Draw hover effects if applicable
      if (hoveredShape && hoveredShape.id === shape.id) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
        ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
        ctx.fillRect(x, y, width, height);
      }

      // Draw measurements
      drawMeasurements(ctx, { ...shape, x, y, width, height });

      // Draw rotating curved arrows
      // drawCurvedArrow(ctx, x - width / 2, y - height / 2, 20, Math.PI * 0.5, Math.PI * 0.8, false);
    });
  };

  const drawShapes = (ctx) => {
    ctx.save(); // Save the current state before applying transformations
    ctx.setTransform(
      zoomLevel,
      0,
      0,
      zoomLevel,
      canvasOffset.x,
      canvasOffset.y
    ); // Apply the zoom level and offset

    if (images.bg) {
      // want to write without getting width and height
      // the node should not include the background, the bg should be static
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
      } else if (shape.type === "smartpier1" && images.smartpier1) {
        drawImage(ctx, images.smartpier1, shape, 50, 50);
      } else if (shape.type === "smartpier2" && images.smartpier2) {
        drawImage(ctx, images.smartpier2, shape, 50, 100);
      } else if (shape.type === "smartpier4" && images.smartpier4) {
        drawImage(ctx, images.smartpier4, shape, 100, 100);
      }

      // Draw measurements and rotate icon
      drawMeasurements(ctx, shape);
      drawRotateIcon(ctx, shape);

      // Draw yellow border and shade if shape is hovered
      if (hoveredShape && hoveredShape.id === shape.id) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          shape.x - 2,
          shape.y - 2,
          shape.type === "img1"
            ? 104
            : shape.type === "img2"
            ? 154
            : shape.type === "smartpier1"
            ? 50
            : shape.type === "smartpier2"
            ? 50
            : shape.type === "smartpier4"
            ? 100
            : 0,
          shape.type === "img1"
            ? 154
            : shape.type === "img2"
            ? 154
            : shape.type === "smartpier1"
            ? 50
            : shape.type === "smartpier2"
            ? 100
            : shape.type === "smartpier4"
            ? 100
            : 0
        );

        // Apply yellow shade mask with 20% opacity
        ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
        ctx.fillRect(
          shape.x,
          shape.y,
          shape.type === "img1"
            ? 104
            : shape.type === "img2"
            ? 154
            : shape.type === "smartpier1"
            ? 50
            : shape.type === "smartpier2"
            ? 50
            : shape.type === "smartpier4"
            ? 100
            : 0,
          shape.type === "img1"
            ? 154
            : shape.type === "img2"
            ? 154
            : shape.type === "smartpier1"
            ? 50
            : shape.type === "smartpier2"
            ? 100
            : shape.type === "smartpier4"
            ? 100
            : 0
        );
      }

      // Restore default styles
      ctx.strokeStyle = "black";
      ctx.fillStyle = "black";

      // Highlight shape if selected
      if (shape === selectedShape) {
        highlightShape(ctx, shape);
      }
    });

    ctx.restore(); // Restore the saved state
  };

  const drawImage = (ctx, image, shape, width, height) => {
    ctx.save();
    ctx.translate(shape.x + width / 2, shape.y + height / 2);
    ctx.rotate(shape.rotation || 0);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.restore();
  };

  const drawMeasurements = (ctx, shape) => {
    let width, height;
    if (shape.type === "img1") {
      width = 100;
      height = 150;
    } else if (shape.type === "smartpier1") {
      width = 50;
      height = 50;
    } else if (shape.type === "smartpier2") {
      width = 50;
      height = 100;
    } else if (shape.type === "smartpier4") {
      width = 100;
      height = 100;
    }

    ctx.save();
    ctx.translate(shape.x + width / 2, shape.y + height / 2);
    ctx.rotate(shape.rotation || 0);
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    let arrowSize = 10;
    // Draw width measurement on top
    ctx.beginPath();
    ctx.moveTo(-width / 2, -height / 2 - 20);
    ctx.lineTo(width / 2, -height / 2 - 20);
    ctx.stroke();

    // Draw arrows for width
    ctx.beginPath();
    ctx.moveTo(-width / 2, -height / 2 - 20);
    ctx.lineTo(-width / 2 + arrowSize, -height / 2 - 20 - arrowSize / 2);
    ctx.lineTo(-width / 2 + arrowSize, -height / 2 - 20 + arrowSize / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width / 2, -height / 2 - 20);
    ctx.lineTo(width / 2 - arrowSize, -height / 2 - 20 - arrowSize / 2);
    ctx.lineTo(width / 2 - arrowSize, -height / 2 - 20 + arrowSize / 2);
    ctx.closePath();
    ctx.fill();

    // Draw width text
    ctx.fillText(
      `${width}`,
      -ctx.measureText(`${width}`).width / 2,
      -height / 2 - 25
    );

    // Draw height measurement on the left
    ctx.beginPath();
    ctx.moveTo(-width / 2 - 20, -height / 2);
    ctx.lineTo(-width / 2 - 20, height / 2);
    ctx.stroke();

    // Draw arrows for height
    ctx.beginPath();
    ctx.moveTo(-width / 2 - 20, -height / 2);
    ctx.lineTo(-width / 2 - 20 - arrowSize / 2, -height / 2 + arrowSize);
    ctx.lineTo(-width / 2 - 20 + arrowSize / 2, -height / 2 + arrowSize);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-width / 2 - 20, height / 2);
    ctx.lineTo(-width / 2 - 20 - arrowSize / 2, height / 2 - arrowSize);
    ctx.lineTo(-width / 2 - 20 + arrowSize / 2, height / 2 - arrowSize);
    ctx.closePath();
    ctx.fill();

    // Draw height text
    ctx.save();
    ctx.translate(-width / 2 - 25, 0);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${height}`, -ctx.measureText(`${height}`).width / 2, 5);
    ctx.restore();

    ctx.restore();
  };

  const drawRotateIcon = (ctx, shape) => {
    if (!rotateIconImage) return;

    let width, height;
    if (shape.type === "img1") {
      width = 100;
      height = 150;
    } else if (shape.type === "img2") {
      width = 50;
      height = 50;
    }

    ctx.save();
    ctx.translate(shape.x + width / 2, shape.y + height / 2);
    ctx.rotate(shape.rotation || 0);
    ctx.drawImage(rotateIconImage, -10, -height / 2 - 25, 20, 20);
    ctx.restore();
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
    const distance = 1;

    const closeX =
      shape1.y === shape2.y &&
      (Math.abs(
        shape1.x -
          (shape2.x + (shape2.type === "img1" ? 100 : "smartpier4" ? 100 : 50))
      ) <= distance ||
        Math.abs(
          shape2.x -
            (shape1.x +
              (shape1.type === "img1"
                ? 100
                : "smartpier2" || "smartpier4"
                ? 100
                : 50))
        ) <= distance);

    const closeY =
      shape1.x === shape2.x &&
      (Math.abs(
        shape1.y -
          (shape2.y + (shape2.type === "img1" ? 150 : "smartpier4" ? 100 : 50))
      ) <= distance ||
        Math.abs(
          shape2.y -
            (shape1.y +
              (shape1.type === "img1"
                ? 150
                : "smartpier2" || "smartpier4"
                ? 100
                : 50))
        ) <= distance);

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
        ctx.drawImage(images.connector, imgX, imgY - 58, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY - 28, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY + 28, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY + 58, 20, 20);
      } else if (closeY) {
        ctx.drawImage(images.connector, imgX - 28, imgY, 20, 20);
        ctx.drawImage(images.connector, imgX, imgY, 20, 20);
        ctx.drawImage(images.connector, imgX + 28, imgY, 20, 20);
      }
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / zoomLevel - canvasOffset.x;
    const mouseY = (e.clientY - rect.top) / zoomLevel - canvasOffset.y;
    let foundShape = null;

    // Check if clicked on rotate icon or shape
    shapes.reverse().some((shape) => {
      const width =
        shape.type === "img1" || shape.type === "smartpier4" ? 100 : 50;
      const height =
        shape.type === "img1" ? 150 : shape.type === "smartpier2" ? 100 : 50;
      const rotateIconHit =
        mouseX >= shape.x + width / 2 - 10 &&
        mouseX <= shape.x + width / 2 + 10 &&
        mouseY >= shape.y - 25 &&
        mouseY <= shape.y - 5;

      if (
        rotateIconHit ||
        (mouseX >= shape.x &&
          mouseX <= shape.x + width &&
          mouseY >= shape.y &&
          mouseY <= shape.y + height)
      ) {
        foundShape = shape;
        return true; // Stop iteration
      }

      return false;
    });

    if (foundShape) {
      const width =
        foundShape.type === "img1" || foundShape.type === "smartpier4"
          ? 100
          : 50;
      const height =
        foundShape.type === "img1"
          ? 150
          : foundShape.type === "smartpier2"
          ? 100
          : 50;
      const rotateIconHit =
        mouseX >= foundShape.x + width / 2 - 10 &&
        mouseX <= foundShape.x + width / 2 + 10 &&
        mouseY >= foundShape.y - 25 &&
        mouseY <= foundShape.y - 5;

      if (rotateIconHit) {
        setRotatingShape({
          id: foundShape.id,
          startX: mouseX,
          startY: mouseY,
          startRotation: foundShape.rotation || 0,
        });
      } else {
        setSelectedShape(foundShape);
        setDraggingShape({
          id: foundShape.id,
          offsetX: mouseX - foundShape.x,
          offsetY: mouseY - foundShape.y,
        });
      }
    } else {
      // Clear selection and hover effects
      setLongPressTimeout(
        setTimeout(() => {
          setIsPanning(true);
          setPanStart({ x: e.clientX, y: e.clientY });
        }, 500)
      );
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / zoomLevel - canvasOffset.x;
    const mouseY = (e.clientY - rect.top) / zoomLevel - canvasOffset.y;

    if (draggingShape) {
      setShapes((prevShapes) => {
        return prevShapes.map((shape) => {
          if (shape.id === draggingShape.id) {
            const newX = mouseX - draggingShape.offsetX;
            const newY = mouseY - draggingShape.offsetY;

            let snapX = newX;
            let snapY = newY;

            prevShapes.forEach((otherShape) => {
              if (
                otherShape.id !== shape.id &&
                otherShape.type === shape.type
              ) {
                const shapes = {
                  smartpier1: { width: 50, height: 50 },
                  smartpier2: { width: 50, height: 100 },
                  smartpier4: { width: 100, height: 100 },
                  img1: { width: 100, height: 150 },
                };
                const width = shapes[shape.type].width;
                const height = shapes[shape.type].height;

                const horizontalSnap =
                  Math.abs(newX - otherShape.x) <= 20 ||
                  Math.abs(newX + width - otherShape.x) <= 20 ||
                  Math.abs(newX - otherShape.x - width) <= 20;
                const verticalSnap =
                  Math.abs(newY - otherShape.y) <= 20 ||
                  Math.abs(newY + height - otherShape.y) <= 20 ||
                  Math.abs(newY - otherShape.y - height) <= 20;

                let offset = 10;
                if (shape.type == "img1") {
                  offset = 0;
                }

                if (
                  horizontalSnap &&
                  Math.abs(newY - otherShape.y) < height / 2
                ) {
                  snapX =
                    newX < otherShape.x
                      ? otherShape.x - width + offset
                      : otherShape.x + width - offset;
                  snapY = otherShape.y;
                } else if (
                  verticalSnap &&
                  Math.abs(newX - otherShape.x) < width / 2
                ) {
                  snapY =
                    newY < otherShape.y
                      ? otherShape.y - height + offset
                      : otherShape.y + height - offset;
                  snapX = otherShape.x;
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
    } else if (rotatingShape) {
      setShapes((prevShapes) => {
        return prevShapes.map((shape) => {
          if (shape.id === rotatingShape.id) {
            const dx = mouseX - rotatingShape.startX;
            const dy = mouseY - rotatingShape.startY;
            const angle = Math.atan2(dy, dx);
            return {
              ...shape,
              rotation: rotatingShape.startRotation + angle,
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
    setRotatingShape(null);
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    clearTimeout(longPressTimeout);
    setDraggingShape(null);
    setRotatingShape(null);
    setIsPanning(false);
  };

  const canvasStyle = {
    display: "block",
    backgroundColor: "#fff",
    cursor: isPanning ? "grabbing" : "default",
    zIndex: 1,
    position: "relative",
  };

  const backgroundStyle = {
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    // Function to handle mouse move events to track hovered shape
    const handleMouseMove = (event) => {
      if (!canvasRef.current) return;

      // Calculate mouse position relative to canvas
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX =
        (event.clientX - rect.left) / zoomLevel - canvasOffset.x / zoomLevel;
      const mouseY =
        (event.clientY - rect.top) / zoomLevel - canvasOffset.y / zoomLevel;

      // Check if mouse is over any shape
      const foundHoveredShape = shapes.find((shape) => {
        const width =
          shape.type === "img1" || shape.type === "smartpier4" ? 100 : 50;
        const height =
          shape.type === "img1" ? 150 : shape.type === "smartpier2" ? 100 : 50;

        return (
          mouseX >= shape.x &&
          mouseX <= shape.x + width &&
          mouseY >= shape.y &&
          mouseY <= shape.y + height
        );
      });

      setHoveredShape(foundHoveredShape);
    };

    // Add event listeners for mouse move, down, and up
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseMove);

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseMove);
    };
  }, [shapes, zoomLevel, canvasOffset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      renderCanvas(
        ctx,
        canvas,
        shapes,
        images,
        zoomLevel,
        canvasOffset,
        hoveredShape,
        selectedShape
      );
    }
  }, [shapes, images, zoomLevel, canvasOffset, hoveredShape, selectedShape]);

  return (
    <div className="simulation">
      <canvas
        ref={canvasRef}
        width={10000}
        height={1000}
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
