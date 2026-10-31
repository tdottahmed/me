"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Briefcase,
  ShieldCheck,
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
  },
  {
    id: "defense-inventory",
    number: "03",
    title: "Military Defense Medical Procurement System",
    company: "Nix Software",
    period: "May 2022 – Nov 2023",
    location: "Dhaka, Bangladesh",
    headline: "Secured Armed Forces Supply Chains",
    description:
      "Spearheaded database schema design, audit logs, and stock tracking for high-security medical equipment procurement, preventing unauthorized discrepancies in sensitive defense inventories.",
    tags: ["Laravel", "MySQL", "Role-Based ACL", "Audit Logging"],
    icon: ShieldCheck,
  },
  {
    id: "leadership-mentorship",
    number: "04",
    title: "Engineering Leadership & Code Review Rigor",
    company: "Nix Software & Imjol IT",
    period: "2022 – Present",
    location: "Dhaka, Bangladesh",
    headline: "Mentoring Developers & Enforcing Strict Standards",
    description:
      "Mentored junior and mid-level software developers, conducted strict PR reviews on OOP principles, database indexing, and API security, cutting production defect rates by over 40%.",
    tags: ["Team Mentorship", "Code Reviews", "System Design", "CI/CD"],
    icon: Users,
  },
];

const AUTO_ROTATE_MS = 8000;

export function MilestonesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeItem = MILESTONES[currentIndex];

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
      className="relative w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-2xl transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header: Tab Pills + Progress */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2 sm:p-3">
        <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0 overflow-x-auto scrollbar-none">
          {MILESTONES.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => goToIndex(idx)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-2 text-xs font-mono transition-all cursor-pointer shrink-0 truncate",
                  isActive
                    ? "text-[var(--background)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-neutral-500/10"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMilestoneTab"
                    className="absolute inset-0 rounded-full bg-[var(--foreground)] shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? "text-[var(--background)]" : "text-[var(--text-muted)]")}>
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
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Previous career milestone"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Next career milestone"
          >
            <ChevronRight className="h-4 w-4" />
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

      {/* Active Milestone Card Content */}
      <div className="p-5 sm:p-8 min-h-[200px] flex flex-col justify-between">
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
                      {activeItem.company}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    <span>{activeItem.period}</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    <span>{activeItem.location}</span>
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-sans text-sm sm:text-base font-semibold text-[var(--foreground)]">
                  {activeItem.headline}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex flex-wrap items-center gap-1.5">
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {activeItem.link && (
                <a
                  href={activeItem.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--foreground)] hover:underline"
                >
                  <span>{activeItem.link.text}</span>
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
