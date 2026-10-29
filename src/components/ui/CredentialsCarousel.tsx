"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  GraduationCap,
  Award,
  Languages,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CredentialItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  period: string;
  location: string;
  metaBadge: string;
  description: string;
  highlights: string[];
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

const CREDENTIALS: CredentialItem[] = [
  {
    id: "degree",
    number: "01",
    title: "B.Sc. in Computer Science & Engineering",
    issuer: "Southeast University",
    period: "2018 – 2022",
    location: "Dhaka, Bangladesh",
    metaBadge: "CGPA: 3.49 • 4-Year Engineering Degree",
    description:
      "Rigorous 4-year computer science engineering curriculum with strong focus on data structures, algorithms, relational database theory, operating systems, and software architecture.",
    highlights: [
      "Relational Database Systems & Query Optimization",
      "Object-Oriented Programming & Distributed Architecture",
      "Operating Systems, Unix Kernel & Process Management",
      "Automated Testing & Software Verification Suites",
    ],
    icon: GraduationCap,
    accent: {
      text: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      glow: "rgba(168, 85, 247, 0.35)",
      gradient: "from-purple-500 via-indigo-500 to-blue-400",
      tagBg: "bg-purple-500/10",
      tagBorder: "border-purple-500/30",
      tagText: "text-purple-300",
    },
  },
  {
    id: "certification",
    number: "02",
    title: "Web Application Development (Laravel & Vue.js)",
    issuer: "PONDIT (Professional IT Training Institute)",
    period: "Feb 2023 – Oct 2023",
    location: "Dhaka, Bangladesh",
    metaBadge: "Defense Module Security • 70+ Enterprise Fixes",
    description:
      "Intensive 9-month professional certification covering enterprise Laravel architectures, RESTful API design, database transactions, and client-side reactive components.",
    highlights: [
      "Secured defense inventory modules against concurrency flaws",
      "Refactored legacy Blade & jQuery codebases to clean OOP architecture",
      "Resolved 70+ enterprise production bugs across live systems",
      "Implemented strict automated unit test suites with PHPUnit",
    ],
    icon: Award,
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
    id: "languages",
    number: "03",
    title: "Global Technical Communication & Languages",
    issuer: "International & Domestic Deployments",
    period: "Ongoing",
    location: "Remote / Global",
    metaBadge: "English (Professional) • Bengali (Native)",
    description:
      "Bilingual technical communication proficiency enabling seamless collaboration with international product teams, CTOs, open-source contributors, and stakeholders in Canada and Bangladesh.",
    highlights: [
      "English: Professional Working Proficiency (Technical specs, RFCs, client calls)",
      "Bengali: Native / Bilingual Proficiency (Team mentorship & local leadership)",
      "Authored architectural master plans & comprehensive API documentation",
      "Cross-border stakeholder engagement with Canadian wholesale clients",
    ],
    icon: Languages,
    accent: {
      text: "text-blue-400",
      border: "border-blue-500/40",
      bg: "bg-blue-500/10",
      glow: "rgba(59, 130, 246, 0.35)",
      gradient: "from-blue-500 via-sky-500 to-emerald-400",
      tagBg: "bg-blue-500/10",
      tagBorder: "border-blue-500/30",
      tagText: "text-blue-300",
    },
  },
];

const AUTO_SLIDE_DURATION = 6500;

export function CredentialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeItem = CREDENTIALS[currentIndex];
  const Icon = activeItem.icon;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CREDENTIALS.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CREDENTIALS.length) % CREDENTIALS.length);
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
          {CREDENTIALS.map((item, idx) => {
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
                    layoutId="activeCredentialTab"
                    className="absolute inset-0 rounded-xl bg-slate-800 border border-slate-700/80 shadow -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? item.accent.text : "text-slate-500")}>
                  {item.number}
                </span>
                <span className="hidden sm:inline truncate">{item.title.split("(")[0]}</span>
                <span className="sm:hidden truncate">{item.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 pl-2 shrink-0">
          <button
            onClick={goToPrev}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous credential"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next credential"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Auto-Advance Progress Line */}
      <div className="relative h-0.5 w-full bg-slate-800/60 overflow-hidden">
        <motion.div
          className={cn("h-full bg-gradient-to-r", activeItem.accent.gradient)}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>

      {/* Active Credential Details */}
      <div className="p-5 sm:p-8 min-h-[340px] flex flex-col justify-between">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full space-y-6"
          >
            <div>
              {/* Header: Badge, Period, Location */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 font-mono text-xs font-semibold border flex items-center gap-1.5",
                    activeItem.accent.bg,
                    activeItem.accent.border,
                    activeItem.accent.text
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{activeItem.metaBadge}</span>
                </span>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    <span>{activeItem.period}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{activeItem.location}</span>
                  </div>
                </div>
              </div>

              {/* Title & Issuer */}
              <h3 className="mt-4 font-sans text-xl sm:text-2xl font-extrabold text-white">
                {activeItem.title}
              </h3>
              <div className="mt-1 text-sm font-medium text-slate-400">
                {activeItem.issuer}
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeItem.description}
              </p>

              {/* Bullet Highlights Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeItem.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-800/70 bg-slate-900/40 p-3"
                  >
                    <CheckCircle2 className={cn("h-4 w-4 shrink-0 mt-0.5", activeItem.accent.text)} />
                    <span className="text-xs text-slate-300 font-sans leading-relaxed">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className={cn("h-2 w-2 rounded-full", activeItem.accent.text.replace("text-", "bg-"))} />
                <span>Verified Academic & Industry Credential</span>
              </span>

              <span className="text-slate-400">
                Credential {activeItem.number} of 03
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
