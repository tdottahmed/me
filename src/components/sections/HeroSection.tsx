"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { EASE_OUT_EXPO } from "@/components/ui/Reveal";
import { TelemetryWidget } from "./TelemetryWidget";
import { PillarsCarousel } from "@/components/ui/PillarsCarousel";
import { useToast } from "@/components/ui/Toast";
import { useLenis } from "lenis/react";
import confetti from "canvas-confetti";
import {
  ArrowDown,
  ArrowRight,
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
      colors: ["#10b981", "#ffffff", "#09090b"],
    });
    showToast(`Email copied: ${personal.email}`, "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToProjects = () => {
    lenis?.scrollTo("#projects", { offset: -72, duration: 1.4 });
  };

  const scrollToContact = () => {
    lenis?.scrollTo("#contact", { offset: -72, duration: 1.4 });
  };

  return (
    <section id="overview" className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8">
      {/* 12-Column Asymmetric Grid */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column (7 cols): Narrative & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow Badge (Matches Screenshot pill) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3.5 py-1.5 text-xs font-mono font-medium text-[var(--text-secondary)] backdrop-blur-sm shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--status-live)] animate-pulse" />
            <span>FULL-STACK SOFTWARE ENGINEER • DHAKA, BANGLADESH</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1 }}
            className="font-sans text-3xl min-[400px]:text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl xl:text-6xl leading-[1.12] break-words"
          >
            Architecting High-Concurrency, Real-Time Web Systems.
          </motion.h1>

          {/* Subheadline & Core Experience Lead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium"
          >
            Full-stack software engineer with{" "}
            <span className="font-semibold text-[var(--foreground)]">3.5+ years of commercial experience</span>{" "}
            building and deploying high-reliability web platforms in{" "}
            <span className="font-semibold text-[var(--foreground)]">Laravel</span>,{" "}
            <span className="font-semibold text-[var(--foreground)]">Django</span>,{" "}
            <span className="font-semibold text-[var(--foreground)]">Next.js 16</span>, and{" "}
            <span className="font-semibold text-[var(--foreground)]">React 19</span>.
          </motion.p>

          {/* Engineering Pillars Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.25 }}
            className="pt-1"
          >
            <PillarsCarousel />
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2"
          >
            {/* Primary Pill Button */}
            <button
              onClick={scrollToProjects}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-6 py-3 text-xs font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Explore Production Platforms</span>
              <ArrowDown className="h-3.5 w-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3">
              {/* Resume Button */}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-4 py-3 text-xs font-medium text-[var(--foreground)] hover:border-[var(--text-muted)] transition-all"
              >
                <FileDown className="h-3.5 w-3.5" />
                <span>ATS Resume</span>
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-4 py-3 text-xs font-medium text-[var(--foreground)] hover:border-[var(--text-muted)] transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--status-live)]" />
                    <span className="text-[var(--status-live)]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-3.5 w-3.5" />
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
            className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[var(--text-muted)]"
          >
            <div className="flex items-center gap-1.5 text-[var(--status-live)]">
              <span className="h-2 w-2 rounded-full bg-[var(--status-live)]" />
              <span>Production High-Availability (Hardened VPS)</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
              <Lock className="h-3.5 w-3.5" />
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
        className="mt-14 sm:mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 text-center transition-colors duration-250 ${
              idx === metrics.length - 1 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--foreground)]">
              <NumberTicker
                value={item.value}
                decimalPlaces={item.value % 1 !== 0 ? 1 : 0}
              />
              <span>{item.suffix}</span>
            </div>
            <div className="mt-1 text-[11px] sm:text-xs font-sans text-[var(--text-secondary)] leading-tight">
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* SIGNATURE DESTIMAX CONTRAST CARD: "OUR PHILOSOPHY" */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className="mt-16 relative overflow-hidden rounded-3xl glass-contrast p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors duration-300"
      >
        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase shadow-sm"
            style={{
              backgroundColor: "var(--card-contrast-badge-bg)",
              color: "var(--card-contrast-badge-fg)",
            }}
          >
            OUR PHILOSOPHY
          </div>

          {/* Heading */}
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Build smarter systems that free your people to focus on what truly drives your business forward.
          </h2>

          {/* Paragraph with inline chip highlights */}
          <p className="text-sm sm:text-base leading-relaxed text-[var(--card-contrast-subtext)] font-medium">
            Traditional software agencies build a quick prototype, hand it over, and move on. Tanbir takes{" "}
            <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs shadow-sm mx-1 align-baseline"
              style={{
                backgroundColor: "var(--card-contrast-chip-bg)",
                color: "var(--card-contrast-chip-fg)",
              }}
            >
              a completely different approach
            </span>
            . Before writing a line of code, we{" "}
            <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs shadow-sm mx-1 align-baseline"
              style={{
                backgroundColor: "var(--card-contrast-chip-bg)",
                color: "var(--card-contrast-chip-fg)",
              }}
            >
              model concurrency limits, audit data integrity, and eliminate race conditions
            </span>
            . Then, we implement systems engineered to withstand intense traffic surges. With{" "}
            <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs shadow-sm mx-1 align-baseline"
              style={{
                backgroundColor: "var(--card-contrast-chip-bg)",
                color: "var(--card-contrast-chip-fg)",
              }}
            >
              pessimistic row-level stock locking
            </span>
            , idempotent payment pipelines, and 847+ automated test cases, you gain not just an engineer, but{" "}
            <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-xs shadow-sm mx-1 align-baseline"
              style={{
                backgroundColor: "var(--card-contrast-chip-bg)",
                color: "var(--card-contrast-chip-fg)",
              }}
            >
              a dedicated technology partner
            </span>
            .
          </p>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer"
              style={{
                backgroundColor: "var(--card-contrast-btn-bg)",
                color: "var(--card-contrast-btn-fg)",
              }}
            >
              <span>Get in Touch Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
