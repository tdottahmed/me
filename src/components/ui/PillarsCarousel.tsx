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
  },
];

const AUTO_ROTATE_MS = 6500;

export function PillarsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activePillar = PILLARS[currentIndex];

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
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const increment = (intervalTime / AUTO_ROTATE_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

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
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 32 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-lg transition-colors duration-250"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Header: Step Selector Pills + Slide Tracker */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2 sm:p-2.5">
        {/* Step Selector Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0 overflow-x-auto scrollbar-none">
          {PILLARS.map((pillar, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => goToIndex(idx)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-mono transition-all cursor-pointer shrink-0 truncate",
                  isActive
                    ? "text-[var(--foreground)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillarTab"
                    className="absolute inset-0 rounded-xl bg-neutral-500/15 border border-[var(--border-subtle)] -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? "text-[var(--foreground)]" : "text-[var(--text-muted)]")}>
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
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Previous engineering pillar"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Next engineering pillar"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Animated Auto-Advance Progress Line */}
      <div className="relative h-0.5 w-full bg-[var(--border-subtle)] overflow-hidden">
        <motion.div
          className="h-full bg-[var(--foreground)]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>

      {/* Active Pillar Card Container */}
      <div
        className="p-4 sm:p-5 min-h-[148px] sm:min-h-[142px] flex flex-col justify-between"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)] shadow-sm">
                    <activePillar.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-sm sm:text-base font-bold text-[var(--foreground)] truncate">
                      {activePillar.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[var(--text-muted)] truncate">
                      {activePillar.subtitle}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)] shrink-0">
                  Step {activePillar.number} / 03
                </div>
              </div>

              <p className="mt-2.5 text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-relaxed line-clamp-2">
                {activePillar.description}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
              {activePillar.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
