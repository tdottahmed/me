"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useLenis } from "lenis/react";
import { PORTFOLIO_DATA, SkillItem } from "@/data/portfolio";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { EASE_OUT_EXPO } from "@/components/ui/Reveal";
import { SkillIcon } from "@/components/ui/Icons";
import { FeaturedStackCarousel } from "@/components/ui/FeaturedStackCarousel";
import {
  Search,
  X,
  Filter,
  Sparkles,
  LayoutGrid,
  Layers,
  ExternalLink,
  Code2,
  Server,
  Layout,
  Database,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | SkillItem["category"];
type ViewMode = "bento" | "grid";

interface DomainMeta {
  category: SkillItem["category"];
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  glow: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentDot: string;
  accentBar: string;
}

const DOMAIN_METAS: Record<SkillItem["category"], DomainMeta> = {
  Languages: {
    category: "Languages",
    title: "Languages & Runtimes",
    badge: "Strict OOP & Runtimes",
    icon: Code2,
    glow: "rgba(251, 191, 36, 0.9)",
    accentText: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    accentDot: "bg-amber-400",
    accentBar: "from-amber-400/80",
  },
  "Backend & APIs": {
    category: "Backend & APIs",
    title: "High-Concurrency Backends",
    badge: "WebSockets & Async Queues",
    icon: Server,
    glow: "rgba(59, 130, 246, 0.95)",
    accentText: "text-blue-300",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    accentDot: "bg-blue-400",
    accentBar: "from-blue-400/80",
  },
  "Frontend & Mobile": {
    category: "Frontend & Mobile",
    title: "Modern Frontend & Mobile",
    badge: "SSR 16, SPAs & Mobile",
    icon: Layout,
    glow: "rgba(34, 211, 238, 0.9)",
    accentText: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30",
    accentDot: "bg-cyan-400",
    accentBar: "from-cyan-400/80",
  },
  "Databases & Concurrency": {
    category: "Databases & Concurrency",
    title: "Databases & Ledgers",
    badge: "Row Locks & Double-Entry",
    icon: Database,
    glow: "rgba(16, 185, 129, 0.9)",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    accentDot: "bg-emerald-400",
    accentBar: "from-emerald-400/80",
  },
  "DevOps & VPS": {
    category: "DevOps & VPS",
    title: "DevOps & Hardened VPS",
    badge: "Ubuntu VPS & CI/CD",
    icon: Terminal,
    glow: "rgba(167, 139, 250, 0.9)",
    accentText: "text-violet-300",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/30",
    accentDot: "bg-violet-400",
    accentBar: "from-violet-400/80",
  },
  "Testing & Workflow": {
    category: "Testing & Workflow",
    title: "Testing & Integrity",
    badge: "847 Tests & Idempotency",
    icon: ShieldCheck,
    glow: "rgba(251, 113, 133, 0.9)",
    accentText: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30",
    accentDot: "bg-rose-400",
    accentBar: "from-rose-400/80",
  },
};

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: "All Domains", value: "All" },
  { label: "Languages", value: "Languages" },
  { label: "Backend & APIs", value: "Backend & APIs" },
  { label: "Frontend & Mobile", value: "Frontend & Mobile" },
  { label: "Databases & Concurrency", value: "Databases & Concurrency" },
  { label: "DevOps & VPS", value: "DevOps & VPS" },
  { label: "Testing & Workflow", value: "Testing & Workflow" },
];

const PROJECT_FILTERS = [
  "All Projects",
  "Sultan Big Bazaar",
  "Fur & Feather BD",
  "TradingChart.org",
  "Zamzam Wholesale",
  "DirectMalaysia.com",
];

const HEADLINE: { word: string; highlight?: boolean }[] = [
  { word: "Architectural" },
  { word: "Matrix" },
  { word: "&" },
  { word: "Production", highlight: true },
  { word: "Engines", highlight: true },
];

export function SkillsExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [viewMode, setViewMode] = useState<ViewMode>("bento");
  const [inspectedSkill, setInspectedSkill] = useState<SkillItem | null>(null);

  const lenis = useLenis();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  const allSkills = PORTFOLIO_DATA.skills;

  // Lock scroll when mobile inspector drawer is active
  useEffect(() => {
    if (!inspectedSkill || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [inspectedSkill, lenis]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectedSkill(null);
    };
    if (inspectedSkill) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inspectedSkill]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allSkills.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat.value] = allSkills.filter((s) => s.category === cat.value).length;
    });
    return counts;
  }, [allSkills]);

  // Filter skills based on search, project, and category
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        activeCategory === "All" || skill.category === activeCategory;

      const matchesProject =
        selectedProject === "All Projects" ||
        skill.relatedProjects.some(
          (p) =>
            p.toLowerCase().includes(selectedProject.toLowerCase()) ||
            selectedProject.toLowerCase().includes(p.toLowerCase())
        );

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        skill.highlight.toLowerCase().includes(query) ||
        (skill.version && skill.version.toLowerCase().includes(query)) ||
        skill.relatedProjects.some((p) => p.toLowerCase().includes(query));

      return matchesCategory && matchesProject && matchesSearch;
    });
  }, [allSkills, activeCategory, selectedProject, searchQuery]);

  // Group filtered skills by domain
  const skillsByDomain = useMemo(() => {
    const groups: { meta: DomainMeta; skills: SkillItem[] }[] = [];
    const domainKeys = Object.keys(DOMAIN_METAS) as SkillItem["category"][];

    domainKeys.forEach((cat) => {
      if (activeCategory !== "All" && activeCategory !== cat) return;
      const domainSkills = filteredSkills.filter((s) => s.category === cat);
      if (domainSkills.length > 0) {
        groups.push({
          meta: DOMAIN_METAS[cat],
          skills: domainSkills,
        });
      }
    });

    return groups;
  }, [filteredSkills, activeCategory]);

  const resetFilters = () => {
    setActiveCategory("All");
    setSelectedProject("All Projects");
    setSearchQuery("");
  };

  const jumpToProject = (projectName: string) => {
    setInspectedSkill(null);
    setSelectedProject(projectName);
    const projEl = document.getElementById("projects");
    if (projEl) {
      projEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="skills" className="relative py-20 sm:py-24">
      {/* Background ambient lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3.5 py-1 text-[11px] font-mono font-medium text-[var(--text-secondary)] shadow-sm uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>PRODUCTION STACK & ARCHITECTURAL MATRIX</span>
          </motion.div>

          {/* Mask Reveal Headline */}
          <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            {HEADLINE.map(({ word }, i) => (
              <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className="inline-block text-[var(--foreground)]"
                  initial={{ y: "110%" }}
                  animate={headerInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.06 }}
                >
                  {word}
                </motion.span>
                {i < HEADLINE.length - 1 && " "}
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.35 }}
            className="mt-4 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]"
          >
            Every single technology below is backed by battle-tested commercial deployments,
            pessimistic row-level stock locks, double-entry financial ledgers, and 847+ automated tests.
          </motion.p>

          {/* Live Telemetry Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <NumberTicker value={allSkills.length} className="text-base sm:text-lg font-bold text-[var(--foreground)]" />
              <span>technologies</span>
            </span>
            <span className="h-3.5 w-px bg-[var(--border-subtle)]" />
            <span className="flex items-center gap-1.5">
              <NumberTicker value={CATEGORIES.length - 1} className="text-base sm:text-lg font-bold text-[var(--foreground)]" />
              <span>architectural domains</span>
            </span>
            <span className="h-3.5 w-px bg-[var(--border-subtle)]" />
            <span className="flex items-center gap-1.5 text-[var(--status-live)]">
              <span className="text-base sm:text-lg font-bold">100%</span>
              <span>commercial production</span>
            </span>
          </motion.div>
        </div>

        {/* Executive Core Stacks Animated Carousel */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
          <FeaturedStackCarousel onSelectProject={jumpToProject} />
        </div>

        {/* Controls Container */}
        <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
          {/* Top Bar: View Mode Switcher + Domain Horizontal Scroll */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Domain Tabs with Horizontal Drag/Scroll on Mobile */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
              <div className="flex items-center gap-1.5 min-w-max">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.value;
                  const count = categoryCounts[cat.value] || 0;

                  return (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono transition-colors duration-200 cursor-pointer shrink-0",
                        isActive
                          ? "text-[var(--background)] font-semibold"
                          : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-neutral-500/10"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 rounded-full bg-[var(--foreground)] shadow-sm -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span>{cat.label}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Mode Toggle: Bento Matrix vs Telemetry Grid */}
            <div className="flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] p-1 shrink-0">
              <button
                onClick={() => setViewMode("bento")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono transition-colors cursor-pointer",
                  viewMode === "bento"
                    ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
                title="Bento Architecture View"
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Domain Bento</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono transition-colors cursor-pointer",
                  viewMode === "grid"
                    ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
                title="Compact Telemetry View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Telemetry Grid</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Project Cross-Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-3 sm:p-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, versions, or keywords..."
                className="w-full rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] pl-10 pr-9 py-2 text-base sm:text-xs text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:border-[var(--foreground)] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Project Cross-Filter Chips with Horizontal Scroll */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
              <div className="flex items-center gap-1.5 min-w-max">
                <span className="text-[11px] font-mono text-[var(--text-muted)] mr-1 flex items-center gap-1 shrink-0">
                  <Filter className="h-3 w-3" />
                  <span>Platform:</span>
                </span>
                {PROJECT_FILTERS.map((project) => {
                  const isSelected = selectedProject === project;
                  return (
                    <button
                      key={project}
                      onClick={() => setSelectedProject(project)}
                      className={cn(
                        "rounded-full px-3 py-1 text-[11px] font-mono transition-colors shrink-0 cursor-pointer border",
                        isSelected
                          ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-semibold shadow-sm"
                          : "bg-[var(--glass-pill-bg)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--foreground)] hover:border-[var(--text-muted)]"
                      )}
                    >
                      {project}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Status Bar */}
        <div className="mt-3 flex items-center justify-between px-2 text-xs font-mono text-[var(--text-muted)]">
          <div>
            Showing <span className="font-bold text-[var(--foreground)]">{filteredSkills.length}</span> of{" "}
            <span className="font-bold text-[var(--foreground)]">{allSkills.length}</span> technologies
          </div>
          {(selectedProject !== "All Projects" || searchQuery || activeCategory !== "All") && (
            <button
              onClick={resetFilters}
              className="text-[var(--foreground)] hover:underline transition-colors cursor-pointer text-[11px] font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* VIEW 1: Architectural Domain Bento Matrix (Default & Primary View) */}
        {viewMode === "bento" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillsByDomain.map(({ meta, skills }) => {
              const IconComp = meta.icon;
              return (
                <div
                  key={meta.category}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5 sm:p-6 transition-all duration-300 hover:border-[var(--card-border-hover)] hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Domain Header (Matches Screenshot Services Card Header) */}
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3.5 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)] shadow-sm">
                          <IconComp className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h3 className="font-sans text-sm sm:text-base font-bold text-[var(--foreground)]">
                            {meta.title}
                          </h3>
                          <div className="text-[10px] font-mono text-[var(--text-muted)]">
                            {meta.badge}
                          </div>
                        </div>
                      </div>

                      <span className="rounded-full bg-[var(--glass-pill-bg)] border border-[var(--border-subtle)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]">
                        {skills.length} tools
                      </span>
                    </div>

                    {/* Tech Pods Grid inside the Bento Card */}
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
                      {skills.map((skill) => {
                        const isInspected = inspectedSkill?.id === skill.id;
                        return (
                          <button
                            key={skill.id}
                            onClick={() => setInspectedSkill(skill)}
                            className={cn(
                              "group/pod relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-200 cursor-pointer",
                              isInspected
                                ? "border-[var(--foreground)] bg-[var(--foreground)]/10 shadow-sm"
                                : "border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] hover:border-[var(--text-muted)] hover:bg-neutral-500/10"
                            )}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] p-1.5 transition-transform duration-200 group-hover/pod:scale-105">
                              <SkillIcon skillId={skill.id} className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-sans text-xs font-semibold text-[var(--foreground)] truncate">
                                  {skill.name}
                                </span>
                                {skill.version && (
                                  <span className="text-[9px] font-mono text-[var(--text-muted)] shrink-0">
                                    {skill.version.split(" ")[0]}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-[var(--text-secondary)] truncate mt-0.5">
                                {skill.relatedProjects.length > 0
                                  ? skill.relatedProjects[0]
                                  : "Core Stack"}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Domain Footer Note */}
                  <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                    <span>Tap any tool to inspect</span>
                    <span className="text-[var(--text-secondary)] flex items-center gap-0.5 group-hover:text-[var(--foreground)] transition-colors">
                      <span>Details</span>
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: Compact Telemetry Grid (Alternative Fast-Skimming View) */}
        {viewMode === "grid" && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredSkills.map((skill) => {
              return (
                <button
                  key={skill.id}
                  onClick={() => setInspectedSkill(skill)}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-3.5 text-left transition-all duration-200 hover:border-[var(--card-border-hover)] hover:bg-neutral-500/5 cursor-pointer group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)] p-2 group-hover:scale-105 transition-transform">
                    <SkillIcon skillId={skill.id} className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-sans text-xs font-bold text-[var(--foreground)] truncate">
                        {skill.name}
                      </span>
                      {skill.version && (
                        <span className="rounded-full bg-[var(--glass-pill-bg)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--text-muted)] border border-[var(--border-subtle)] shrink-0">
                          {skill.version}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
                      {skill.category}
                    </div>
                    <p className="mt-1 text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {skill.highlight}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="mt-10 rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-10 text-center">
            <p className="font-mono text-sm text-[var(--muted-foreground)]">
              No technologies found matching &quot;{searchQuery}&quot; with current filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-full bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] px-5 py-2 font-mono text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Mobile & Desktop Inspector Drawer / Bottom Sheet */}
      <AnimatePresence>
        {inspectedSkill && (
          <div
            className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setInspectedSkill(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full sm:max-w-xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5 sm:p-6 pb-8 sm:pb-6 shadow-2xl text-[var(--foreground)]"
            >
              {/* Mobile Drag Indicator Handle */}
              <div className="mx-auto -mt-2 mb-4 h-1 w-12 rounded-full bg-neutral-500/30 sm:hidden" />

              {/* Close Button */}
              <button
                onClick={() => setInspectedSkill(null)}
                className="absolute right-4 top-4 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                aria-label="Close inspector"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header: Skill Icon + Name + Category + Version */}
              <div className="flex items-start gap-4 pr-10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--foreground)] text-[var(--background)] p-2.5 shadow-sm">
                  <SkillIcon skillId={inspectedSkill.id} className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-sans text-xl font-extrabold text-[var(--foreground)]">
                      {inspectedSkill.name}
                    </h3>
                    {inspectedSkill.version && (
                      <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                        {inspectedSkill.version}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                    {inspectedSkill.category} • {DOMAIN_METAS[inspectedSkill.category].badge}
                  </div>
                </div>
              </div>

              {/* Production Context Narrative */}
              <div className="mt-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4">
                <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  <Info className="h-3.5 w-3.5 text-[var(--foreground)]" />
                  <span>Production Role & Implementation</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  {inspectedSkill.highlight}
                </p>
              </div>

              {/* Verified Production Badge */}
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[var(--status-live)] bg-[var(--status-live)]/10 border border-[var(--status-live)]/20 rounded-2xl px-3.5 py-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Verified across commercial platforms with automated testing & hardened VPS deployment</span>
              </div>

              {/* Linked Production Platforms */}
              {inspectedSkill.relatedProjects.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                    Production Systems Using {inspectedSkill.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {inspectedSkill.relatedProjects.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => jumpToProject(p)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3 py-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-all cursor-pointer"
                      >
                        <span>{p}</span>
                        <ExternalLink className="h-3 w-3 text-[var(--foreground)]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setInspectedSkill(null)}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-4 py-2 font-mono text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const skill = inspectedSkill;
                    setInspectedSkill(null);
                    if (skill.relatedProjects.length > 0) {
                      jumpToProject(skill.relatedProjects[0]);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-5 py-2 font-mono text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-sm"
                >
                  <span>View Project Case Studies</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
