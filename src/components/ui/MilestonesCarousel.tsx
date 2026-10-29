"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Briefcase,
  ShieldCheck,
  Zap,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MilestoneItem {
  id: string;
  number: string;
  title: string;
  company: string;
  period: string;
  location: string;
  headline: string;
  description: string;
  tags: string[];
  link?: { text: string; url: string };
  icon: React.ComponentType<{ className?: string }>;
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

const MILESTONES: MilestoneItem[] = [
  {
    id: "lms-arch",
    number: "01",
    title: "Production LMS Architecture & Live Streaming",
    company: "Imjol IT",
    period: "Nov 2023 – Present",
    location: "Uttara, Dhaka, Bangladesh",
    headline: "High-Concurrency Live Cohorts on TradingChart.org",
    description:
      "Architected and deployed TradingChart.org LMS from relational database design to hardened VPS, integrating JaaS/Jitsi interactive live classrooms, Reverb WebSockets support desk, and Bunny CDN video streaming.",
    tags: ["Laravel 12", "React 19", "PostgreSQL", "JaaS / Jitsi", "Bunny CDN"],
    link: { text: "Visit TradingChart.org", url: "https://tradingchart.org" },
    icon: Briefcase,
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
    id: "financial-mobile",
    number: "02",
    title: "Financial Gateways & Mobile Application",
    company: "Imjol IT",
    period: "Nov 2023 – Present",
    location: "Uttara, Dhaka, Bangladesh",
    headline: "Multi-Currency Checkout & React Native Client",
    description:
      "Engineered multi-currency BDT and USD student enrollment checkout via SSLCommerz with idempotent webhook verification, and delivered a companion cross-platform React Native mobile learning application.",
    tags: ["SSLCommerz", "Multi-Currency", "Idempotent Webhooks", "React Native"],
    icon: ShieldCheck,
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
    id: "defense-modules",
    number: "03",
    title: "Defense Inventory Security & Bug Resolution",
    company: "PONDIT",
    period: "Feb 2023 – Oct 2023",
    location: "Dhaka, Bangladesh",
    headline: "Enterprise Hardening & 70+ Critical Bug Fixes",
    description:
      "Secured defense inventory modules against concurrency flaws, refactored legacy Blade and jQuery codebases into structured OOP domain services, and eliminated 70+ critical production bugs.",
    tags: ["Defense Module Security", "70+ Bug Fixes", "PHPUnit", "OOP Refactoring"],
    icon: Zap,
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
    id: "leadership-vps",
    number: "04",
    title: "Engineering Mentorship & Automated CI/CD",
    company: "Imjol IT & Commercial Deployments",
    period: "2023 – Present",
    location: "Dhaka, Bangladesh",
    headline: "Team Code Reviews & Zero-Downtime Linux VPS",
    description:
      "Mentored junior developers in strict typing and automated testing, managed GitHub Actions CI/CD deployment pipelines, and maintained zero-downtime Ubuntu VPS hosting with automated TLS renewals and daily backups.",
    tags: ["Mentorship", "Code Reviews", "GitHub Actions CI/CD", "Ubuntu VPS"],
    icon: Users,
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

const AUTO_SLIDE_DURATION = 6500;

export function MilestonesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeMilestone = MILESTONES[currentIndex];
  const Icon = activeMilestone.icon;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % MILESTONES.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length);
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
      className="relative w-full overflow-hidden rounded-3xl border border-slate-800/90 bg-[#0c1220]/95 shadow-2xl transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header: Tab Pills + Progress */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/50 p-2 sm:p-3">
        <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0 overflow-x-auto scrollbar-none">
          {MILESTONES.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => goToIndex(idx)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-mono transition-all cursor-pointer shrink-0 truncate",
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMilestoneTab"
                    className="absolute inset-0 rounded-xl bg-slate-800 border border-slate-700/80 shadow -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? item.accent.text : "text-slate-500")}>
                  {item.number}
                </span>
                <span className="hidden sm:inline truncate">{item.title.split("&")[0]}</span>
                <span className="sm:hidden truncate">{item.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 pl-2 shrink-0">
          <button
            onClick={goToPrev}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous career milestone"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next career milestone"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Auto-Advance Progress Line */}
      <div className="relative h-0.5 w-full bg-slate-800/60 overflow-hidden">
        <motion.div
          className={cn("h-full bg-gradient-to-r", activeMilestone.accent.gradient)}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>

      {/* Active Milestone Card */}
      <div className="p-5 sm:p-8 min-h-[260px] flex flex-col justify-between">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeMilestone.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full space-y-5"
          >
            <div>
              {/* Top Bar: Company Badge + Period + Location */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-md px-2.5 py-1 font-mono text-xs font-semibold border flex items-center gap-1.5",
                      activeMilestone.accent.bg,
                      activeMilestone.accent.border,
                      activeMilestone.accent.text
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{activeMilestone.company}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">•</span>
                  <span className="text-xs font-mono text-slate-300 font-semibold">
                    {activeMilestone.headline}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    <span>{activeMilestone.period}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{activeMilestone.location}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-4 font-sans text-xl sm:text-2xl font-extrabold text-white">
                {activeMilestone.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeMilestone.description}
              </p>
            </div>

            {/* Bottom Footer: Tags & Link */}
            <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {activeMilestone.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors",
                      activeMilestone.accent.tagBg,
                      activeMilestone.accent.tagBorder,
                      activeMilestone.accent.tagText
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {activeMilestone.link && (
                <a
                  href={activeMilestone.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{activeMilestone.link.text}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
