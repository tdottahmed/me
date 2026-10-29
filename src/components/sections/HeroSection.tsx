"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { EASE_OUT_EXPO } from "@/components/ui/Reveal";
import { TelemetryWidget } from "./TelemetryWidget";
import { PillarsCarousel } from "@/components/ui/PillarsCarousel";
import { useToast } from "@/components/ui/Toast";
import { useLenis } from "lenis/react";
import confetti from "canvas-confetti";
import {
  ArrowDown,
  FileDown,
  Mail,
  Check,
  Lock,
} from "lucide-react";

export function HeroSection() {
  const { personal, metrics } = PORTFOLIO_DATA;
  const { showToast } = useToast();
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#3b82f6", "#10b981", "#60a5fa"],
    });
    showToast(`Email copied: ${personal.email}`, "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToProjects = () => {
    lenis?.scrollTo("#projects", { offset: -72, duration: 1.4 });
  };

  return (
    <section id="overview" className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
      {/* 12-Column Asymmetric Grid */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column (7 cols): Narrative & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-mono font-medium text-blue-400"
          >
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span>FULL-STACK SOFTWARE ENGINEER • DHAKA, BANGLADESH</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1 }}
            className="font-sans text-3xl min-[400px]:text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl leading-[1.14] break-words"
          >
            Architecting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              High-Concurrency
            </span>
            , Real-Time Web Systems.
          </motion.h1>

          {/* Subheadline & Core Experience Lead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Full-stack developer with{" "}
            <span className="font-semibold text-white">3.5+ years of production experience</span>{" "}
            building and deploying high-reliability web platforms in{" "}
            <span className="text-rose-400 font-semibold">Laravel</span>,{" "}
            <span className="text-emerald-400 font-semibold">Django</span>,{" "}
            <span className="text-blue-400 font-semibold">Next.js</span>, and{" "}
            <span className="text-cyan-400 font-semibold">React</span>.
          </motion.p>

          {/* Animated Engineering Pillars Carousel for All Screen Sizes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.25 }}
            className="pt-1"
          >
            <PillarsCarousel />
          </motion.div>

          {/* Action CTAs: Full-width on mobile, inline on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2"
          >
            {/* Primary Magnetic CTA */}
            <MagneticButton className="w-full sm:w-auto">
              <button
                onClick={scrollToProjects}
                className="w-full group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-5 py-3.5 sm:py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Explore Production Projects</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </button>
            </MagneticButton>

            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3">
              {/* Resume Button */}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-all"
              >
                <FileDown className="h-4 w-4 text-amber-400" />
                <span>ATS Resume</span>
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Production Uptime & Verification Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-slate-500"
          >
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production High-Availability (VPS Hardened)</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Lock className="h-3.5 w-3.5 text-amber-400" />
              <span>ACID Row-Locks Guaranteed</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column (5 cols): Interactive Telemetry Bento Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <TelemetryWidget />
        </motion.div>
      </div>

      {/* Hero Metrics Bar with NumberTicker */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.4 }}
        className="mt-14 sm:mt-16 grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`glass-panel glass-panel-hover rounded-xl p-3.5 sm:p-5 text-center ${
              idx === metrics.length - 1 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400">
              <NumberTicker
                value={item.value}
                decimalPlaces={item.value % 1 !== 0 ? 1 : 0}
              />
              <span>{item.suffix}</span>
            </div>
            <div className="mt-1 text-[11px] sm:text-xs font-sans text-slate-400 leading-tight">
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
