"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useTransform, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export function TracingBeam({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, Math.max(svgHeight - 100, 50)]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-5xl", className)}
    >
      <div className="hidden sm:block absolute -left-6 md:-left-12 top-3 pointer-events-none select-none">
        <div className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-slate-700 bg-white/10 shadow-sm">
          <div className="h-2 w-2 rounded-full border border-[var(--status-live)] bg-[var(--status-live)]" />
        </div>
        {svgHeight > 0 && (
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="ml-4 block"
            aria-hidden="true"
          >
            <path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="currentColor"
              className="text-[var(--border-subtle)]"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.5"
              className="motion-reduce:hidden"
            />
            <defs>
              <motion.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="currentColor" className="text-[var(--foreground)]" stopOpacity="0" />
                <stop stopColor="currentColor" className="text-[var(--foreground)]" stopOpacity="0.8" />
                <stop offset="0.5" stopColor="currentColor" className="text-[var(--foreground)]" stopOpacity="1" />
                <stop offset="1" stopColor="currentColor" className="text-[var(--foreground)]" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
        )}
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
