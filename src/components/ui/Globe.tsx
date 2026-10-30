"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let animationFrameId = 0;
    let visible = false;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: (width || 300) * dpr,
      height: (width || 300) * dpr,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.18, 0.18, 0.2],
      markerColor: [0.95, 0.95, 0.98],
      glowColor: [0.25, 0.25, 0.28],
      markers: [
        // Dhaka, Bangladesh (Imjol IT, Sultan Big Bazaar, Fur & Feather BD, PONDIT)
        { location: [23.8103, 90.4125], size: 0.1 },
        // Toronto, Canada (Zamzam Import & Export Inc.)
        { location: [43.6532, -79.3832], size: 0.08 },
      ],
    });

    const animate = () => {
      if (!pointerInteracting.current) {
        phi += 0.005;
      }
      globe.update({
        phi: phi + pointerInteractionMovement.current,
        width: (width || 300) * dpr,
        height: (width || 300) * dpr,
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Only spend GPU time on the WebGL globe while it is actually on screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        animationFrameId = requestAnimationFrame(animate);
      } else if (!entry.isIntersecting && visible) {
        visible = false;
        cancelAnimationFrame(animationFrameId);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        className="h-full w-full cursor-grab transition-opacity duration-500"
        style={{ width: "100%", height: "100%", maxWidth: "340px", aspectRatio: 1 }}
      />
    </div>
  );
}
