"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Server,
  Layout,
  Database,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
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
    accent: {
      text: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      glow: "rgba(244, 63, 94, 0.35)",
      gradient: "from-rose-500 via-pink-500 to-amber-400",
      tagBg: "bg-rose-500/10",
      tagBorder: "border-rose-500/30",
      tagText: "text-rose-300",
    },
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
    id: "nextjs-react",
    number: "03",
    title: "Next.js 16 & React 19 Storefronts",
    subtitle: "SSR / ISR Storefronts & Inertia SPAs",
    description:
      "Shipped production e-commerce storefronts with end-to-end TypeScript safety, sub-second page transitions, and reactive WebSockets state hydration.",
    icon: Layout,
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Inertia.js"],
    platforms: ["Sultan Big Bazaar", "Fur & Feather BD", "TradingChart.org"],
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
    id: "concurrency-vps",
    number: "04",
    title: "Pessimistic Locks & Hardened VPS",
    subtitle: "ACID Concurrency & Hardened Infrastructure",
    description:
      "SELECT FOR UPDATE stock reservations eliminating overselling, signature-verified idempotent webhooks, and Ubuntu VPS hardened with Fail2ban and Cloudflare Strict TLS.",
    icon: ShieldCheck,
    tags: ["Row-Level Locks", "Fail2ban", "Cloudflare TLS", "GitHub Actions"],
    platforms: ["All Commercial Deployments"],
    accent: {
      text: "text-violet-400",
      border: "border-violet-500/40",
      bg: "bg-violet-500/10",
      glow: "rgba(167, 139, 250, 0.35)",
      gradient: "from-violet-500 via-purple-500 to-indigo-400",
      tagBg: "bg-violet-500/10",
      tagBorder: "border-violet-500/30",
      tagText: "text-violet-300",
    },
  },
];

const AUTO_SLIDE_DURATION = 6000;

export function FeaturedStackCarousel({
  onSelectProject,
}: {
  onSelectProject?: (project: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeStack = FEATURED_STACKS[currentIndex];
  const Icon = activeStack.icon;

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
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) return;

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
  }, [isPaused, goToNext]);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) goToNext();
    else if (diff < -45) goToPrev();
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
      {/* Top Header: Tab Pills + Controls */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 p-2 sm:p-2.5">
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
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStackTab"
                    className="absolute inset-0 rounded-xl bg-slate-800 border border-slate-700/80 shadow -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? stack.accent.text : "text-slate-500")}>
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
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous featured stack"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next featured stack"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Auto-Advance Progress Line */}
      <div className="relative h-0.5 w-full bg-slate-800/60 overflow-hidden">
        <motion.div
          className={cn("h-full bg-gradient-to-r", activeStack.accent.gradient)}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>

      {/* Active Stack Card */}
      <div className="p-4 sm:p-5 min-h-[148px] sm:min-h-[142px] flex flex-col justify-between">
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl border p-1.5 transition-transform duration-300",
                      activeStack.accent.bg,
                      activeStack.accent.border
                    )}
                  >
                    <Icon className={cn("h-4 w-4", activeStack.accent.text)} />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>{activeStack.title}</span>
                      <span className="hidden min-[440px]:inline text-[10px] font-mono text-slate-500 font-normal">
                        ({activeStack.subtitle})
                      </span>
                    </h4>
                  </div>
                </div>

                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold border shrink-0",
                    activeStack.accent.bg,
                    activeStack.accent.border,
                    activeStack.accent.text
                  )}
                >
                  Featured Stack {activeStack.number} / 04
                </span>
              </div>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeStack.description}
              </p>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {activeStack.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "rounded-lg border px-2 py-0.5 font-mono text-[10px] transition-colors",
                      activeStack.accent.tagBg,
                      activeStack.accent.tagBorder,
                      activeStack.accent.tagText
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {activeStack.platforms.length > 0 && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <span className="text-slate-500">Shipped:</span>
                  {activeStack.platforms.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectProject?.(p)}
                      className="text-slate-300 hover:text-white underline cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
