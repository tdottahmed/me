"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Layout,
  Server,
  Database,
  ShieldCheck,
  Zap,
  Lock,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SimulationMode = "locks" | "websockets" | "ledger";

interface StageData {
  step: string;
  shortLabel: string;
  layerTag: string;
  title: string;
  techTags: string[];
  role: string;
  codeSnippet: string;
  metricBadge: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: {
    color: string;
    border: string;
    bg: string;
    text: string;
    pillBg: string;
    glow: string;
  };
}

interface ScenarioConfig {
  id: SimulationMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  summaryVerdict: string;
  stages: StageData[];
}

const SCENARIOS: ScenarioConfig[] = [
  {
    id: "locks",
    label: "Row Lock",
    icon: Lock,
    summaryVerdict: "Pessimistic Stock Lock Held: 0 Concurrent Overselling",
    stages: [
      {
        step: "01",
        shortLabel: "Client",
        layerTag: "STAGE 01 • CLIENT STOREFRONT",
        title: "Next.js 16 Storefront Checkout",
        techTags: ["Next.js 16", "React 19", "TypeScript"],
        role: "2 shoppers click 'Place Order' on the final inventory unit at the same millisecond.",
        codeSnippet: `POST /api/orders/checkout\nPayload: { sku: "PROD-42", qty: 1, idempotency: "uuid-v4" }\nStatus: HTTP 200 Initiated • Latency: 12ms`,
        metricBadge: "TTFB < 24ms",
        icon: Layout,
        accent: {
          color: "blue",
          border: "border-blue-500/40",
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          pillBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
          glow: "rgba(59, 130, 246, 0.4)",
        },
      },
      {
        step: "02",
        shortLabel: "Gateway",
        layerTag: "STAGE 02 • UNIFIED GATEWAY",
        title: "Laravel & Django Service Layer",
        techTags: ["Laravel 13", "Django DRF", "RBAC"],
        role: "Validates HMAC token, client credentials, and initiates an ACID transaction with rollback guards.",
        codeSnippet: `DB::transaction(function () use ($sku) {\n  // Atomic scope initialized with strict rollback guard\n  return OrderService::processReservation($sku);\n});`,
        metricBadge: "HMAC Verified",
        icon: Server,
        accent: {
          color: "rose",
          border: "border-rose-500/40",
          bg: "bg-rose-500/10",
          text: "text-rose-400",
          pillBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          glow: "rgba(244, 63, 94, 0.4)",
        },
      },
      {
        step: "03",
        shortLabel: "Lock Engine",
        layerTag: "STAGE 03 • CONCURRENCY ENGINE",
        title: "SELECT FOR UPDATE Row Lock",
        techTags: ["Pessimistic Lock", "PostgreSQL", "MariaDB"],
        role: "Acquires an exclusive database lock on the product row; competing checkout is held in a wait state.",
        codeSnippet: `SELECT stock FROM products WHERE id = 42 FOR UPDATE;\n-- Thread A acquired lock. Thread B held in wait state.\nUPDATE products SET stock = stock - 1;`,
        metricBadge: "0 Race Conditions",
        icon: Lock,
        accent: {
          color: "amber",
          border: "border-amber-500/40",
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          pillBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          glow: "rgba(245, 158, 11, 0.4)",
        },
      },
      {
        step: "04",
        shortLabel: "Ledger DB",
        layerTag: "STAGE 04 • PERSISTENCE & AUDIT",
        title: "Immutable Ledger & Clean Lock Release",
        techTags: ["Append-Only Ledger", "Redis Queue", "Audit Trail"],
        role: "Decrements stock to 0, generates immutable invoice, releases lock. Thread B resumes and safely receives OutOfStock.",
        codeSnippet: `COMMIT; -- Thread A order confirmed.\n-- Thread B resumes -> reads stock = 0 -> Clean OutOfStockException.\nINSERT INTO audit_ledger (event, status) VALUES ('PURCHASE', 'OK');`,
        metricBadge: "100% ACID Integrity",
        icon: Database,
        accent: {
          color: "emerald",
          border: "border-emerald-500/40",
          bg: "bg-emerald-500/10",
          text: "text-emerald-400",
          pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          glow: "rgba(16, 185, 129, 0.4)",
        },
      },
    ],
  },
  {
    id: "websockets",
    label: "WebSockets",
    icon: Zap,
    summaryVerdict: "Reverb Broadcast Complete: Channel latency 14ms",
    stages: [
      {
        step: "01",
        shortLabel: "Client",
        layerTag: "STAGE 01 • CLIENT ECHO LISTENER",
        title: "Laravel Echo WebSockets Client",
        techTags: ["React 19", "Laravel Echo", "Pusher Protocol"],
        role: "Next.js client maintains persistent WebSocket connection listening on private veterinarian and student desks.",
        codeSnippet: `Echo.private('consultation.88')\n  .listen('MessageBroadcast', (e) => updateChat(e))\n  .listen('OrderStatusUpdated', (e) => refreshState(e));`,
        metricBadge: "ws:// Connected",
        icon: Layout,
        accent: {
          color: "blue",
          border: "border-blue-500/40",
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          pillBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
          glow: "rgba(59, 130, 246, 0.4)",
        },
      },
      {
        step: "02",
        shortLabel: "Gateway",
        layerTag: "STAGE 02 • EVENT DISPATCHER",
        title: "Broadcast Event Dispatcher",
        techTags: ["Laravel 13", "ShouldBroadcast", "Event Sourcing"],
        role: "Controller fires real-time event implementing ShouldBroadcast with encrypted tenant channels.",
        codeSnippet: `event(new OrderPlaced($order));\n// Dispatches to Redis queue with encrypted payload\n// Authorized via Sanctum bearer token`,
        metricBadge: "Dispatched in 2ms",
        icon: Server,
        accent: {
          color: "rose",
          border: "border-rose-500/40",
          bg: "bg-rose-500/10",
          text: "text-rose-400",
          pillBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          glow: "rgba(244, 63, 94, 0.4)",
        },
      },
      {
        step: "03",
        shortLabel: "Reverb Mesh",
        layerTag: "STAGE 03 • WEBSOCKET DAEMON",
        title: "Laravel Reverb High-Concurrency Mesh",
        techTags: ["Laravel Reverb", "Redis Horizon", "Supervisor"],
        role: "Pure PHP WebSocket server running under Supervisor handles thousands of concurrent socket connections.",
        codeSnippet: `php artisan reverb:start --port=8080 --host=0.0.0.0\n[Channel: consultation.88] Broadcast delivered to 4 clients (14ms)\nHorizon queue worker throughput: 850 jobs/sec`,
        metricBadge: "<18ms Latency",
        icon: Zap,
        accent: {
          color: "amber",
          border: "border-amber-500/40",
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          pillBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          glow: "rgba(245, 158, 11, 0.4)",
        },
      },
      {
        step: "04",
        shortLabel: "Persistence",
        layerTag: "STAGE 04 • EVENT REPLAY LOG",
        title: "Audit Stream & Message Persistence",
        techTags: ["PostgreSQL", "Redis Stream", "Time-Series"],
        role: "Every event is committed with a cryptographic sequence index to guarantee zero lost messages.",
        codeSnippet: `INSERT INTO chat_messages (channel, payload, sent_at)\nVALUES ('consultation.88', $encryptedData, NOW());\nRedis::publish('telemetry_stream', $eventPayload);`,
        metricBadge: "Zero Dropped Events",
        icon: Database,
        accent: {
          color: "emerald",
          border: "border-emerald-500/40",
          bg: "bg-emerald-500/10",
          text: "text-emerald-400",
          pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          glow: "rgba(16, 185, 129, 0.4)",
        },
      },
    ],
  },
  {
    id: "ledger",
    label: "Idempotent Ledger",
    icon: ShieldCheck,
    summaryVerdict: "Double-Entry Ledger Verified: Debits = Credits (৳0.00 drift)",
    stages: [
      {
        step: "01",
        shortLabel: "Webhook",
        layerTag: "STAGE 01 • PAYMENT WEBHOOK",
        title: "SSLCommerz / Stripe Webhook Ingestion",
        techTags: ["SSLCommerz", "Stripe API", "TLS 1.3"],
        role: "External gateway delivers signed callback payload confirming successful customer transaction.",
        codeSnippet: `POST /webhooks/payment/sslcommerz\nHeaders: { X-Signature: "hmac_sha256_hash", Idempotency-Key: "uuid-v4" }\nPayload: { tran_id: "TX-904", amount: 1499.00, status: "VALID" }`,
        metricBadge: "Signed Payload",
        icon: Layout,
        accent: {
          color: "blue",
          border: "border-blue-500/40",
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          pillBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
          glow: "rgba(59, 130, 246, 0.4)",
        },
      },
      {
        step: "02",
        shortLabel: "Signature",
        layerTag: "STAGE 02 • SIGNATURE & DEDUP",
        title: "HMAC Verification & Idempotency Key",
        techTags: ["HMAC-SHA256", "Redis Key Expiry", "Zero Drift"],
        role: "Verifies payload hash using shared secret and queries Redis to block duplicate replay attacks.",
        codeSnippet: `$valid = hash_equals(hash_hmac('sha256', $body, $secret), $sig);\nif (!Redis::set("idemp:{$key}", 1, "NX", "EX", 86400)) {\n  return response()->json(['status' => 'duplicate_blocked'], 200);\n}`,
        metricBadge: "Replay Attack Blocked",
        icon: Server,
        accent: {
          color: "rose",
          border: "border-rose-500/40",
          bg: "bg-rose-500/10",
          text: "text-rose-400",
          pillBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          glow: "rgba(244, 63, 94, 0.4)",
        },
      },
      {
        step: "03",
        shortLabel: "Double-Entry",
        layerTag: "STAGE 03 • DOUBLE-ENTRY LEDGER",
        title: "Decimal Arithmetic & Balance Book",
        techTags: ["Decimal Precision", "Double-Entry Book", "BCMath"],
        role: "Zero float rounding errors: every monetary transaction creates balanced debit and credit entries.",
        codeSnippet: `Dr Merchant Payable:     ৳1,400.00\nDr Platform Commission:    ৳99.00\nCr Customer Receivable:  ৳1,499.00\nVerification: Sum(Dr) == Sum(Cr) -> Difference: ৳0.0000`,
        metricBadge: "Dr ৳1499 == Cr ৳1499",
        icon: Lock,
        accent: {
          color: "amber",
          border: "border-amber-500/40",
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          pillBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          glow: "rgba(245, 158, 11, 0.4)",
        },
      },
      {
        step: "04",
        shortLabel: "Audit Trail",
        layerTag: "STAGE 04 • IMMUTABLE AUDIT",
        title: "Append-Only SQL Journal",
        techTags: ["Append-Only SQL", "SHA256 Chain", "Read-Only Snapshots"],
        role: "Entries are immutable and append-only; historical entries are never overwritten or deleted.",
        codeSnippet: `INSERT INTO ledger_journal (tx_id, dr_total, cr_total, checksum)\nVALUES ('TX-904', 1499.00, 1499.00, 'sha256:d8a9e7...');\n-- Audit trail immutable: Real-time P&L accounts verified.`,
        metricBadge: "0.00 Drift Verified",
        icon: Database,
        accent: {
          color: "emerald",
          border: "border-emerald-500/40",
          bg: "bg-emerald-500/10",
          text: "text-emerald-400",
          pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          glow: "rgba(16, 185, 129, 0.4)",
        },
      },
    ],
  },
];

const AUTO_STEP_DURATION = 4200; // 4.2 seconds per stage
const TOTAL_STAGES = 4;

export function SystemFlowBeam() {
  const [mode, setMode] = useState<SimulationMode>("locks");
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentScenario = SCENARIOS.find((s) => s.id === mode) || SCENARIOS[0];
  const stages = currentScenario.stages;
  const activeStage = stages[currentStageIdx] || stages[0];
  const ActiveIcon = activeStage.icon;

  const goToNextStage = useCallback(() => {
    setDirection(1);
    setCurrentStageIdx((prev) => (prev + 1) % TOTAL_STAGES);
    setProgress(0);
  }, []);

  const goToPrevStage = useCallback(() => {
    setDirection(-1);
    setCurrentStageIdx((prev) => (prev - 1 + TOTAL_STAGES) % TOTAL_STAGES);
    setProgress(0);
  }, []);

  const goToStage = (idx: number) => {
    if (idx === currentStageIdx) return;
    setDirection(idx > currentStageIdx ? 1 : -1);
    setCurrentStageIdx(idx);
    setProgress(0);
  };

  const handleScenarioChange = (newMode: SimulationMode) => {
    setMode(newMode);
    setCurrentStageIdx(0);
    setDirection(1);
    setProgress(0);
  };

  // Auto-play stepper progression
  useEffect(() => {
    if (isPaused || !isAutoPlayEnabled) return;

    const intervalTime = 50;
    const step = (intervalTime / AUTO_STEP_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextStage();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, isAutoPlayEnabled, goToNextStage]);

  // Touch swipe gesture support for mobile
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      goToNextStage();
    } else if (diff < -45) {
      goToPrevStage();
    }
    touchStartX.current = null;
  };

  const stageSlideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 20 : -20,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 32 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -20 : 20,
      opacity: 0,
      scale: 0.99,
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 32 },
        opacity: { duration: 0.16 },
      },
    }),
  };

  return (
    <div
      className="relative flex flex-col font-mono text-xs select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Symmetrical Scenario Selector Bar (Fixed Height) */}
      <div className="grid grid-cols-3 gap-1.5 pb-3 border-b border-[var(--border-subtle)]">
        {SCENARIOS.map((s) => {
          const isActive = mode === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s.id)}
              className={cn(
                "relative flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-mono transition-all cursor-pointer truncate",
                isActive
                  ? "bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] font-semibold shadow-sm"
                  : "bg-[var(--glass-pill-bg)] text-[var(--muted-foreground)] border border-[var(--border-subtle)] hover:text-[var(--foreground)]"
              )}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="truncate">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Decoupled Horizontal Stepper Pipeline (Mathematical Line Center Alignment) */}
      <div className="relative pt-3 pb-2">
        {/* Dedicated Circle Nodes Row (Fixed Height: h-8 = 32px) */}
        <div className="relative h-8 flex items-center">
          {/* Connecting Background Line: Exactly spans from Center of Node 1 (12.5%) to Center of Node 4 (87.5%) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-[var(--border-subtle)] z-0" />

          {/* Animated Active Beam: Progresses exactly between node centers */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[12.5%] right-[12.5%] h-0.5 z-0 overflow-hidden">
            <motion.div
              className="h-full bg-[var(--foreground)] opacity-80"
              animate={{
                width: `${(currentStageIdx / (TOTAL_STAGES - 1)) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </div>

          {/* 4 Circle Nodes Grid */}
          <div className="relative z-10 grid grid-cols-4 w-full">
            {stages.map((stage, idx) => {
              const isActive = currentStageIdx === idx;
              const isCompleted = currentStageIdx > idx;

              return (
                <div key={stage.step} className="flex items-center justify-center">
                  <button
                    onClick={() => goToStage(idx)}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-300 cursor-pointer focus:outline-none",
                      isActive
                        ? "scale-110 shadow-lg bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] border-[var(--card-contrast-fg)]"
                        : isCompleted
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                        : "border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    )}
                    aria-label={`Go to ${stage.shortLabel} stage`}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <span>{stage.step}</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Labels Row (Fixed Height: h-4, Text Never Displaces Circles Above) */}
        <div className="grid grid-cols-4 w-full text-center mt-1 h-4">
          {stages.map((stage, idx) => {
            const isActive = currentStageIdx === idx;
            const isCompleted = currentStageIdx > idx;
            return (
              <span
                key={stage.step}
                className={cn(
                  "text-[10px] font-mono truncate leading-none px-1 transition-colors",
                  isActive
                    ? "text-[var(--foreground)] font-bold"
                    : isCompleted
                    ? "text-[var(--muted-foreground)]"
                    : "text-[var(--muted-foreground)] opacity-60"
                )}
              >
                {stage.shortLabel}
              </span>
            );
          })}
        </div>
      </div>

      {/* 3. Spacious Active Stage Inspector Card (Strict Fixed Height: h-[280px], Zero Layout Shift) */}
      <div className="relative h-[285px] sm:h-[275px] rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4 sm:p-5 shadow-xl overflow-hidden mt-1.5 flex flex-col justify-between">
        {/* Animated Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--border-subtle)] overflow-hidden">
          <div
            className="h-full bg-[var(--foreground)] opacity-70 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${mode}-${activeStage.step}`}
            custom={direction}
            variants={stageSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full"
          >
            {/* Top Row: Layer Tag (Left) & Top Verified Metric Indicator Badge (Right - Never Displaced) */}
            <div>
              <div className="flex items-center justify-between gap-2 h-6">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--foreground)]"
                  >
                    <ActiveIcon className="h-3 w-3" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider truncate text-[var(--foreground)]">
                    {activeStage.layerTag}
                  </span>
                </div>

                {/* Top Indicator Badge: Locked at top right, never displaced by title */}
                <div
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--foreground)] shrink-0"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeStage.metricBadge}</span>
                </div>
              </div>

              {/* Dedicated Title Row: Full width, fixed height h-6, never collides with badge */}
              <h4 className="font-sans text-sm sm:text-base font-bold text-[var(--foreground)] mt-1.5 leading-snug truncate">
                {activeStage.title}
              </h4>

              {/* Fixed-Height Description: 2 lines max, h-9 */}
              <p className="mt-1 text-[11px] sm:text-xs text-[var(--muted-foreground)] leading-relaxed font-normal h-9 line-clamp-2 overflow-hidden">
                {activeStage.role}
              </p>
            </div>

            {/* Code / Protocol Payload Box (Fixed Height: h-[68px]) */}
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2.5 font-mono text-[11px] text-[var(--foreground)] shadow-inner h-[68px] overflow-hidden my-1">
              <pre className="text-[var(--foreground)] whitespace-pre-wrap leading-relaxed font-mono">
                {activeStage.codeSnippet}
              </pre>
            </div>

            {/* Tech Stack Chips (Fixed Height: h-5) */}
            <div className="flex items-center gap-1.5 h-5 overflow-hidden">
              {activeStage.techTags.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--muted-foreground)] truncate shrink-0"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Bottom Verdict & Navigation Controls */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-[var(--border-subtle)] text-[11px]">
        {/* Live System Verdict */}
        <div className="flex items-center gap-2 text-emerald-500 truncate">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate text-[10px] sm:text-[11px] font-medium">
            {currentScenario.summaryVerdict}
          </span>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center justify-end gap-1.5 shrink-0">
          <span className="font-mono text-[10px] text-[var(--muted-foreground)] mr-1">
            0{activeStage.step} / 0{TOTAL_STAGES}
          </span>

          {/* Autoplay Play/Pause */}
          <button
            onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label={isAutoPlayEnabled ? "Pause stepper" : "Resume stepper"}
            title={isAutoPlayEnabled ? "Pause" : "Play"}
          >
            {isAutoPlayEnabled && !isPaused ? (
              <Pause className="h-2.5 w-2.5" />
            ) : (
              <Play className="h-2.5 w-2.5 fill-current" />
            )}
          </button>

          {/* Prev Stage */}
          <button
            onClick={goToPrevStage}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Previous architectural stage"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>

          {/* Next Stage */}
          <button
            onClick={goToNextStage}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Next architectural stage"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
