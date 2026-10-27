"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { Terminal, ShieldCheck, Check, FastForward } from "lucide-react";

const BOOT_LOGS = [
  { text: "Mounting Next.js 16 & React 19 Runtime...", status: "READY", delay: 150 },
  { text: "Verifying 847 Automated Test Suites...", status: "PASSED", delay: 650 },
  { text: "Establishing Reverb WebSocket & Ledger Integrity...", status: "ONLINE", delay: 1150 },
];

export function TerminalPreloader() {
  const [visible, setVisible] = useState(true);
  const [logs, setLogs] = useState<{ text: string; status: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Check session storage
    const hasBooted = sessionStorage.getItem("tanbir_portfolio_booted");
    if (hasBooted) {
      setVisible(false);
      return;
    }

    // Disable scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 45);

    // Logs timing
    const timers: NodeJS.Timeout[] = [];
    BOOT_LOGS.forEach((log) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, log.delay);
      timers.push(t);
    });

    // Complete after 2.1 seconds
    const finishTimer = setTimeout(() => {
      dismissPreloader();
    }, 2200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissPreloader();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  // body overflow alone doesn't stop Lenis from scrolling the page underneath
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (visible && !isSkipped) lenis.stop();
    else lenis.start();
  }, [lenis, visible, isSkipped]);

  const dismissPreloader = () => {
    setIsSkipped(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("tanbir_portfolio_booted", "true");
      document.body.style.overflow = "";
    }, 400);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!isSkipped && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#070a12] p-6 sm:p-12 text-[#f8fafc] font-mono select-none"
        >
          {/* Top telemetry bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-200">tanbir.nixsoftware.net</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-500">PRODUCTION SYSTEM BOOT</span>
            </div>
            <button
              onClick={dismissPreloader}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
            >
              <span>Skip</span>
              <kbd className="rounded bg-slate-800 px-1 py-0.2 text-[9px] text-slate-500">ESC</kbd>
            </button>
          </div>

          {/* Center: Monospace terminal */}
          <div className="mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0b101c]/90 shadow-2xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-slate-400">ci-cd-runner@tanbir-vps:~</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Terminal className="h-3.5 w-3.5 text-blue-400" />
                  <span>bash 5.2</span>
                </div>
              </div>

              {/* Terminal Logs Body */}
              <div className="min-h-[170px] space-y-3 p-5 text-xs sm:text-sm">
                <div className="text-slate-500">
                  $ initialize --environment=production --strict-audit
                </div>
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-bold text-emerald-400 text-[10px]">
                      [OK]
                    </span>
                    <span className="text-slate-200">{log.text}</span>
                    <span className="ml-auto text-[11px] font-semibold text-emerald-400">
                      {log.status}
                    </span>
                  </motion.div>
                ))}

                {logs.length < BOOT_LOGS.length && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="inline-block h-4 w-2 animate-pulse bg-blue-500" />
                    <span className="text-xs">Executing system checks...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom telemetry & big counter */}
          <div className="flex items-end justify-between border-t border-slate-800/80 pt-6">
            <div className="space-y-1 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Idempotent Webhooks & Double-Entry Ledgers Active</span>
              </div>
              <div className="text-[11px] text-slate-600">
                Dhaka (Imjol IT & Sultan Big Bazaar) • Canada (Zamzam Inc)
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Boot Integrity
              </div>
              <div className="font-sans text-4xl sm:text-6xl font-black text-blue-400 tracking-tighter">
                {String(progress).padStart(2, "0")}
                <span className="text-lg sm:text-2xl font-light text-slate-500">%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
