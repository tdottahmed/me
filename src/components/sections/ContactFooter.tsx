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
  ShieldCheck,
  Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

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

  return (
    <footer id="contact" className="relative border-t border-slate-800/80 bg-[#070a12] pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>DIRECT ENGAGEMENT & HIRING</span>
          </div>

          <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s Build High-Reliability Systems Together
          </h2>

          <p className="mt-4 max-w-2xl text-base text-slate-400">
            Available for full-stack engineering roles, production platform contracts, and
            system architecture consulting. Reach out directly or send a message below.
          </p>
        </div>

        {/* 2-Column Split: Direct Info & Contact Form */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Action Pods (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card with 1-Click Copy */}
            <div
              onClick={handleCopyEmail}
              className="cursor-pointer rounded-2xl border border-slate-800/90 bg-[#0c1222]/80 p-5 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      Primary Email
                    </div>
                    <div className="font-mono text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {personal.email}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-[11px] font-mono text-slate-400 group-hover:text-white">
                  {copiedEmail ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    "Click to copy"
                  )}
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="rounded-2xl border border-slate-800/90 bg-[#0c1222]/80 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      Phone & WhatsApp
                    </div>
                    <div className="font-mono text-sm font-semibold text-white">
                      {personal.phoneFormatted}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/8801876525073`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-600/30 border border-emerald-500/40 px-2.5 py-1 text-[11px] font-mono text-emerald-300 hover:bg-emerald-600/50 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white"
                  >
                    {copiedPhone ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div className="rounded-2xl border border-slate-800/90 bg-[#0c1222]/80 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Location & Timezone
                  </div>
                  <div className="font-sans text-sm font-semibold text-white">
                    {personal.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mt-1">
                    <Clock className="h-3 w-3 text-amber-400" />
                    <span>Local Time: {currentTime || "Dhaka (UTC+6)"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profiles & Resume Triggers */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-slate-300 hover:border-slate-700 hover:text-white transition-all text-center"
              >
                <GithubIcon className="h-5 w-5 mb-1.5" />
                <span className="font-mono text-xs font-semibold">GitHub</span>
                <span className="text-[10px] text-slate-500 font-mono">@tdottahmed</span>
              </a>

              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-slate-300 hover:border-slate-700 hover:text-sky-400 transition-all text-center"
              >
                <LinkedinIcon className="h-5 w-5 mb-1.5" />
                <span className="font-mono text-xs font-semibold">LinkedIn</span>
                <span className="text-[10px] text-slate-500 font-mono">/in/tanbir-ahmed07</span>
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all text-center"
              >
                <FileDown className="h-5 w-5 mb-1.5 text-amber-400" />
                <span className="font-mono text-xs font-semibold">Resume</span>
                <span className="text-[10px] text-slate-400 font-mono">Google Docs</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Client Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-800/90 bg-[#0c1222]/90 p-6 sm:p-8 md:p-10 shadow-2xl">
              <div className="flex items-center gap-2 pb-5 border-b border-slate-800/80">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <h3 className="font-sans text-base font-bold text-white">
                  Send a Direct Inquiry
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="font-sans text-xl font-bold text-white">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
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
                    className="mt-4 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-slate-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
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
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
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
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Opportunity / Inquire Subject
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
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
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
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
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-semibold text-white shadow-xl shadow-blue-500/20 hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Dispatch Message to Tanbir</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Polished Terminal Footer */}
        <div className="mt-20 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-300 font-semibold">tanbir.nixsoftware.net</span>
            <span>•</span>
            <span>Dhaka, Bangladesh</span>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            Engineered with Next.js 16 • React 19 • Motion • Tailwind CSS v4
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
