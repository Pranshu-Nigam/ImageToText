import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [48, 27], // Default 1920x1080 equivalent
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Since the grid is fixed to the viewport, we only need viewport coordinates
      const x = e.clientX;
      const y = e.clientY;
      
      const col = Math.floor(x / width);
      const row = Math.floor(y / height);
      
      if (col >= 0 && col < horizontal && row >= 0 && row < vertical) {
        setHoveredSquare(row * horizontal + col);
      } else {
        setHoveredSquare(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [width, height, horizontal, vertical]);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full border",
        className
      )}
      style={{ borderColor: "var(--grid-line)" }}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "transition-colors ease-in-out",
              hoveredSquare === index 
                ? "duration-100 fill-primary/40" 
                : "duration-1000 fill-transparent",
              squaresClassName
            )}
            style={{ stroke: "var(--grid-line)" }}
          />
        );
      })}
    </svg>
  );
}
