"use client";

import React, { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltGlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
}

// 3D tilt + cursor-tracking glow border. Pointer state is written straight to
// CSS variables / inline transform, so hovering never re-renders React.
export function TiltGlowCard({
  children,
  className,
  glowColor = "rgba(255, 255, 255, 0.12)",
  maxTilt = 6,
}: TiltGlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(900px) rotateX(${-py * maxTilt}deg) rotateY(${px * maxTilt}deg) translateZ(0)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ "--glow": glowColor } as React.CSSProperties}
      className={cn(
        "glow-border group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] transition-transform duration-300 ease-out will-change-transform",
        className
      )}
    >
      {/* Soft inner light that follows the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--glow) 14%, transparent), transparent 55%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
