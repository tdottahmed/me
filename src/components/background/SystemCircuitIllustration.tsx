"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SystemCircuitIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulse1Ref = useRef<SVGPathElement>(null);
  const pulse2Ref = useRef<SVGPathElement>(null);
  const pulse3Ref = useRef<SVGPathElement>(null);
  const pulse4Ref = useRef<SVGPathElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const p1 = pulse1Ref.current;
      const p2 = pulse2Ref.current;
      const p3 = pulse3Ref.current;
      const p4 = pulse4Ref.current;
      const nodes = nodesRef.current;

      const circuitTimeline = gsap.timeline({ repeat: -1 });

      // Flowing data packets along SVG conduits
      if (p1) {
        circuitTimeline.to(
          p1,
          {
            strokeDashoffset: -1200,
            duration: 9,
            ease: "none",
          },
          0
        );
      }

      if (p2) {
        circuitTimeline.to(
          p2,
          {
            strokeDashoffset: -1400,
            duration: 11,
            ease: "none",
          },
          1.5
        );
      }

      if (p3) {
        circuitTimeline.to(
          p3,
          {
            strokeDashoffset: -1100,
            duration: 8.5,
            ease: "none",
          },
          3
        );
      }

      if (p4) {
        circuitTimeline.to(
          p4,
          {
            strokeDashoffset: -1300,
            duration: 10,
            ease: "none",
          },
          4.2
        );
      }

      // Pulsing architecture junction rings
      if (nodes) {
        const rings = nodes.querySelectorAll(".node-ring");
        gsap.to(rings, {
          scale: 2.2,
          opacity: 0,
          transformOrigin: "center center",
          stagger: {
            each: 1.2,
            repeat: -1,
          },
          duration: 2.4,
          ease: "power2.out",
        });
      }

      // Vertical Parallax via GSAP ScrollTrigger
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }

      // Conserve battery on background tab
      const handleVisibilityChange = () => {
        if (document.hidden) {
          gsap.globalTimeline.pause();
        } else {
          gsap.globalTimeline.play();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu will-change-transform"
    >
      <svg
        className="h-full w-full text-black dark:text-white opacity-70 dark:opacity-85 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_40%,#000_40%,transparent_100%)]"
        viewBox="0 0 1440 1800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          {/* Monochrome Pulse 1: Primary High-Intensity B&W Stream */}
          <linearGradient id="bw-pulse-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          {/* Monochrome Pulse 2: Secondary Medium B&W Stream */}
          <linearGradient id="bw-pulse-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.75" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          {/* Monochrome Pulse 3: Ambient Stream */}
          <linearGradient id="bw-pulse-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.85" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          {/* Monochrome Pulse 4: Crisp Focus Stream */}
          <linearGradient id="bw-pulse-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          {/* Filter for subtle glow bloom */}
          <filter id="circuit-bloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.0" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* BASE STATIC ARCHITECTURAL CIRCUIT PATHS (Black & White)   */}
        {/* ======================================================== */}
        <g className="stroke-black/[0.12] dark:stroke-white/[0.12]" strokeWidth="1.2">
          {/* Path 1: Left Ingress & Edge Bus (Client -> Proxy -> App) */}
          <path
            d="M 120 0 V 280 L 220 380 V 750 L 160 810 V 1350 L 240 1430 V 1800"
            strokeDasharray="4 6"
          />

          {/* Path 2: Left-Center Core Queue Pipeline (Horizon / Redis Stream) */}
          <path
            d="M 380 0 V 220 L 480 320 V 620 L 360 740 V 1100 L 460 1200 V 1800"
            strokeDasharray="3 5"
          />

          {/* Path 3: Right-Center WebSocket Reverb Real-Time Channel */}
          <path
            d="M 1060 0 V 310 L 960 410 V 780 L 1080 900 V 1260 L 980 1360 V 1800"
            strokeDasharray="3 5"
          />

          {/* Path 4: Right Data Ledger & Storage Bus (Postgres Locks & Backups) */}
          <path
            d="M 1320 0 V 190 L 1220 290 V 690 L 1280 750 V 1180 L 1200 1260 V 1800"
            strokeDasharray="4 6"
          />

          {/* Cross-Network Bridges (Horizontal Topology Interconnects) */}
          <path d="M 220 380 H 480" strokeDasharray="2 4" strokeWidth="0.8" className="stroke-black/[0.08] dark:stroke-white/[0.08]" />
          <path d="M 960 410 H 1220" strokeDasharray="2 4" strokeWidth="0.8" className="stroke-black/[0.08] dark:stroke-white/[0.08]" />
          <path d="M 360 740 C 500 740, 600 810, 720 810 C 840 810, 940 780, 1080 780" strokeDasharray="4 4" strokeWidth="0.8" className="stroke-black/[0.08] dark:stroke-white/[0.08]" />
          <path d="M 460 1200 H 980" strokeDasharray="2 4" strokeWidth="0.8" className="stroke-black/[0.08] dark:stroke-white/[0.08]" />
        </g>

        {/* ======================================================== */}
        {/* ACTIVE GSAP DATA PACKET PULSES (Black in Light, White in Dark) */}
        {/* ======================================================== */}
        <g strokeWidth="2.5" strokeLinecap="round" filter="url(#circuit-bloom)">
          {/* Pulse 1: Data Stream on Left Edge */}
          <path
            ref={pulse1Ref}
            d="M 120 0 V 280 L 220 380 V 750 L 160 810 V 1350 L 240 1430 V 1800"
            stroke="url(#bw-pulse-1)"
            strokeDasharray="160 1200"
            strokeDashoffset="0"
          />

          {/* Pulse 2: Queue Stream on Center-Left */}
          <path
            ref={pulse2Ref}
            d="M 380 0 V 220 L 480 320 V 620 L 360 740 V 1100 L 460 1200 V 1800"
            stroke="url(#bw-pulse-2)"
            strokeDasharray="180 1400"
            strokeDashoffset="0"
          />

          {/* Pulse 3: WebSocket Stream on Center-Right */}
          <path
            ref={pulse3Ref}
            d="M 1060 0 V 310 L 960 410 V 780 L 1080 900 V 1260 L 980 1360 V 1800"
            stroke="url(#bw-pulse-3)"
            strokeDasharray="150 1100"
            strokeDashoffset="0"
          />

          {/* Pulse 4: Event-Ledger Stream on Right Bus */}
          <path
            ref={pulse4Ref}
            d="M 1320 0 V 190 L 1220 290 V 690 L 1280 750 V 1180 L 1200 1260 V 1800"
            stroke="url(#bw-pulse-4)"
            strokeDasharray="170 1300"
            strokeDashoffset="0"
          />
        </g>

        {/* ======================================================== */}
        {/* TOPOLOGICAL NODES (Black & White Architecture Junctions) */}
        {/* ======================================================== */}
        <g ref={nodesRef}>
          {/* Node 1: Ingress Edge Gateway (220, 380) */}
          <g transform="translate(220, 380)">
            <circle className="node-ring stroke-black/40 dark:stroke-white/50" r="10" fill="none" strokeWidth="1" />
            <circle r="4" className="fill-black dark:fill-white" />
            <circle r="1.5" className="fill-white dark:fill-black" />
          </g>

          {/* Node 2: Queue Broker / Redis (480, 320) */}
          <g transform="translate(480, 320)">
            <circle className="node-ring stroke-black/40 dark:stroke-white/50" r="10" fill="none" strokeWidth="1" />
            <circle r="4" className="fill-black dark:fill-white" />
            <circle r="1.5" className="fill-white dark:fill-black" />
          </g>

          {/* Node 3: Real-Time WebSocket Hub (960, 410) */}
          <g transform="translate(960, 410)">
            <circle className="node-ring stroke-black/40 dark:stroke-white/50" r="10" fill="none" strokeWidth="1" />
            <circle r="4" className="fill-black dark:fill-white" />
            <circle r="1.5" className="fill-white dark:fill-black" />
          </g>

          {/* Node 4: Persistence Row-Lock Matrix (1220, 290) */}
          <g transform="translate(1220, 290)">
            <circle className="node-ring stroke-black/40 dark:stroke-white/50" r="10" fill="none" strokeWidth="1" />
            <circle r="4" className="fill-black dark:fill-white" />
            <circle r="1.5" className="fill-white dark:fill-black" />
          </g>

          {/* Node 5: Central Cross-Region Bridge (720, 810) */}
          <g transform="translate(720, 810)">
            <circle className="node-ring stroke-black/35 dark:stroke-white/45" r="12" fill="none" strokeWidth="1" />
            <circle r="4.5" className="fill-black dark:fill-white" />
            <circle r="1.5" className="fill-white dark:fill-black" />
          </g>

          {/* Node 6: Deep Storage Archive (460, 1200) */}
          <g transform="translate(460, 1200)">
            <circle className="node-ring stroke-black/40 dark:stroke-white/50" r="10" fill="none" strokeWidth="1" />
            <circle r="4" className="fill-black dark:fill-white" />
            <circle r="1.5" className="fill-white dark:fill-black" />
          </g>

          {/* Node 7: Telemetry Ingest (980, 1360) */}
          <g transform="translate(980, 1360)">
            <circle className="node-ring stroke-black/40 dark:stroke-white/50" r="10" fill="none" strokeWidth="1" />
            <circle r="4" className="fill-black dark:fill-white" />
            <circle r="1.5" className="fill-white dark:fill-black" />
          </g>
        </g>
      </svg>
    </div>
  );
}
