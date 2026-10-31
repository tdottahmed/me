"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Server,
  Layout,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeaturedStackItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  platforms: string[];
}

const FEATURED_STACKS: FeaturedStackItem[] = [
  {
    id: "laravel-reverb",
    number: "01",
    title: "Laravel 13 & Reverb WebSockets",
    subtitle: "High-Concurrency Backend & Real-Time Mesh",
    description:
      "Engineered multi-repository SSO backends, private veterinarian consultation channels, Horizon Redis queues, and automated double-entry financial ledgers.",
    icon: Server,
    tags: ["Laravel 13", "Laravel Reverb", "Laravel Horizon", "MySQL"],
    platforms: ["Fur & Feather BD", "TradingChart.org", "DirectMalaysia.com"],
  },
  {
    id: "django-monolith",
    number: "02",
    title: "Django DRF & 20-Module Monolith",
    subtitle: "Enterprise Multi-Vendor Marketplace Core",
    description:
      "Centralized business logic into a unified service layer, decimal-only financial arithmetic, append-only audit trail, and 847 automated test suites.",
    icon: Database,
    tags: ["Django", "DRF", "Celery", "MariaDB", "HTMX"],
    platforms: ["Sultan Big Bazaar"],
  },
  {
    id: "nextjs-react",
    number: "03",
    title: "Next.js 16 & React 19 Storefronts",
    subtitle: "Edge-Ready Frontend & High-Performance UI",
    description:
      "Modern server components, partial pre-rendering, motion-driven micro-interactions, and sub-second cold starts across production e-commerce storefronts.",
    icon: Layout,
    tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript"],
    platforms: ["Sultan Big Bazaar", "Fur & Feather BD"],
  },
];

const AUTO_ROTATE_MS = 7000;

export function FeaturedStackCarousel({
  onSelectProject,
}: {
  onSelectProject?: (projectName: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeStack = FEATURED_STACKS[currentIndex];

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % FEATURED_STACKS.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + FEATURED_STACKS.length) % FEATURED_STACKS.length);
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
      className="relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-xl transition-colors duration-250"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Header: Tab Pills + Controls */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2 sm:p-2.5">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0 overflow-x-auto scrollbar-none">
          {FEATURED_STACKS.map((stack, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={stack.id}
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
                    layoutId="activeStackTab"
                    className="absolute inset-0 rounded-xl bg-neutral-500/15 border border-[var(--border-subtle)] -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? "text-[var(--foreground)]" : "text-[var(--text-muted)]")}>
                  {stack.number}
                </span>
                <span className="hidden sm:inline truncate">{stack.title.split("&")[0]}</span>
                <span className="sm:hidden truncate">{stack.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 pl-2 shrink-0">
          <button
            onClick={goToPrev}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Previous featured stack"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Next featured stack"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Auto-Advance Progress Line */}
      <div className="relative h-0.5 w-full bg-[var(--border-subtle)] overflow-hidden">
        <motion.div
          className="h-full bg-[var(--foreground)]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>

      {/* Active Stack Card Content */}
      <div
        className="p-4 sm:p-6 min-h-[160px] sm:min-h-[150px] flex flex-col justify-between"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeStack.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)] shadow-sm">
                    <activeStack.icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--foreground)] truncate">
                      {activeStack.title}
                    </h3>
                    <p className="font-mono text-xs text-[var(--text-muted)] truncate">
                      {activeStack.subtitle}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)] shrink-0">
                  Tier {activeStack.number} Core
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-relaxed line-clamp-2">
                {activeStack.description}
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[var(--border-subtle)]">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {activeStack.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Shipped On Projects Pills */}
              {activeStack.platforms.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="shrink-0 text-[10px]">Shipped On:</span>
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                    {activeStack.platforms.map((plat) => (
                      <button
                        key={plat}
                        onClick={() => onSelectProject?.(plat)}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-2 py-0.5 text-[10px] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer shrink-0"
                      >
                        {plat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
