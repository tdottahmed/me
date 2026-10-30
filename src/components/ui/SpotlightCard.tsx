"use client";

import React, { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "var(--spotlight-color, rgba(255, 255, 255, 0.06))",
  onClick,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  // Write pointer position straight to CSS variables: no React re-render per mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        "group/spotlight relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-6 transition-[border-color,background-color,box-shadow,transform] duration-300",
        className
      )}
    >
      {/* Radial spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 group-focus-within/spotlight:opacity-100"
        style={{
          background: `radial-gradient(450px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
