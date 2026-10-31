"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  ShieldCheck,
  Lock,
  Zap,
  Server,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ArchTab = "checkout" | "websockets" | "vps";

interface TabMeta {
  id: ArchTab;
  number: string;
  shortTitle: string;
  fullTitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ARCH_TABS: TabMeta[] = [
  {
    id: "checkout",
    number: "01",
    shortTitle: "1. Row Locks",
    fullTitle: "1. Money-Safe Checkout & Row Locks",
    icon: Lock,
  },
  {
    id: "websockets",
    number: "02",
    shortTitle: "2. WebSockets",
    fullTitle: "2. Reverb WebSockets & Real-Time Events",
    icon: Zap,
  },
  {
    id: "vps",
    number: "03",
    shortTitle: "3. Hardened VPS",
    fullTitle: "3. Hardened Linux VPS & CI/CD Pipeline",
    icon: Server,
  },
];

const AUTO_TOUR_DURATION = 9000;

export function ArchitectureSimulator() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  // Money-Safe Checkout Simulation State
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // WebSockets simulation
  const [wsPings, setWsPings] = useState<string[]>([]);

  const activeTabMeta = ARCH_TABS[activeTabIndex];
  const activeTab = activeTabMeta.id;

  const goToNextTab = useCallback(() => {
    setDirection(1);
    setActiveTabIndex((prev) => (prev + 1) % ARCH_TABS.length);
    setProgress(0);
  }, []);

  const goToPrevTab = useCallback(() => {
    setDirection(-1);
    setActiveTabIndex((prev) => (prev - 1 + ARCH_TABS.length) % ARCH_TABS.length);
    setProgress(0);
  }, []);

  const goToTab = (index: number) => {
    if (index === activeTabIndex) return;
    setDirection(index > activeTabIndex ? 1 : -1);
    setActiveTabIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused || !isAutoPlayEnabled || simulating) return;

    const intervalTime = 50;
    const step = (intervalTime / AUTO_TOUR_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextTab();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, isAutoPlayEnabled, simulating, goToNextTab]);

  const startCheckoutSimulation = () => {
    setSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => setSimStep(4), 2100);
    setTimeout(() => setSimStep(5), 2800);
    setTimeout(() => setSimulating(false), 3200);
  };

  const resetCheckoutSimulation = () => {
    setSimulating(false);
    setSimStep(0);
  };

  const triggerWsBroadcast = () => {
    const time = new Date().toLocaleTimeString();
    const id = Math.random().toString(36).substring(2, 6);
    setWsPings((prev) => [
      `[${time}] Event 'OrderPlaced': Dispatched to private-channel.store.1 (Latency: 18ms, ID: ${id})`,
      ...prev.slice(0, 3),
    ]);
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      goToNextTab();
    } else if (diff < -45) {
      goToPrevTab();
    }
    touchStartX.current = null;
  };

  const tabSlideVariants: Variants = {
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
    <section id="architecture" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      {/* Background radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[360px] w-[650px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)]" />
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3.5 py-1 text-[11px] font-mono font-medium text-[var(--text-secondary)] shadow-sm uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>PRODUCTION VERIFICATION SIMULATOR</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
          Engineering Deep-Dive Architecture
        </h2>

        <p className="mt-4 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)] font-medium">
          Interactive visual simulators illustrating how financial correctness, real-time concurrency,
          and hardened VPS infrastructure work under high load.
        </p>
      </div>

      {/* Main Glass Panel Simulator Carousel */}
      <div
        className="mt-12 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-2xl transition-all"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated Progress Bar */}
        <div className="h-0.5 sm:h-1 w-full bg-[var(--border-subtle)] overflow-hidden">
          <div
            className="h-full bg-[var(--foreground)] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tab Controls Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2 sm:p-2.5">
          {/* Scrollable Tabs */}
          <div className="overflow-x-auto scrollbar-none flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-1.5 min-w-max">
              {ARCH_TABS.map((tab, idx) => {
                const isActive = activeTabIndex === idx;
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => goToTab(idx)}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all cursor-pointer shrink-0",
                      isActive
                        ? "text-[var(--background)] font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-neutral-500/10"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeArchTabPill"
                        className="absolute inset-0 rounded-full bg-[var(--foreground)] shadow-sm -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.fullTitle}</span>
                    <span className="sm:hidden">{tab.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 pl-1">
            <div className="rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)] hidden sm:inline mr-1">
              <span className="text-[var(--foreground)] font-semibold">0{activeTabIndex + 1}</span> / 0{ARCH_TABS.length}
            </div>

            <button
              onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              aria-label={isAutoPlayEnabled ? "Pause architecture tour" : "Resume architecture tour"}
            >
              {isAutoPlayEnabled && !isPaused && !simulating ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-current" />
              )}
            </button>

            <button
              onClick={goToPrevTab}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              aria-label="Previous architecture scenario"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            <button
              onClick={goToNextTab}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              aria-label="Next architecture scenario"
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Tab Content Slides Container */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Tab 1: Money-Safe Checkout Simulator */}
            {activeTab === "checkout" && (
              <motion.div
                key="checkout"
                custom={direction}
                variants={tabSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-5 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                      <span>Pessimistic Row-Level Lock & Idempotent Ledger Pipeline</span>
                      <span className="rounded-full bg-[var(--status-live)]/10 px-2.5 py-0.5 font-mono text-[10px] text-[var(--status-live)] border border-[var(--status-live)]/20 font-semibold">
                        ACID Guaranteed
                      </span>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      How Sultan Big Bazaar & Fur & Feather BD prevent overselling when 2 customers purchase the final stock unit at the same millisecond.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={startCheckoutSimulation}
                      disabled={simulating}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-5 py-2.5 font-mono text-xs font-semibold shadow-md hover:opacity-90 disabled:opacity-50 cursor-pointer transition-all"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{simulating ? "Executing Locks..." : "Simulate Concurrent Order"}</span>
                    </button>
                    {simStep > 0 && !simulating && (
                      <button
                        onClick={resetCheckoutSimulation}
                        className="flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                        title="Reset Simulation"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Step-by-Step Flow Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
                  {/* Step 1 */}
                  <div
                    className={cn(
                      "rounded-2xl border p-4 transition-all",
                      simStep >= 1
                        ? "border-[var(--foreground)] bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-sm"
                        : "border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--text-secondary)]"
                    )}
                  >
                    <div className="text-[10px] font-bold text-[var(--text-muted)]">STAGE 1</div>
                    <div className="font-semibold text-[var(--foreground)] mt-1">UUID Idempotency</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-2">
                      Client sends header <code className="text-[var(--foreground)] font-bold">Idempotency-Key</code>. Redis checks for duplicates.
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={cn(
                      "rounded-2xl border p-4 transition-all",
                      simStep >= 2
                        ? "border-[var(--foreground)] bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-sm"
                        : "border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--text-secondary)]"
                    )}
                  >
                    <div className="text-[10px] font-bold text-[var(--text-muted)]">STAGE 2</div>
                    <div className="font-semibold text-[var(--foreground)] mt-1">HMAC Signature</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-2">
                      Payment webhook signature verified using shared secret to block payload tampering.
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={cn(
                      "rounded-2xl border p-4 transition-all",
                      simStep >= 3
                        ? "border-[var(--foreground)] bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-sm"
                        : "border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--text-secondary)]"
                    )}
                  >
                    <div className="text-[10px] font-bold text-[var(--text-muted)]">STAGE 3</div>
                    <div className="font-semibold text-[var(--foreground)] mt-1">SELECT FOR UPDATE</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-2">
                      Pessimistic lock held on product stock row. Concurrent checkout wait-queued by DB engine.
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div
                    className={cn(
                      "rounded-2xl border p-4 transition-all",
                      simStep >= 4
                        ? "border-[var(--foreground)] bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-sm"
                        : "border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--text-secondary)]"
                    )}
                  >
                    <div className="text-[10px] font-bold text-[var(--text-muted)]">STAGE 4</div>
                    <div className="font-semibold text-[var(--foreground)] mt-1">Decimal Ledger</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-2">
                      No floating point rounding errors. Append-only ledger debits & credits balance exactly.
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div
                    className={cn(
                      "rounded-2xl border p-4 transition-all",
                      simStep >= 5
                        ? "border-[var(--foreground)] bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-sm"
                        : "border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--text-secondary)]"
                    )}
                  >
                    <div className="text-[10px] font-bold text-[var(--text-muted)]">STAGE 5</div>
                    <div className="font-semibold text-[var(--foreground)] mt-1">Order Committed</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-2">
                      Immutable invoice snapshot created. Row-lock released. Competing order receives OutOfStock.
                    </div>
                  </div>
                </div>

                {/* Real-time simulation feedback terminal */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--background)] p-4 font-mono text-xs">
                  <div className="text-[var(--text-muted)]">{"// Live Transaction Trace Log"}</div>
                  {simStep === 0 && (
                    <div className="text-[var(--text-secondary)] mt-1">
                      Click &quot;Simulate Concurrent Order&quot; above to watch the database lock engine handle concurrency.
                    </div>
                  )}
                  {simStep >= 1 && (
                    <div className="text-[var(--foreground)] mt-1">
                      [13:42:01.002] User A & User B issue concurrent checkout for Product #42 (Stock: 1).
                    </div>
                  )}
                  {simStep >= 2 && (
                    <div className="text-[var(--foreground)] mt-1">
                      [13:42:01.018] Both requests pass HMAC-SHA256 signature verification & Redis idempotency check.
                    </div>
                  )}
                  {simStep >= 3 && (
                    <div className="text-[var(--foreground)] font-semibold mt-1">
                      [13:42:01.025] User A acquires SELECT ... FOR UPDATE. User B put in waiting lock state.
                    </div>
                  )}
                  {simStep >= 4 && (
                    <div className="text-[var(--status-live)] mt-1">
                      [13:42:01.039] Stock decremented (1 -&gt; 0). Ledger: Credit Merchant Payable ৳1,400, Credit Platform Commission ৳99.
                    </div>
                  )}
                  {simStep >= 5 && (
                    <div className="text-[var(--status-live)] font-bold mt-1">
                      ✔ [13:42:01.048] User A order complete. User B resumes lock -&gt; Reads stock 0 -&gt; Clean OutOfStockException. Overselling PREVENTED!
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Reverb WebSockets Architecture */}
            {activeTab === "websockets" && (
              <motion.div
                key="websockets"
                custom={direction}
                variants={tabSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-5 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                      <span>Laravel Reverb + Horizon + Redis Broadcast Mesh</span>
                      <span className="rounded-full bg-[var(--status-live)]/10 px-2.5 py-0.5 font-mono text-[10px] text-[var(--status-live)] border border-[var(--status-live)]/20 font-semibold">
                        &lt; 25ms Broadcast Latency
                      </span>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Powers real-time doctor chats in Fur & Feather BD and live student desks in TradingChart.org.
                    </p>
                  </div>

                  <button
                    onClick={triggerWsBroadcast}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-5 py-2.5 font-mono text-xs font-semibold shadow-md hover:opacity-90 cursor-pointer transition-all"
                  >
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Broadcast Event to Channel</span>
                  </button>
                </div>

                {/* Architecture Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">1. Event Dispatch</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">User Triggers Action</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Laravel dispatches <code className="text-[var(--foreground)]">event(new OrderPlaced())</code> implementing <code className="font-bold">ShouldBroadcast</code>.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">2. Redis Queue</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">Horizon Orchestration</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Serialized event pushed to Redis queue. Horizon monitors throughput and prevents queue backpressure.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">3. Reverb Server</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">High-Concurrency WS</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Pure PHP WebSocket server running on port 8080 under Supervisor, handling thousands of concurrent sockets.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">4. Next.js / React Client</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">Private Channel Push</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Echo listens on <code className="text-[var(--foreground)]">private-user.{`{id}`}</code> with JWT authorization. UI updates reactively.
                    </div>
                  </div>
                </div>

                {/* Live Broadcast Ping Monitor */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--background)] p-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)]">
                    <span>{"// Live Reverb WebSocket Socket Stream"}</span>
                    <span className="flex items-center gap-1.5 text-[var(--status-live)] text-[11px]">
                      <span className="h-2 w-2 rounded-full bg-[var(--status-live)] animate-ping" />
                      CONNECTED (wss://reverb.production:443)
                    </span>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {wsPings.length === 0 ? (
                      <div className="text-[var(--text-secondary)]">
                        Click &quot;Broadcast Event to Channel&quot; above to simulate a live event delivery.
                      </div>
                    ) : (
                      wsPings.map((ping, idx) => (
                        <div key={idx} className="text-[var(--foreground)]">
                          {ping}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Hardened Linux VPS & CI/CD Pipeline */}
            {activeTab === "vps" && (
              <motion.div
                key="vps"
                custom={direction}
                variants={tabSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-5 sm:p-8 space-y-6"
              >
                <div className="border-b border-[var(--border-subtle)] pb-5">
                  <h3 className="font-sans text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                    <span>Hardened Ubuntu VPS & Automated CI/CD Lifecycle</span>
                    <span className="rounded-full bg-[var(--glass-pill-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--foreground)] border border-[var(--border-subtle)] font-semibold">
                      847 Automated Tests
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Zero-downtime deployment architecture managed on production Ubuntu VPS with strict security controls.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">1. GitHub Actions</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">Automated Test Matrix</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Runs 847 Django / PHPUnit tests, linting, and smoke checks. Deployment halts immediately on test failure.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">2. Cloudflare Strict TLS</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">Edge WAF & DNS</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Strict full encryption, DDoS protection, edge caching, and DNS automation via Cloudflare API.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">3. Fail2ban & Hardening</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">VPS Intrusion Defense</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Automated IP banning for brute-force SSH / HTTP probes, restricted sudo, and non-root service execution.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                    <div className="text-[var(--foreground)] font-bold">4. Nginx & Supervisor</div>
                    <div className="mt-1 text-[var(--foreground)] font-semibold">Zero-Downtime Daemon</div>
                    <div className="mt-2 text-[11px] text-[var(--text-secondary)]">
                      Reverse proxy with gzip/Brotli, rate-limiting, and systemd/Supervisor daemons auto-restarting workers.
                    </div>
                  </div>
                </div>

                {/* Checklist Box */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4 font-mono text-xs">
                  <div className="font-semibold text-[var(--foreground)] mb-2">Production Security & Reliability Checklist:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--status-live)] shrink-0" />
                      <span>Let&apos;s Encrypt wildcard certs renewed via Cloudflare DNS-01 challenge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--status-live)] shrink-0" />
                      <span>Automated daily offsite MySQL / PostgreSQL database backups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--status-live)] shrink-0" />
                      <span>Horizon & Celery workers supervised with memory ceiling restarts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--status-live)] shrink-0" />
                      <span>Cloudflare authenticated origin pulls (enforcing edge-only traffic)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
