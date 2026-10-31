"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useCommandMenu } from "./CommandMenuContext";
import { useTheme } from "@/components/providers/ThemeProvider";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import {
  FileDown,
  Terminal,
  Menu,
  X,
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
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("overview");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.substring(1));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)] shadow-md shadow-black/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand mark */}
        <div className="flex items-center gap-3">
          <Link
            href="#overview"
            className="flex items-center gap-2.5 font-sans text-base font-bold tracking-tight text-[var(--foreground)] hover:opacity-80 transition-opacity"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--foreground)] text-[var(--background)] text-xs font-mono font-black shadow-sm">
              TA
            </span>
            <span>Tanbir Ahmed</span>
          </Link>
        </div>

        {/* Center: Desktop Nav with Sliding Pill Indicator */}
        <nav className="hidden md:flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--nav-bg)] backdrop-blur-xl p-1 shadow-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredSection(item.href)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative px-4 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "text-[var(--foreground)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                }`}
              >
                {hoveredSection === item.href && (
                  <motion.div
                    layoutId="hoverNav"
                    className="absolute inset-0 rounded-full bg-neutral-500/10 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-neutral-500/15 border border-neutral-500/20 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Actions, Theme Switcher, Cmd+K, Socials, Resume */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Destimax-style Pill Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex h-6 w-11 items-center rounded-full border border-[var(--border-subtle)] bg-[#e5e5e5] dark:bg-[#1e1e24] p-0.5 transition-colors cursor-pointer"
            style={{
              backgroundColor: theme === "dark" ? "#1e1e24" : "#e5e5e5",
            }}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            <motion.div
              className="h-4.5 w-4.5 rounded-full shadow-sm"
              style={{
                backgroundColor: theme === "dark" ? "#ffffff" : "#09090b",
              }}
              animate={{ x: theme === "dark" ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
            />
          </button>

          {/* Cmd + K Command Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--nav-bg)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            title="Open Command Palette (Cmd + K)"
            aria-label="Open Command Palette"
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--foreground)]" />
            <span className="hidden sm:inline font-mono text-[11px]">Cmd + K</span>
            <kbd className="hidden lg:inline-block rounded-full bg-neutral-500/10 px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              ⌘K
            </kbd>
          </button>

          {/* Social Links */}
          <a
            href={PORTFOLIO_DATA.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex rounded-full border border-[var(--border-subtle)] bg-[var(--nav-bg)] p-2 text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="h-3.5 w-3.5" />
          </a>

          <a
            href={PORTFOLIO_DATA.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex rounded-full border border-[var(--border-subtle)] bg-[var(--nav-bg)] p-2 text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="h-3.5 w-3.5" />
          </a>

          {/* Primary Action Button (Matches Screenshot "Book a consultation") */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-4 py-1.5 text-xs font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
          >
            <span>Book Consultation</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--nav-bg)] text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--background)] px-4 pt-3 pb-6 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-mono font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-500/15 text-[var(--foreground)] font-semibold"
                      : "text-[var(--text-secondary)] hover:bg-neutral-500/10 hover:text-[var(--foreground)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-live)]" />}
                </a>
              );
            })}
            <div className="pt-2 flex items-center justify-between gap-2 border-t border-[var(--border-subtle)]">
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-mono text-[var(--foreground)]"
              >
                <FileDown className="h-3.5 w-3.5" />
                <span>Resume</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-4 py-1.5 text-xs font-semibold"
              >
                Book Consultation
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
