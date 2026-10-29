"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  ShieldCheck,
  Zap,
  Server,
  Sparkles,
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
  accent: {
    text: string;
    border: string;
    bg: string;
    glow: string;
    gradient: string;
    tagBg: string;
    tagBorder: string;
    tagText: string;
  };
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
    accent: {
      text: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      glow: "rgba(16, 185, 129, 0.35)",
      gradient: "from-emerald-500 via-teal-500 to-cyan-400",
      tagBg: "bg-emerald-500/10",
      tagBorder: "border-emerald-500/30",
      tagText: "text-emerald-300",
    },
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
    accent: {
      text: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      glow: "rgba(245, 158, 11, 0.35)",
      gradient: "from-amber-500 via-orange-500 to-yellow-400",
      tagBg: "bg-amber-500/10",
      tagBorder: "border-amber-500/30",
      tagText: "text-amber-300",
    },
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
    accent: {
      text: "text-blue-400",
      border: "border-blue-500/40",
      bg: "bg-blue-500/10",
      glow: "rgba(59, 130, 246, 0.35)",
      gradient: "from-blue-500 via-indigo-500 to-sky-400",
      tagBg: "bg-blue-500/10",
      tagBorder: "border-blue-500/30",
      tagText: "text-blue-300",
    },
  },
  {
    id: "direct-delivery",
    number: "04",
    title: "Rapid Turnaround & Direct Engineering SLA",
    subtitle: "End-to-End Ownership from Schema to Production Edge",
    description:
      "Transparent engineering communication with a 4 to 8-hour response window for critical production systems. Complete technical ownership spanning relational database normalization, API design, and client-side reactive UX.",
    icon: Sparkles,
    tags: ["4-8h Response SLA", "Bilingual Tech Specs", "Direct Pair Programming", "Full Ownership"],
    metricsBadge: "<8h SLA Guarantee",
    accent: {
      text: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      glow: "rgba(168, 85, 247, 0.35)",
      gradient: "from-purple-500 via-pink-500 to-indigo-400",
      tagBg: "bg-purple-500/10",
      tagBorder: "border-purple-500/30",
      tagText: "text-purple-300",
    },
  },
];

const AUTO_SLIDE_DURATION = 6000; // 6 seconds per slide

export function EngineeringCommitmentsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeCommitment = COMMITMENTS[currentIndex];
  const Icon = activeCommitment.icon;

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
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  // Auto-play interval with smooth 50ms progress increments
  useEffect(() => {
    if (isPaused || !isAutoPlayEnabled) return;

    const intervalTime = 50;
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
  }, [isPaused, isAutoPlayEnabled, goToNext]);

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
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0c1220]/95 shadow-2xl transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar: Step Selector Tabs + Play/Pause & Nav Arrows */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/50 p-2 sm:p-3">
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
                    "relative flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-mono transition-all cursor-pointer truncate",
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCommitmentTab"
                      className="absolute inset-0 rounded-xl bg-slate-800 border border-slate-700/80 shadow -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className={cn("text-[10px] font-bold", isActive ? item.accent.text : "text-slate-500")}>
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
          {/* Autoplay Play/Pause Toggle */}
          <button
            onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous commitment"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next commitment"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Animated Glowing Progress Line */}
      <div className="h-0.5 w-full bg-slate-850/80 overflow-hidden">
        <div
          className={cn("h-full bg-gradient-to-r transition-all duration-75", activeCommitment.accent.gradient)}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slide Card Area with Fixed Min-Height to eliminate CLS */}
      <div className="relative min-h-[260px] sm:min-h-[220px] p-5 sm:p-7 flex flex-col justify-between">
        {/* Ambient Radial Accent Glow */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl opacity-20 transition-all duration-700"
          style={{ backgroundColor: activeCommitment.accent.glow }}
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeCommitment.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full space-y-4"
          >
            {/* Top Row: Icon + Title + Metrics Badge */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border transition-all",
                      activeCommitment.accent.bg,
                      activeCommitment.accent.border,
                      activeCommitment.accent.text
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-xs font-mono font-bold", activeCommitment.accent.text)}>
                        {activeCommitment.number}
                      </span>
                      <span className="text-xs font-mono text-slate-500">•</span>
                      <span className="text-xs font-mono text-slate-400">{activeCommitment.subtitle}</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold font-sans text-white tracking-tight mt-0.5">
                      {activeCommitment.title}
                    </h3>
                  </div>
                </div>

                {/* Metrics SLA Pill */}
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-mono font-semibold border shadow-sm",
                    activeCommitment.accent.bg,
                    activeCommitment.accent.border,
                    activeCommitment.accent.text
                  )}
                >
                  {activeCommitment.metricsBadge}
                </span>
              </div>

              {/* Description Body */}
              <p className="mt-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {activeCommitment.description}
              </p>
            </div>

            {/* Bottom Row: Tags & Mobile Indicator */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeCommitment.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11px] font-mono font-medium border transition-colors",
                      activeCommitment.accent.tagBg,
                      activeCommitment.accent.tagBorder,
                      activeCommitment.accent.tagText
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress Dots Indicator */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                <span className="text-[10px] font-mono text-slate-500 sm:hidden">
                  Swipe or tap tabs to browse
                </span>
                <div className="flex items-center gap-1.5">
                  {COMMITMENTS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => goToIndex(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all cursor-pointer",
                        currentIndex === idx
                          ? cn("w-6", item.accent.bg, item.accent.border, "bg-white")
                          : "w-1.5 bg-slate-700 hover:bg-slate-500"
                      )}
                      aria-label={`Go to commitment ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
