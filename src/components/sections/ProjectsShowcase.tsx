"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { ProjectModal } from "./ProjectModal";
import {
  ExternalLink,
  FolderGit2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Workflow,
  ChevronLeft,
  ChevronRight,
  Activity,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type StudioTab = "innovations" | "flow" | "specs";

interface ArchitectureStep {
  step: string;
  layer: string;
  tech: string;
  desc: string;
}

interface ProjectExtendedMeta {
  flag: string;
  region: string;
  systemFlow: ArchitectureStep[];
  specs: { label: string; value: string; desc: string }[];
}

const PROJECT_EXTENDED_DATA: Record<string, ProjectExtendedMeta> = {
  "sultan-big-bazaar": {
    flag: "BD",
    region: "Bangladesh",
    systemFlow: [
      {
        step: "01",
        layer: "Client & Admin Layer",
        tech: "Next.js 16 + React 19 / HTMX",
        desc: "SSR/ISR customer shopping storefront with fast Django + HTMX seller and reseller portals across 20 decoupled domain modules.",
      },
      {
        step: "02",
        layer: "Unified Service Gateway",
        tech: "Django DRF Service Layer",
        desc: "Centralized business rules, commission splits, and strict RBAC authorization shared between REST API and server-rendered views.",
      },
      {
        step: "03",
        layer: "Concurrency & Locks",
        tech: "Pessimistic Row-Level Locks",
        desc: "SELECT FOR UPDATE row-level stock reservation eliminates overselling, paired with signature-verified idempotent webhook handlers.",
      },
      {
        step: "04",
        layer: "Storage & Async Queue",
        tech: "MariaDB + Celery Redis Workers",
        desc: "Append-only financial audit trail, immutable invoice snapshots, and asynchronous PDF invoice dispatch via Celery workers.",
      },
    ],
    specs: [
      { label: "Test Coverage", value: "847 Automated Tests", desc: "Unit, integration, and webhook idempotency test suites" },
      { label: "Architecture", value: "20 Decoupled Modules", desc: "Modular monolith design with centralized service layer" },
      { label: "Concurrency", value: "Pessimistic Row Locks", desc: "ACID stock reservations preventing concurrent overselling" },
      { label: "Infrastructure", value: "Hardened Ubuntu VPS", desc: "Cloudflare Strict TLS, Fail2ban, and GitHub Actions CI/CD" },
    ],
  },
  "fur-and-feather-bd": {
    flag: "BD",
    region: "Bangladesh",
    systemFlow: [
      {
        step: "01",
        layer: "Multi-Repo SSO Frontends",
        tech: "Next.js 16 (Shop + Community)",
        desc: "Unified customer identity shared seamlessly across shop storefront (furandfeatherbd.shop) and avian community (pakhi.community).",
      },
      {
        step: "02",
        layer: "API & Route Gateway",
        tech: "Laravel 13 REST API",
        desc: "Sanctum token authentication, multi-tenant RBAC permissions, and centralized order processing pipeline.",
      },
      {
        step: "03",
        layer: "Real-Time Concurrency",
        tech: "Laravel Reverb WebSockets",
        desc: "Private doctor consultation channels, live order status broadcasts, and background queue orchestration via Laravel Horizon.",
      },
      {
        step: "04",
        layer: "Financial Ledger Engine",
        tech: "Double-Entry Cash Book",
        desc: "Append-only double-entry ledger where orders, donations, and reseller payouts post automatically to generate live P&L reports.",
      },
    ],
    specs: [
      { label: "SSO Protocol", value: "3 Linked Repositories", desc: "Cross-repository single sign-on identity federation" },
      { label: "Real-Time Protocol", value: "Laravel Reverb WebSockets", desc: "Private vet channels and instant order notifications" },
      { label: "Financial Engine", value: "Double-Entry Cash Book", desc: "Automated append-only ledger feeding real-time P&L" },
      { label: "Gamified Engine", value: "13-Rank Progression", desc: "40-question weighted assessment algorithm with certificates" },
    ],
  },
  "trading-chart-org": {
    flag: "BD",
    region: "Bangladesh",
    systemFlow: [
      {
        step: "01",
        layer: "Cross-Platform Clients",
        tech: "React 19 + React Native Mobile",
        desc: "High-concurrency student LMS web portal with a companion React Native mobile application shipped to production app stores.",
      },
      {
        step: "02",
        layer: "Enrollment & Payment",
        tech: "Laravel 12 API + SSLCommerz",
        desc: "Multi-currency BDT and USD student enrollment processing with automated webhook verification and token refreshment.",
      },
      {
        step: "03",
        layer: "Live Streaming Infrastructure",
        tech: "JaaS / Jitsi + Bunny CDN",
        desc: "Interactive live classrooms integrated via JaaS/Jitsi with secure Bunny CDN tokenized video storage and edge streaming.",
      },
      {
        step: "04",
        layer: "Relational Database",
        tech: "PostgreSQL Database",
        desc: "ACID-compliant cohort management, lecture progression tracking, and student assignment verification.",
      },
    ],
    specs: [
      { label: "Live Classroom", value: "JaaS / Jitsi Video", desc: "Interactive low-latency video cohorts for real-time lectures" },
      { label: "Video Delivery", value: "Bunny CDN Secured Stream", desc: "Tokenized, low-latency video delivery protecting course media" },
      { label: "Multi-Currency", value: "SSLCommerz Dual Gateway", desc: "Automated BDT and USD checkout with webhook verification" },
      { label: "Mobile App", value: "React Native Mobile Client", desc: "Cross-platform iOS/Android app companion for LMS students" },
    ],
  },
  "zamzam-wholesale": {
    flag: "CA",
    region: "Canada",
    systemFlow: [
      {
        step: "01",
        layer: "Client Wholesale SPA",
        tech: "React + Inertia.js Monolith",
        desc: "Single-page application speed paired with Laravel backend routing for corporate clients in Canada.",
      },
      {
        step: "02",
        layer: "B2B Bulk Engine",
        tech: "Laravel Business Services",
        desc: "Wholesale bulk volume pricing tiers, customer credit verification, and automated enterprise invoice tracking.",
      },
      {
        step: "03",
        layer: "Relational Inventory",
        tech: "MySQL Database",
        desc: "Optimized relational queries for large-scale wholesale SKU catalogs, warehouses, and shipping tracking.",
      },
    ],
    specs: [
      { label: "Target Market", value: "Canadian B2B Wholesale", desc: "Corporate client bulk ordering and wholesale volume tiers" },
      { label: "Architecture", value: "Inertia.js Monolith SPA", desc: "Fast client-side routing paired with robust backend services" },
      { label: "Database Tuning", value: "Optimized MySQL Queries", desc: "High-performance queries for wholesale catalog and inventory" },
      { label: "Repository", value: "Open Source Codebase", desc: "Publicly verifiable production codebase on GitHub" },
    ],
  },
  "direct-malaysia": {
    flag: "MY",
    region: "Cross-Border",
    systemFlow: [
      {
        step: "01",
        layer: "Client Storefront",
        tech: "React + TypeScript SPA",
        desc: "Type-safe reactive shopping experience with client-side state caching and instant catalog browsing.",
      },
      {
        step: "02",
        layer: "Inertia Backend",
        tech: "Laravel Inertia Gateway",
        desc: "Cross-border catalog management, currency conversion, and customer checkout pipeline.",
      },
      {
        step: "03",
        layer: "Infrastructure & Hosting",
        tech: "Production Linux / Nginx VPS",
        desc: "Hardened Ubuntu server administration, Gzip/Brotli compression, SSL termination, and rate limiting.",
      },
    ],
    specs: [
      { label: "Platform Scope", value: "Cross-Border E-Commerce", desc: "International catalog and multi-tier product ordering" },
      { label: "Frontend Stack", value: "React + TypeScript SPA", desc: "Type-safe reactive storefront with zero page reloads" },
      { label: "Server Management", value: "Production Linux/Nginx", desc: "Hardened Ubuntu VPS, Gzip/Brotli compression, SSL certs" },
      { label: "Workflow", value: "Inertia.js Protocol", desc: "Seamless JSON-over-wire client hydration with server state" },
    ],
  },
  "magic-lms-codecanyon": {
    flag: "Envato",
    region: "Commercial",
    systemFlow: [
      {
        step: "01",
        layer: "Commercial Marketplace",
        tech: "Envato CodeCanyon Store",
        desc: "Commercially approved LMS software product on Envato CodeCanyon shipped to hundreds of global buyers.",
      },
      {
        step: "02",
        layer: "Multi-Gateway Payment",
        tech: "Stripe, PayPal, SSLCommerz",
        desc: "Universal plug-and-play checkout supporting international and domestic payment processors with webhook handlers.",
      },
      {
        step: "03",
        layer: "Modular Core",
        tech: "Laravel Modular Architecture",
        desc: "Extensible course builder, quiz grading engine, and dynamic certificate generator.",
      },
    ],
    specs: [
      { label: "Commercial Review", value: "Envato Approved Product", desc: "Officially vetted and approved commercial software product" },
      { label: "Suite Scope", value: "6+ Commercial Products", desc: "Ongoing maintenance, bug fixing, and customer feature rollouts" },
      { label: "Payment Gateways", value: "Stripe, PayPal, SSLCommerz", desc: "Multi-gateway plug-and-play checkout architecture" },
      { label: "Framework", value: "Laravel Enterprise Core", desc: "Clean modular service structure for thousands of third-party buyers" },
    ],
  },
};

export function ProjectsShowcase() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>("innovations");
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);

  const projects = PORTFOLIO_DATA.projects;
  const currentProject = projects[activeProjectIndex] || projects[0];
  const extendedMeta = PROJECT_EXTENDED_DATA[currentProject.id] || {
    flag: "Prod",
    region: "Production",
    systemFlow: [],
    specs: [],
  };

  const AUTO_PROJECT_DURATION = 7500; // 7.5 seconds per platform

  const goToNextProject = useCallback(() => {
    setDirection(1);
    setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
  }, [projects.length]);

  const goToPrevProject = useCallback(() => {
    setDirection(-1);
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setProgress(0);
  }, [projects.length]);

  const goToProjectIndex = (idx: number) => {
    if (idx === activeProjectIndex) return;
    setDirection(idx > activeProjectIndex ? 1 : -1);
    setActiveProjectIndex(idx);
    setProgress(0);
  };

  // Auto-play interval with smooth 50ms progress increments
  useEffect(() => {
    if (isPaused || !isAutoPlayEnabled) return;

    const intervalTime = 50;
    const step = (intervalTime / AUTO_PROJECT_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextProject();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, isAutoPlayEnabled, goToNextProject]);

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
      goToNextProject();
    } else if (diff < -45) {
      goToPrevProject();
    }
    touchStartX.current = null;
  };

  const projectSlideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 28 : -28,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 360, damping: 32 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -28 : 28,
      opacity: 0,
      scale: 0.99,
      transition: {
        x: { type: "spring" as const, stiffness: 360, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      {/* Background radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.14),transparent)]" />
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-medium text-blue-400">
          <FolderGit2 className="h-3.5 w-3.5" />
          <span>PRODUCTION SYSTEMS & CASE STUDIES</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Featured Engineering Platforms
        </h2>

        <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-400">
          End-to-end commercial solutions shipped to real users in Bangladesh and Canada,
          validated by 847+ automated test suites, idempotent pipelines, and high-uptime VPS hosting.
        </p>
      </div>

      {/* Platform Selector Strip: Horizontal Navigation with Active Indicator + Autoplay Controls */}
      <div className="mt-12 sm:mt-14">
        {/* Mobile: Controls + Counter */}
        <div className="flex sm:hidden items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <span>Platform</span>
            <span className="font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
              0{activeProjectIndex + 1} / 0{projects.length}
            </span>
            <span className="text-[10px] text-slate-500">• Swipe to browse</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label={isAutoPlayEnabled ? "Pause platform tour" : "Resume platform tour"}
              title={isAutoPlayEnabled ? "Pause autoplay" : "Resume autoplay"}
            >
              {isAutoPlayEnabled && !isPaused ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-current" />
              )}
            </button>
            <button
              onClick={goToPrevProject}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous platform"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNextProject}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next platform"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Desktop & Tablet: Segmented Tab Bar + Carousel Controls */}
        <div className="flex items-center justify-between gap-3">
          <div className="overflow-x-auto pb-2 scrollbar-none flex-1 min-w-0">
            <div className="flex items-center gap-2 min-w-max p-1 rounded-2xl border border-slate-800/80 bg-slate-900/60">
              {projects.map((project, idx) => {
                const isActive = activeProjectIndex === idx;
                const meta = PROJECT_EXTENDED_DATA[project.id];
                return (
                  <button
                    key={project.id}
                    onClick={() => goToProjectIndex(idx)}
                    className={cn(
                      "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-mono transition-all duration-200 cursor-pointer shrink-0",
                      isActive
                        ? "text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeStudioProjectPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-400/40 shadow-md shadow-blue-500/25 -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}

                    {/* Pulsing production status dot */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>

                    <span className="font-sans font-bold">{project.title}</span>

                    {meta && (
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[9px] font-mono",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-800 text-slate-400"
                        )}
                      >
                        {meta.flag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Carousel Controls */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 pb-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 font-mono text-xs text-slate-400 mr-1">
              <span className="text-white font-semibold">0{activeProjectIndex + 1}</span> / 0{projects.length}
            </div>
            <button
              onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label={isAutoPlayEnabled ? "Pause platform tour" : "Resume platform tour"}
              title={isAutoPlayEnabled ? "Pause autoplay" : "Resume autoplay"}
            >
              {isAutoPlayEnabled && !isPaused ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
            </button>
            <button
              onClick={goToPrevProject}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous platform"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNextProject}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next platform"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Engineering Studio Deck (Touch-Swipeable on Mobile, Split-Screen on Desktop) */}
      <div
        className="mt-6 group relative overflow-hidden rounded-3xl border border-slate-800/90 bg-[#0c1222]/95 shadow-2xl transition-all"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated Glowing Carousel Progress Line */}
        <div className="h-0.5 sm:h-1 w-full bg-slate-800/80 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic BorderBeam Effect */}
        <BorderBeam
          size={360}
          duration={14}
          colorFrom={activeProjectIndex % 2 === 0 ? "#3b82f6" : "#10b981"}
          colorTo={activeProjectIndex % 2 === 0 ? "#10b981" : "#f43f5e"}
        />

        <div className="relative z-10 p-4 sm:p-8 lg:p-10 min-h-[580px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProject.id}
              custom={direction}
              variants={projectSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
            >
            {/* LEFT COLUMN: Narrative, Badges, Tech Pills, Live Action Buttons (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6">
              <div>
                {/* Period & Metrics Badge */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400 border border-emerald-500/20">
                    {currentProject.metricsBadge}
                  </span>
                  <span>•</span>
                  <span>{currentProject.period}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-extrabold text-white">
                  {currentProject.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-400">
                  {currentProject.subtitle}
                </p>

                {/* Primary Action Buttons */}
                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:brightness-110 transition-all cursor-pointer"
                    >
                      <span>Visit Live Platform</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {currentProject.secondaryUrl && (
                    <a
                      href={currentProject.secondaryUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
                    >
                      <span>{currentProject.secondaryUrl.label}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {currentProject.repoUrl && (
                    <a
                      href={currentProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Repo</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProjectForModal(currentProject)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2.5 text-xs font-medium text-blue-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
                  >
                    <span>Full Architecture</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Production Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Specs Snapshot */}
              {extendedMeta.specs.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {extendedMeta.specs.slice(0, 2).map((spec, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3"
                    >
                      <div className="text-[10px] font-mono text-slate-400">
                        {spec.label}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 truncate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Interactive Workstation Window with 3 Tabs (7 Cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800/90 bg-[#070b16]/95 overflow-hidden shadow-xl">
              {/* Window Title Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5">
                {/* Traffic Lights */}
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
                    sys://architecture/{currentProject.id}
                  </span>
                </div>

                {/* Studio View Mode Tabs */}
                <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
                  <button
                    onClick={() => setActiveStudioTab("innovations")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer",
                      activeStudioTab === "innovations"
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Innovations</span>
                  </button>

                  <button
                    onClick={() => setActiveStudioTab("flow")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer",
                      activeStudioTab === "flow"
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <Workflow className="h-3 w-3" />
                    <span>System Flow</span>
                  </button>

                  <button
                    onClick={() => setActiveStudioTab("specs")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer",
                      activeStudioTab === "specs"
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <ShieldCheck className="h-3 w-3" />
                    <span>Specs</span>
                  </button>
                </div>
              </div>

              {/* Tab Content Container */}
              <div className="p-4 sm:p-6 min-h-[360px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {/* TAB 1: Key Innovations */}
                  {activeStudioTab === "innovations" && (
                    <motion.div
                      key={`innovations-${currentProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {currentProject.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5 transition-colors hover:border-slate-700 hover:bg-slate-900/70"
                        >
                          <div className="flex items-center gap-2 font-sans text-xs sm:text-sm font-bold text-white">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>{h.label}</span>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-sans pl-6">
                            {h.description}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 2: System Architecture Flow */}
                  {activeStudioTab === "flow" && (
                    <motion.div
                      key={`flow-${currentProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3.5"
                    >
                      <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
                        <span>End-to-End Pipeline & Concurrency Path:</span>
                        <span className="text-emerald-400 font-semibold">ACID Verified</span>
                      </div>

                      {extendedMeta.systemFlow.map((step, idx) => (
                        <div key={idx} className="relative">
                          <div className="flex items-start gap-3.5 rounded-xl border border-slate-800/90 bg-slate-900/50 p-3.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 font-mono text-xs font-bold text-blue-400">
                              {step.step}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-sans text-xs font-bold text-white">
                                  {step.layer}
                                </span>
                                <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-slate-700">
                                  {step.tech}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          </div>

                          {/* Connecting vertical line between steps */}
                          {idx < extendedMeta.systemFlow.length - 1 && (
                            <div className="ml-7 h-2 w-px bg-slate-800 my-0.5" />
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 3: Production Hardening Specs */}
                  {activeStudioTab === "specs" && (
                    <motion.div
                      key={`specs-${currentProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {extendedMeta.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4"
                        >
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                            <Activity className="h-3.5 w-3.5 text-blue-400" />
                            <span>{spec.label}</span>
                          </div>
                          <div className="mt-1 font-sans text-sm font-bold text-white">
                            {spec.value}
                          </div>
                          <p className="mt-1.5 text-xs text-slate-400 leading-relaxed font-sans">
                            {spec.desc}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Studio Footer Info */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Production High Uptime</span>
                  </span>

                  <button
                    onClick={() => setSelectedProjectForModal(currentProject)}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Full Architecture Drawer</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      {/* Quick-Switch Thumbnails Gallery (All 6 Platforms Side-by-Side) */}
      <div className="mt-12 sm:mt-14">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h4 className="font-sans text-base sm:text-lg font-bold text-white">
              All Commercial & Flagship Engineering Platforms
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any platform to load its live architecture studio and telemetry above.
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500 hidden sm:inline">
            6 Commercial Deployments
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => {
            const isSelected = activeProjectIndex === idx;
            const meta = PROJECT_EXTENDED_DATA[project.id];
            return (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProjectIndex(idx);
                  const studio = document.getElementById("projects");
                  if (studio) {
                    studio.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={cn(
                  "group/card flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                    : "border-slate-800/80 bg-[#0c1222]/80 hover:border-slate-700 hover:bg-slate-900/70"
                )}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 font-semibold",
                        isSelected
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                          : "bg-slate-900 text-slate-400 border border-slate-800"
                      )}
                    >
                      {project.metricsBadge.split("•")[0]}
                    </span>
                    <span>{meta?.flag}</span>
                  </div>

                  <h5 className="mt-3 font-sans text-base font-bold text-white group-hover/card:text-blue-400 transition-colors">
                    {project.title}
                  </h5>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{project.period}</span>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 font-semibold transition-colors",
                      isSelected ? "text-blue-400" : "text-slate-400 group-hover/card:text-white"
                    )}
                  >
                    <span>View Studio</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Architecture Modal */}
      <ProjectModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </section>
  );
}
