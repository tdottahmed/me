"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  ShieldCheck,
  Zap,
  Server,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommitmentItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  metricsBadge: string;
}

const COMMITMENTS: CommitmentItem[] = [
  {
    id: "financial-correctness",
    number: "01",
    title: "Zero Financial Drift Guarantee",
    subtitle: "ACID Guarantees & Append-Only Double-Entry Ledgers",
    description:
      "Zero tolerance for monetary bugs: signature-verified idempotent payment webhooks, append-only double-entry ledgers where debits equal credits, and database pessimistic row-level locks preventing race-condition overselling.",
    icon: ShieldCheck,
    tags: ["Row-Level Locks", "Idempotency Keys", "Double-Entry Ledgers", "ACID Compliance"],
    metricsBadge: "100% Monetary Integrity",
  },
  {
    id: "concurrency-realtime",
    number: "02",
    title: "High-Concurrency & Real-Time Mesh",
    subtitle: "Sub-Second Responses & Low-Latency Event Broadcasting",
    description:
      "Architected with Laravel Reverb WebSockets and Redis Horizon queues for sub-25ms event delivery. Next.js 16 and React 19 storefronts render instantaneously, verified by 847+ automated test suites under continuous load.",
    icon: Zap,
    tags: ["Reverb WebSockets", "Redis Queues", "Next.js 16 SSR", "847 Automated Tests"],
    metricsBadge: "<25ms Event Latency",
  },
  {
    id: "hardened-infrastructure",
    number: "03",
    title: "Hardened Linux VPS & Zero-Downtime CI/CD",
    subtitle: "Isolated Production Deployments & Defense-Grade Security",
    description:
      "Hardened Ubuntu server administration featuring Cloudflare Strict TLS termination, Fail2ban brute-force protection, UFW firewalls, automated database backups, and GitHub Actions zero-downtime deployment pipelines.",
    icon: Server,
    tags: ["Ubuntu Linux VPS", "Cloudflare Strict TLS", "Fail2ban Defense", "GitHub Actions CI/CD"],
    metricsBadge: "99.9% Production Uptime",
  },
];

const AUTO_ROTATE_MS = 8000;

export function EngineeringCommitmentsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeItem = COMMITMENTS[currentIndex];

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % COMMITMENTS.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + COMMITMENTS.length) % COMMITMENTS.length);
    setProgress(0);
  }, []);

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused || !isAutoPlayEnabled) return;

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
  }, [isPaused, isAutoPlayEnabled, goToNext]);

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
      x: dir > 0 ? 28 : -28,
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
      x: dir > 0 ? -28 : 28,
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
      className="relative w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-2xl transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar: Step Selector Tabs + Play/Pause & Nav Arrows */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2 sm:p-3">
        {/* Horizontal Scrollable Tabs */}
        <div className="overflow-x-auto scrollbar-none flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-max">
            {COMMITMENTS.map((item, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => goToIndex(idx)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-2 text-xs font-mono transition-all cursor-pointer truncate",
                    isActive
                      ? "text-[var(--background)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-neutral-500/10"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCommitmentTab"
                      className="absolute inset-0 rounded-full bg-[var(--foreground)] shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className={cn("text-[10px] font-bold", isActive ? "text-[var(--background)]" : "text-[var(--text-muted)]")}>
                    {item.number}
                  </span>
                  <span className="hidden sm:inline truncate">{item.title}</span>
                  <span className="sm:hidden truncate">{item.title.split(" ")[0]} {item.title.split(" ")[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 pl-1">
          <button
            onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label={isAutoPlayEnabled ? "Pause carousel auto-play" : "Resume carousel auto-play"}
            title={isAutoPlayEnabled ? "Pause autoplay" : "Resume autoplay"}
          >
            {isAutoPlayEnabled && !isPaused ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3 fill-current" />
            )}
          </button>

          <button
            onClick={goToPrev}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Previous commitment"
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>

          <button
            onClick={goToNext}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Next commitment"
          >
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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

      {/* Active Commitment Card Content */}
      <div className="p-5 sm:p-8 min-h-[220px] flex flex-col justify-between">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--foreground)] text-[var(--background)] shadow-sm">
                    <activeItem.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--foreground)]">
                      {activeItem.title}
                    </h3>
                    <div className="text-xs font-mono text-[var(--text-muted)]">
                      {activeItem.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[var(--status-live)]/10 px-3 py-1 font-mono text-xs font-semibold text-[var(--status-live)] border border-[var(--status-live)]/20">
                    {activeItem.metricsBadge}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {activeItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
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
