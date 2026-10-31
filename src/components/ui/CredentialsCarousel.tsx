"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  GraduationCap,
  Award,
  Languages,
  Calendar,
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
      "Architected normalized MySQL relational schemas for military logistics",
      "Resolved 70+ production bugs and automated integration test coverage",
      "Mentored cohorts on clean OOP design patterns and Git flow",
    ],
    icon: Award,
  },
  {
    id: "languages",
    number: "03",
    title: "Multilingual Technical Communication",
    issuer: "International & Local Engineering Teams",
    period: "Professional Fluency",
    location: "Global Remote & Dhaka",
    metaBadge: "English (Full Professional) • Bengali (Native)",
    description:
      "Bilingual engineer capable of drafting clear technical RFCs, conducting code reviews, collaborating in agile standups, and leading client communications.",
    highlights: [
      "English: Full professional proficiency (technical RFCs, remote syncs)",
      "Bengali: Native speaker (fluent technical and team mentorship)",
      "Experienced collaborating with teams in Bangladesh, Malaysia & Canada",
      "Clear documentation and asynchronous PR communication",
    ],
    icon: Languages,
  },
];

const AUTO_ROTATE_MS = 8000;

export function CredentialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeItem = CREDENTIALS[currentIndex];

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
          {CREDENTIALS.map((item, idx) => {
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
                    layoutId="activeCredentialTab"
                    className="absolute inset-0 rounded-full bg-[var(--foreground)] shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("text-[10px] font-bold", isActive ? "text-[var(--background)]" : "text-[var(--text-muted)]")}>
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
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Previous credential"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Next credential"
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

      {/* Active Credential Card Content */}
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
                      {activeItem.issuer}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-secondary)]">
                  <span className="rounded-full bg-[var(--glass-pill-bg)] px-2.5 py-0.5 border border-[var(--border-subtle)] text-[10px] font-semibold text-[var(--foreground)]">
                    {activeItem.metaBadge}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{activeItem.period}</span>
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-[var(--border-subtle)]">
              {activeItem.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-live)] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
