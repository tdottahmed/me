"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function AmbientGlowOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const orb3 = orb3Ref.current;
    if (!orb1 || !orb2 || !orb3) return;

    // Fast, zero-allocation mouse tracking with gsap.quickTo
    const xQuick1 = gsap.quickTo(orb1, "x", { duration: 1.2, ease: "power2.out" });
    const yQuick1 = gsap.quickTo(orb1, "y", { duration: 1.2, ease: "power2.out" });

    const xQuick2 = gsap.quickTo(orb2, "x", { duration: 1.6, ease: "power2.out" });
    const yQuick2 = gsap.quickTo(orb2, "y", { duration: 1.6, ease: "power2.out" });

    const xQuick3 = gsap.quickTo(orb3, "x", { duration: 2.0, ease: "power2.out" });
    const yQuick3 = gsap.quickTo(orb3, "y", { duration: 2.0, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = e.clientX - innerWidth / 2;
      const offsetY = e.clientY - innerHeight / 2;

      // Parallax mouse offsets with depth hierarchy
      xQuick1(offsetX * 0.12);
      yQuick1(offsetY * 0.12);

      xQuick2(offsetX * -0.09);
      yQuick2(offsetY * -0.09);

      xQuick3(offsetX * 0.05);
      yQuick3(offsetY * 0.05);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Organic ambient breathing oscillation timeline
    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    idleTl
      .to(orb1, {
        scale: 1.15,
        opacity: "+=0.03",
        duration: 7,
        ease: "sine.inOut",
      })
      .to(
        orb2,
        {
          scale: 0.88,
          opacity: "-=0.02",
          duration: 9,
          ease: "sine.inOut",
        },
        0
      )
      .to(
        orb3,
        {
          scale: 1.2,
          opacity: "+=0.02",
          duration: 11,
          ease: "sine.inOut",
        },
        0
      );

    // Battery / CPU conservation: pause timelines when tab is blurred
    const handleVisibilityChange = () => {
      if (document.hidden) {
        idleTl.pause();
      } else {
        idleTl.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      idleTl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Orb 1: Primary Monochrome Atmosphere (Top-Center / Left) */}
      <div
        ref={orb1Ref}
        className="absolute -top-[10%] left-[15%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.01)_45%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_45%,transparent_70%)] blur-[110px] transform-gpu will-change-transform"
      />

      {/* Orb 2: Secondary Monochrome Depth (Right-Center) */}
      <div
        ref={orb2Ref}
        className="absolute top-[35%] -right-[8%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.035)_0%,rgba(0,0,0,0.008)_45%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.015)_45%,transparent_70%)] blur-[130px] transform-gpu will-change-transform"
      />

      {/* Orb 3: Tertiary Ambient Core (Lower-Left) */}
      <div
        ref={orb3Ref}
        className="absolute top-[68%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.006)_45%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.01)_45%,transparent_70%)] blur-[120px] transform-gpu will-change-transform"
      />
    </div>
  );
}
