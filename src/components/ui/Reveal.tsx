"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";

// Shared easing: fast start, long soft settle (expo-out feel)
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

// Fades and lifts content into view once. Animates only opacity + transform,
// so it stays on the compositor and never triggers layout while scrolling.
export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
