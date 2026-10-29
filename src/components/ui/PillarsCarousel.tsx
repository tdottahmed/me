"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Server,
  ShieldCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  accent: {
    text: string;
    border: string;
    bg: string;
    dot: string;
    glow: string;
    gradient: string;
    tagBg: string;
    tagBorder: string;
    tagText: string;
  };
}

const PILLARS: PillarItem[] = [
  {
    id: "lifecycle",
    number: "01",
    title: "Full-Lifecycle Scope",
    subtitle: "Relational DB Architecture to Hardened VPS",
    description:
      "Shipped live-class LMS platforms, defense inventory modules, and high-concurrency web apps from relational DB design to hardened Linux VPS.",
    icon: Server,
    tags: ["Postgres / MariaDB", "Ubuntu VPS", "CI/CD"],
    accent: {
      text: "text-blue-400",
      border: "border-blue-500/40",
      bg: "bg-blue-500/10",
      dot: "bg-blue-400",
      glow: "rgba(59, 130, 246, 0.35)",
      gradient: "from-blue-500 via-indigo-500 to-sky-400",
      tagBg: "bg-slate-900/90",
      tagBorder: "border-slate-800",
      tagText: "text-slate-300",
    },
  },
  {
    id: "financial",
    number: "02",
    title: "Financial Correctness",
    subtitle: "ACID Guarantees & Zero-Drift Ledgers",
    description:
      "Zero-tolerance for monetary bugs: signature-verified idempotent payment webhooks, append-only double-entry ledgers, and row-level stock locks.",
    icon: ShieldCheck,
    tags: ["Row-Level Locks", "Idempotency", "Double-Entry"],
    accent: {
      text: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      dot: "bg-emerald-400",
      glow: "rgba(16, 185, 129, 0.35)",
      gradient: "from-emerald-500 via-teal-500 to-cyan-400",
      tagBg: "bg-emerald-500/10",
      tagBorder: "border-emerald-500/30",
      tagText: "text-emerald-300",
    },
  },
  {
    id: "realtime",
    number: "03",
    title: "Real-Time & QA",
    subtitle: "WebSockets Mesh & 847 Automated Tests",
    description:
      "Real-time event broadcasting on Laravel Reverb WebSockets with Redis workers, validated by 847+ automated test suites in production.",
    icon: Zap,
    tags: ["Reverb WS", "Horizon / Celery", "847 Tests"],
    accent: {
      text: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      dot: "bg-amber-400",
      glow: "rgba(245, 158, 11, 0.35)",
      gradient: "from-amber-500 via-orange-500 to-yellow-400",
      tagBg: "bg-amber-500/10",
      tagBorder: "border-amber-500/30",
      tagText: "text-amber-300",
    },
  },
];

const AUTO_SLIDE_DURATION = 5500; // 5.5 seconds per slide

export function PillarsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activePillar = PILLARS[currentIndex];
  const Icon = activePillar.icon;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PILLARS.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PILLARS.length) % PILLARS.length);
    setProgress(0);
  }, []);

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  // Auto-play timer with progress ticker
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update every 50ms
    const step = (intervalTime / AUTO_SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
      goToPrev();
    }
    touchStartX.current = null;
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 32 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0c1220]/90 shadow-2xl transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header: Step Selector Pills + Slide Tracker */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 p-2 sm:p-2.5">
        {/* Step Selector Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0">
          {PILLARS.map((pillar, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => goToIndex(idx)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-mono transition-all cursor-pointer truncate",
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillarTab"
                    className="absolute inset-0 rounded-xl bg-slate-800 border border-slate-700/80 shadow -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? pillar.accent.text : "text-slate-500")}>
                  {pillar.number}
                </span>
                <span className="hidden sm:inline truncate">{pillar.title}</span>
                <span className="sm:hidden truncate">{pillar.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-1 pl-2 shrink-0">
          <button
            onClick={goToPrev}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous engineering pillar"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next engineering pillar"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Animated Auto-Advance Progress Line */}
      <div className="relative h-0.5 w-full bg-slate-800/60 overflow-hidden">
        <motion.div
          className={cn("h-full bg-gradient-to-r", activePillar.accent.gradient)}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>

      {/* Active Pillar Card Container */}
      <div className="p-4 sm:p-5 min-h-[148px] sm:min-h-[142px] flex flex-col justify-between">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activePillar.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full"
          >
            <div>
              {/* Pillar Header: Icon + Title + Subtitle Badge */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl border p-1.5 transition-transform duration-300",
                      activePillar.accent.bg,
                      activePillar.accent.border
                    )}
                  >
                    <Icon className={cn("h-4 w-4", activePillar.accent.text)} />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>{activePillar.title}</span>
                      <span className="hidden min-[440px]:inline text-[10px] font-mono text-slate-500 font-normal">
                        ({activePillar.subtitle})
                      </span>
                    </h4>
                  </div>
                </div>

                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold border shrink-0",
                    activePillar.accent.bg,
                    activePillar.accent.border,
                    activePillar.accent.text
                  )}
                >
                  Pillar {activePillar.number} / 03
                </span>
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activePillar.description}
              </p>
            </div>

            {/* Bottom Footer: Tech Tags + Interactive Indicator */}
            <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {activePillar.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "rounded-lg border px-2 py-0.5 font-mono text-[10px] transition-colors",
                      activePillar.accent.tagBg,
                      activePillar.accent.tagBorder,
                      activePillar.accent.tagText
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 shrink-0">
                <span className="hidden sm:inline">Auto-playing</span>
                <span className="sm:hidden">Swipe</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
