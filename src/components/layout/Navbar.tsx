"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useCommandMenu } from "./CommandMenuContext";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import {
  FileDown,
  Terminal,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const NAV_ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { toggleMenu } = useCommandMenu();
  const [activeSection, setActiveSection] = useState("overview");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070a12]/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand mark */}
        <div className="flex items-center gap-3">
          <Link
            href="#overview"
            className="flex items-center gap-2 font-sans text-base font-bold text-white hover:text-blue-400 transition-colors"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-mono font-black text-white shadow-md shadow-blue-500/20">
              TA
            </span>
            <span>Tanbir Ahmed</span>
          </Link>
        </div>

        {/* Center: Desktop Nav with Sliding Pill Indicator */}
        <nav className="hidden md:flex items-center rounded-full border border-slate-800/80 bg-slate-900/60 p-1 backdrop-blur-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredSection(item.href)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative px-4 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {hoveredSection === item.href && (
                  <motion.div
                    layoutId="hoverNav"
                    className="absolute inset-0 rounded-full bg-slate-800/80 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-blue-600/30 border border-blue-500/40 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Actions, Cmd+K, Socials, Resume */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cmd + K Command Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
            title="Open Command Palette (Cmd + K)"
          >
            <Terminal className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline font-mono text-[11px]">Cmd + K</span>
            <kbd className="hidden lg:inline-block rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Social Links */}
          <a
            href={PORTFOLIO_DATA.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2 text-slate-400 hover:border-slate-700 hover:text-slate-100 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href={PORTFOLIO_DATA.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2 text-slate-400 hover:border-slate-700 hover:text-sky-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          {/* Resume CTA */}
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative hidden sm:inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-blue-400 transition-all"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070a12]/95 px-4 pt-4 pb-6 backdrop-blur-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
            >
              <FileDown className="h-4 w-4" />
              <span>Download ATS Resume</span>
            </a>
            <div className="flex gap-2">
              <a
                href={PORTFOLIO_DATA.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
