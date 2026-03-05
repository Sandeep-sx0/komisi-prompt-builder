"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLCanvasElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  width?: number;
  height?: number;
}

const FlickeringGrid = React.forwardRef<HTMLCanvasElement, FlickeringGridProps>(
  (
    {
      squareSize = 4,
      gridGap = 6,
      flickerChance = 0.3,
      color = "rgb(0, 0, 0)",
      maxOpacity = 0.3,
      width,
      height,
      className,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isInView, setIsInView] = useState(false);

    const setupCanvas = useCallback(
      (canvas: HTMLCanvasElement) => {
        const canvasWidth = width || canvas.clientWidth;
        const canvasHeight = height || canvas.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        const cols = Math.ceil(canvasWidth / (squareSize + gridGap));
        const rows = Math.ceil(canvasHeight / (squareSize + gridGap));

        const squares = new Float32Array(cols * rows);
        for (let i = 0; i < squares.length; i++) {
          squares[i] = Math.random() * maxOpacity;
        }

        return { cols, rows, squares, dpr };
      },
      [squareSize, gridGap, maxOpacity, width, height]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const observer = new IntersectionObserver(
        ([entry]) => setIsInView(entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(canvas);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !isInView) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let { cols, rows, squares, dpr } = setupCanvas(canvas);
      ctx.scale(dpr, dpr);

      let animationFrameId: number;

      const parseColor = (colorStr: string): [number, number, number] => {
        if (colorStr.startsWith("#")) {
          const hex = colorStr.slice(1);
          return [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
          ];
        }
        const match = colorStr.match(/\d+/g);
        return match
          ? [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])]
          : [0, 0, 0];
      };

      const [r, g, b] = parseColor(color);

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const index = i * rows + j;
            if (Math.random() < flickerChance) {
              squares[index] = Math.random() * maxOpacity;
            }
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${squares[index]})`;
            ctx.fillRect(
              i * (squareSize + gridGap),
              j * (squareSize + gridGap),
              squareSize,
              squareSize
            );
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();

      const handleResize = () => {
        ctx.resetTransform();
        ({ cols, rows, squares, dpr } = setupCanvas(canvas));
        ctx.scale(dpr, dpr);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
      };
    }, [isInView, squareSize, gridGap, flickerChance, color, maxOpacity, setupCanvas]);

    return (
      <canvas
        ref={(node) => {
          (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLCanvasElement | null>).current = node;
        }}
        className={cn("pointer-events-none", className)}
        {...props}
      />
    );
  }
);

FlickeringGrid.displayName = "FlickeringGrid";

export { FlickeringGrid };
