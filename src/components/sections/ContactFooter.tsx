"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useToast } from "@/components/ui/Toast";
import { useLenis } from "lenis/react";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  MapPin,
  FileDown,
  Send,
  CheckCircle2,
  Clock,
  ArrowUp,
  Sparkles,
  MessageSquare,
  Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { EngineeringCommitmentsCarousel } from "@/components/ui/EngineeringCommitmentsCarousel";

export function ContactFooter() {
  const { personal } = PORTFOLIO_DATA;
  const { showToast } = useToast();
  const lenis = useLenis();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full-Stack Opportunity",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#3b82f6", "#10b981", "#60a5fa"],
    });
    showToast(`Email copied to clipboard: ${personal.email}`, "success");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    showToast(`Phone number copied: ${personal.phoneFormatted}`, "success");
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
      showToast("Message received! Tanbir will respond shortly.", "success");
    }, 1200);
  };

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.6 });
  };

  const scrollToContactForm = () => {
    const el = document.getElementById("contact-form");
    if (el) {
      lenis?.scrollTo(el, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <footer id="contact" className="relative border-t border-[var(--border-subtle)] bg-[var(--background)] pt-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3.5 py-1 text-xs font-mono font-medium text-[var(--foreground)]">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span>DIRECT ENGAGEMENT & HIRING</span>
          </div>

          <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Let&apos;s Build High-Reliability Systems Together
          </h2>

          <p className="mt-4 max-w-2xl text-base text-[var(--muted-foreground)] font-medium">
            Available for full-stack engineering roles, production platform contracts, and
            system architecture consulting. Reach out directly or send a message below.
          </p>
        </div>

        {/* Core Production Commitments & SLA Animated Carousel */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
          <EngineeringCommitmentsCarousel />
        </div>

        {/* 2-Column Split: Direct Info & Contact Form */}
        <div id="contact-form" className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Action Pods (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card with 1-Click Copy */}
            <div
              onClick={handleCopyEmail}
              className="cursor-pointer rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5 hover:border-[var(--muted-foreground)] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--foreground)] group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
                      Primary Email
                    </div>
                    <div className="font-mono text-sm font-semibold text-[var(--foreground)] group-hover:text-blue-500 transition-colors">
                      {personal.email}
                    </div>
                  </div>
                </div>

                <div className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3 py-1 text-[11px] font-mono text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  {copiedEmail ? (
                    <span className="text-emerald-500 flex items-center gap-1 font-semibold">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    "Click to copy"
                  )}
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-emerald-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
                      Phone & WhatsApp
                    </div>
                    <div className="font-mono text-sm font-semibold text-[var(--foreground)]">
                      {personal.phoneFormatted}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/8801876525073`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-mono text-emerald-500 hover:bg-emerald-500/20 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3 py-1 text-[11px] font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {copiedPhone ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-amber-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
                    Location & Timezone
                  </div>
                  <div className="font-sans text-sm font-semibold text-[var(--foreground)]">
                    {personal.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted-foreground)] mt-1">
                    <Clock className="h-3 w-3 text-amber-500" />
                    <span>Local Time: {currentTime || "Dhaka (UTC+6)"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profiles & Resume Triggers */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-3 text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-all text-center group"
              >
                <GithubIcon className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs font-semibold">GitHub</span>
                <span className="text-[10px] text-[var(--muted-foreground)] font-mono truncate max-w-full">
                  @tdottahmed
                </span>
              </a>

              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-3 text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-all text-center group"
              >
                <LinkedinIcon className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs font-semibold">LinkedIn</span>
                <span className="text-[10px] text-[var(--muted-foreground)] font-mono truncate max-w-full">
                  Profile
                </span>
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-3 text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-all text-center group"
              >
                <FileDown className="h-5 w-5 mb-1 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs font-semibold">Resume</span>
                <span className="text-[10px] text-[var(--muted-foreground)] font-mono truncate max-w-full">
                  ATS Docs
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Client Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-6 sm:p-8 md:p-10 shadow-2xl">
              <div className="flex items-center gap-2 pb-5 border-b border-[var(--border-subtle)]">
                <MessageSquare className="h-4 w-4 text-[var(--foreground)]" />
                <h3 className="font-sans text-base font-bold text-[var(--foreground)]">
                  Send a Direct Inquiry
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="font-sans text-xl font-bold text-[var(--foreground)]">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="max-w-md mx-auto text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed font-mono">
                    Thank you, {formData.name}. Your inquiry has been delivered directly.
                    Tanbir typically responds within 4 to 8 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        service: "Full-Stack Opportunity",
                        message: "",
                      });
                    }}
                    className="mt-4 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-5 py-2 font-mono text-xs text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted-foreground)] mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--muted-foreground)] mb-1.5 font-medium">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@company.com"
                        className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted-foreground)] mb-1.5 font-medium">
                      Opportunity / Inquire Subject
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                    >
                      <option value="Full-Stack Opportunity">
                        Full-Stack Engineering Role (Full-Time)
                      </option>
                      <option value="Contract Architecture">
                        Platform Architecture Contract
                      </option>
                      <option value="Multi-Vendor Marketplace">
                        E-Commerce / Multi-Vendor Marketplace Consulting
                      </option>
                      <option value="WebSockets Concurrency">
                        Real-Time Concurrency / WebSockets Infrastructure
                      </option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted-foreground)] mb-1.5 font-medium">
                      Message Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share project requirements, team scope, or timeline..."
                      className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] py-3.5 text-sm font-semibold shadow-xl hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Dispatch Message to Tanbir</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Signature Destimax High-Contrast Bottom Banner */}
        <div className="relative mx-auto mt-20 sm:mt-28 rounded-3xl sm:rounded-[36px] p-8 sm:p-14 md:p-16 text-center glass-contrast shadow-2xl overflow-hidden border border-[var(--border-subtle)]">
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--card-contrast-fg)] leading-[1.1]">
            Ready to build
            <br />
            something that lasts?
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base max-w-xl mx-auto opacity-80 text-[var(--card-contrast-fg)] leading-relaxed">
            Book a one-to-one consultation and tell us what you are building.
            Our team replies within twenty-four hours.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={scrollToContactForm}
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-all shadow-md bg-[var(--card-contrast-fg)] text-[var(--card-contrast-bg)] hover:opacity-90 cursor-pointer"
            >
              Book a consultation
            </button>
          </div>
        </div>
      </div>

      {/* Signature Destimax Pitch-Black Global Footer */}
      <div className="mt-20 border-t border-neutral-900 bg-[#050505] text-neutral-400 pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
            {/* Left Brand Col (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  tanbir.dev
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
                Full-Stack Software Engineer building resilient, high-concurrency architectures,
                distributed web platforms, and automated cloud workflows.
              </p>
              {/* Circular Social Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-sky-400 hover:border-neutral-700 transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/8801876525073`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-emerald-400 hover:border-neutral-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-amber-400 hover:border-neutral-700 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Navigation / Company (2-3 cols) */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                NAVIGATION
              </div>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <a href="#overview" className="hover:text-white transition-colors">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-white transition-colors">
                    Skills Matrix
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-white transition-colors">
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-white transition-colors">
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:text-white transition-colors">
                    Education
                  </a>
                </li>
              </ul>
            </div>

            {/* Expertise / Services (2-3 cols) */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                EXPERTISE
              </div>
              <ul className="space-y-2 text-xs font-medium">
                <li className="hover:text-white transition-colors">
                  Full-Stack SaaS Systems
                </li>
                <li className="hover:text-white transition-colors">
                  WebSockets & Concurrency
                </li>
                <li className="hover:text-white transition-colors">
                  PostgreSQL & High-Load Indexing
                </li>
                <li className="hover:text-white transition-colors">
                  E-Commerce Architecture
                </li>
                <li className="hover:text-white transition-colors">
                  API & Microservices
                </li>
              </ul>
            </div>

            {/* Contact Details (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                CONTACT
              </div>
              <div className="space-y-2 text-xs font-medium text-neutral-400">
                <p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="hover:text-white font-mono transition-colors"
                  >
                    {personal.email}
                  </a>
                </p>
                <p className="font-mono">{personal.phoneFormatted}</p>
                <p>{personal.location}</p>
                <p className="text-[11px] text-neutral-500 font-mono">
                  Available for Remote & Relocation
                </p>
              </div>
            </div>
          </div>

          {/* Bottom sub-footer line */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div>
              © 2026 Tanbir Ahmed. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                ATS Resume
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
