"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { Terminal, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

interface BootStep {
  step: string;
  command: string;
  detail: string;
  status: string;
  delay: number;
}

const BOOT_STEPS: BootStep[] = [
  {
    step: "01/03",
    command: "INIT_RUNTIME",
    detail: "Next.js 16 App Router & React 19 Core Engine",
    status: "STABLE",
    delay: 200,
  },
  {
    step: "02/03",
    command: "AUDIT_INTEGRITY",
    detail: "847 Automated Tests • Concurrency Row-Locks",
    status: "PASSED",
    delay: 750,
  },
  {
    step: "03/03",
    command: "ESTABLISH_SOCKETS",
    detail: "Laravel Reverb Mesh & Redis Horizon Queues",
    status: "ONLINE",
    delay: 1300,
  },
];

export function TerminalPreloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return !sessionStorage.getItem("tanbir_portfolio_booted");
    } catch {
      return true;
    }
  });
  const [completedSteps, setCompletedSteps] = useState<BootStep[]>([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [pathCurve, setPathCurve] = useState("M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z");
  const dismissedRef = useRef(false);

  const dismissPreloader = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setIsExiting(true);

    // Elastic curve snap on dismissal
    setPathCurve("M 0 0 L 100 0 L 100 70 Q 50 110 0 70 Z");

    setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("tanbir_portfolio_booted", "true");
      } catch {
        // Safe fallback for strict privacy storage
      }
      document.body.style.overflow = "";
    }, 750);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Lock page scrolling during boot animation
    document.body.style.overflow = "hidden";

    // Progress counter interpolation
    const start = performance.now();
    const duration = 1800; // Total counter duration

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - start;
      const linearRatio = Math.min(elapsed / duration, 1);
      // Quad ease-in-out curve
      const easedRatio =
        linearRatio < 0.5
          ? 2 * linearRatio * linearRatio
          : 1 - Math.pow(-2 * linearRatio + 2, 2) / 2;

      const currentVal = Math.round(easedRatio * 100);
      setProgress(currentVal);

      if (linearRatio < 1 && !dismissedRef.current) {
        requestAnimationFrame(updateProgress);
      } else if (!dismissedRef.current) {
        setProgress(100);
        setTimeout(dismissPreloader, 350);
      }
    };

    const rafId = requestAnimationFrame(updateProgress);

    // Step-by-step diagnostic telemetry logs
    const timers: NodeJS.Timeout[] = [];
    BOOT_STEPS.forEach((step) => {
      const t = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step]);
      }, step.delay);
      timers.push(t);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissPreloader();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dismissPreloader, visible]);

  // Synchronize with Lenis to prevent background inertial movement
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (visible && !isExiting) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, visible, isExiting]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="enhanced-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#09090b] text-[#f8fafc] font-mono select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(14,165,233,0.08),transparent_70%)]"
          />

          {/* Top Bar: Telemetry Status & Instant Skip */}
          <header className="relative z-10 flex items-center justify-between border-b border-white/[0.08] px-6 py-5 sm:px-12 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold tracking-tight text-white">TANBIR AHMED</span>
                <span className="text-neutral-500">•</span>
                <span className="hidden sm:inline text-neutral-400 font-medium">SYSTEMS ARCHITECT & LEAD ENGINEER</span>
              </div>
            </div>

            <button
              onClick={dismissPreloader}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-neutral-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
            >
              <span>Skip Boot</span>
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-neutral-400 group-hover:text-white transition-colors">
                ESC
              </kbd>
            </button>
          </header>

          {/* Center Stage: High-Craft Terminal Console */}
          <main className="relative z-10 mx-auto w-full max-w-2xl px-6 sm:px-8 my-auto">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d11]/90 shadow-2xl backdrop-blur-xl">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-neutral-400">kernel-boot@tanbir-vps</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <Cpu className="h-3.5 w-3.5 text-sky-400" />
                  <span>x86_64 • PRODUCTION</span>
                </div>
              </div>

              {/* Terminal Diagnostics Body */}
              <div className="min-h-[190px] p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-neutral-400 text-xs">
                  <Terminal className="h-3.5 w-3.5 text-sky-400" />
                  <span>$ boot --service=distributed-mesh --strict-audit</span>
                </div>

                {completedSteps.map((step) => (
                  <motion.div
                    key={step.command}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 rounded-lg bg-white/[0.02] px-3 py-2 border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-neutral-200">[{step.command}]</span>
                      <span className="text-neutral-400 text-xs truncate">{step.detail}</span>
                    </div>
                    <span className="self-end sm:self-auto rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      {step.status}
                    </span>
                  </motion.div>
                ))}

                {completedSteps.length < BOOT_STEPS.length && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
                    <span className="inline-block h-3.5 w-1.5 animate-pulse bg-sky-400" />
                    <span>Orchestrating system dependencies...</span>
                  </div>
                )}
              </div>

              {/* Integrated Bottom Progress Tracker */}
              <div className="border-t border-white/[0.08] bg-white/[0.01] p-3 px-5 sm:px-6">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="text-[11px] font-mono">SYSTEM COMPILATION</span>
                  <span className="font-bold text-white font-mono">{progress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </main>

          {/* Bottom Telemetry & Large Typography Counter */}
          <footer className="relative z-10 flex flex-col-reverse sm:flex-row sm:items-end justify-between border-t border-white/[0.08] px-6 py-6 sm:px-12 gap-4">
            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-semibold">Production Platform Ready</span>
              </div>
              <div className="text-[11px] text-neutral-500">
                Dhaka (Imjol IT & Sultan Big Bazaar) • Canada (Zamzam Inc)
              </div>
            </div>

            <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start">
              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">
                INITIALIZING
              </div>
              <div className="font-sans text-5xl sm:text-7xl font-black text-white tracking-tighter tabular-nums leading-none">
                {String(progress).padStart(2, "0")}
                <span className="text-xl sm:text-2xl font-light text-neutral-500 ml-1">%</span>
              </div>
            </div>
          </footer>

          {/* Liquid Curved Bottom Edge SVG for Elastic Curtain Exit */}
          <svg
            className="absolute -bottom-24 left-0 w-full h-24 fill-[#09090b] pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d={pathCurve} />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
