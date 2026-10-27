"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "motion/react";
import { PORTFOLIO_DATA, SkillItem } from "@/data/portfolio";
import { TiltGlowCard } from "@/components/ui/TiltGlowCard";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { EASE_OUT_EXPO } from "@/components/ui/Reveal";
import { SkillIcon } from "@/components/ui/Icons";
import { Search, X, Filter, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | SkillItem["category"];

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: "All Tools", value: "All" },
  { label: "Languages", value: "Languages" },
  { label: "Backend & APIs", value: "Backend & APIs" },
  { label: "Frontend & Mobile", value: "Frontend & Mobile" },
  { label: "Databases & Concurrency", value: "Databases & Concurrency" },
  { label: "DevOps & VPS", value: "DevOps & VPS" },
  { label: "Testing & Workflow", value: "Testing & Workflow" },
];

// Per-category accent: glow color for the card border plus literal Tailwind classes
const CATEGORY_ACCENTS: Record<
  SkillItem["category"],
  { glow: string; text: string; dot: string; bar: string }
> = {
  Languages: { glow: "rgba(251, 191, 36, 0.9)", text: "text-amber-300", dot: "bg-amber-400", bar: "from-amber-400/80" },
  "Backend & APIs": { glow: "rgba(59, 130, 246, 0.95)", text: "text-blue-300", dot: "bg-blue-400", bar: "from-blue-400/80" },
  "Frontend & Mobile": { glow: "rgba(34, 211, 238, 0.9)", text: "text-cyan-300", dot: "bg-cyan-400", bar: "from-cyan-400/80" },
  "Databases & Concurrency": { glow: "rgba(16, 185, 129, 0.9)", text: "text-emerald-300", dot: "bg-emerald-400", bar: "from-emerald-400/80" },
  "DevOps & VPS": { glow: "rgba(167, 139, 250, 0.9)", text: "text-violet-300", dot: "bg-violet-400", bar: "from-violet-400/80" },
  "Testing & Workflow": { glow: "rgba(251, 113, 133, 0.9)", text: "text-rose-300", dot: "bg-rose-400", bar: "from-rose-400/80" },
};

const PROJECT_FILTERS = [
  "All Projects",
  "Sultan Big Bazaar",
  "Fur & Feather BD",
  "TradingChart.org",
  "Zamzam Wholesale",
  "DirectMalaysia.com",
];

const HEADLINE: { word: string; highlight?: boolean }[] = [
  { word: "Individualized" },
  { word: "Tools" },
  { word: "&" },
  { word: "Concurrency", highlight: true },
  { word: "Engines", highlight: true },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay: Math.min(i * 0.045, 0.5) },
  }),
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.2 } },
};

function MarqueeRow({
  skills,
  reverse,
  onPick,
}: {
  skills: SkillItem[];
  reverse?: boolean;
  onPick: (skill: SkillItem) => void;
}) {
  // Rendered twice back-to-back so translating by -50% loops seamlessly
  const loop = [...skills, ...skills];
  return (
    <div className="marquee-track mask-fade-x overflow-hidden py-1.5">
      <div
        className={cn("flex w-max gap-3", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ "--marquee-duration": `${skills.length * 3}s` } as React.CSSProperties}
      >
        {loop.map((skill, i) => {
          const accent = CATEGORY_ACCENTS[skill.category];
          return (
            <button
              key={`${skill.id}-${i}`}
              onClick={() => onPick(skill)}
              aria-hidden={i >= skills.length}
              tabIndex={i >= skills.length ? -1 : 0}
              className="group flex shrink-0 items-center gap-2 rounded-full border border-slate-800/90 bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800/80 hover:text-white cursor-pointer"
              title={`Show ${skill.name}`}
            >
              <SkillIcon skillId={skill.id} className="h-4 w-4 transition-transform duration-300 group-hover:scale-125" />
              <span>{skill.name}</span>
              <span className={cn("h-1.5 w-1.5 rounded-full opacity-70", accent.dot)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SkillsExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  // Only run the shimmer while the headline is actually on screen
  const headerOnScreen = useInView(headerRef);
  const gridInView = useInView(gridRef, { once: true, amount: 0.05 });

  const allSkills = PORTFOLIO_DATA.skills;

  const [marqueeTop, marqueeBottom] = useMemo(() => {
    const mid = Math.ceil(allSkills.length / 2);
    return [allSkills.slice(0, mid), allSkills.slice(mid)];
  }, [allSkills]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allSkills.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat.value] = allSkills.filter((s) => s.category === cat.value).length;
    });
    return counts;
  }, [allSkills]);

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      // Category match
      const matchesCategory =
        activeCategory === "All" || skill.category === activeCategory;

      // Project match
      const matchesProject =
        selectedProject === "All Projects" ||
        skill.relatedProjects.some(
          (p) =>
            p.toLowerCase().includes(selectedProject.toLowerCase()) ||
            selectedProject.toLowerCase().includes(p.toLowerCase())
        );

      // Search match
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

  const resetFilters = () => {
    setActiveCategory("All");
    setSelectedProject("All Projects");
    setSearchQuery("");
  };

  const pickFromMarquee = (skill: SkillItem) => {
    setActiveCategory("All");
    setSelectedProject("All Projects");
    setSearchQuery(skill.name);
  };

  return (
    <section id="skills" className="relative py-24">
      {/* Ambient accent glows behind the section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.14),transparent)]" />
        <div className="absolute right-[-10%] top-1/2 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.08),transparent)]" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-medium text-blue-400"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>TECHNICAL MATRIX & PRODUCTION STACK</span>
        </motion.div>

        {/* Word-by-word mask reveal */}
        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {HEADLINE.map(({ word, highlight }, i) => (
            <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={cn(
                  "inline-block",
                  highlight &&
                    "bg-gradient-to-r from-blue-400 via-sky-200 to-emerald-400 bg-clip-text text-transparent",
                  highlight && headerOnScreen && "animate-text-shimmer"
                )}
                initial={{ y: "110%" }}
                animate={headerInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.07 }}
              >
                {word}
              </motion.span>
              {i < HEADLINE.length - 1 && " "}
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.45 }}
          className="mt-4 max-w-2xl text-base text-slate-400"
        >
          Every single technology below is backed by battle-tested commercial deployments,
          pessimistic row-level stock locks, double-entry financial ledgers, and 847+ automated tests.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex items-center gap-5 font-mono text-xs text-slate-500"
        >
          <span>
            <NumberTicker value={allSkills.length} className="text-lg font-bold text-white" /> tools
          </span>
          <span className="h-4 w-px bg-slate-800" />
          <span>
            <NumberTicker value={CATEGORIES.length - 1} className="text-lg font-bold text-white" /> domains
          </span>
          <span className="h-4 w-px bg-slate-800" />
          <span>
            <span className="text-lg font-bold text-emerald-400">100%</span> shipped to prod
          </span>
        </motion.div>
      </div>

      {/* Full-bleed dual marquee */}
      <div className="relative mt-12 space-y-2">
        <MarqueeRow skills={marqueeTop} onPick={pickFromMarquee} />
        <MarqueeRow skills={marqueeBottom} reverse onPick={pickFromMarquee} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Controls Container */}
        <div className="mt-12 space-y-6">
          {/* Category Tabs with Animated Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              const count = categoryCounts[cat.value] || 0;
              const dot = cat.value === "All" ? "bg-slate-300" : CATEGORY_ACCENTS[cat.value].dot;

              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-mono transition-colors duration-200 cursor-pointer",
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-400/40 shadow-lg shadow-blue-500/25 -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className={cn("h-1.5 w-1.5 rounded-full", dot, !isActive && "opacity-60")} />
                  <span>{cat.label}</span>
                  <span className="opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Project Cross-Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, versions, or keywords..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 pl-10 pr-9 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Project Cross-Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" />
                <span>Project:</span>
              </span>
              {PROJECT_FILTERS.map((project) => {
                const isSelected = selectedProject === project;
                return (
                  <button
                    key={project}
                    onClick={() => setSelectedProject(project)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors",
                      isSelected
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                        : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                    )}
                  >
                    {project}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Telemetry Count */}
        <div className="mt-4 flex items-center justify-between px-2 text-xs font-mono text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-300">{filteredSkills.length}</span> of{" "}
            <span className="font-bold text-slate-300">{allSkills.length}</span> technical capabilities
          </div>
          {(selectedProject !== "All Projects" || searchQuery || activeCategory !== "All") && (
            <button
              onClick={resetFilters}
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => {
              const accent = CATEGORY_ACCENTS[skill.category];
              return (
                <motion.div
                  layout
                  key={skill.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={gridInView ? "visible" : "hidden"}
                  exit="exit"
                  transition={{ layout: { type: "spring", stiffness: 350, damping: 34 } }}
                >
                  <TiltGlowCard glowColor={accent.glow} className="h-full">
                    {/* Category accent line */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 top-0 h-px bg-gradient-to-r via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100",
                        accent.bar
                      )}
                    />
                    <div className="flex h-full flex-col justify-between p-5">
                      <div>
                        {/* Top Bar: Icon + Category + Version */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-2 shadow-inner transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-slate-600 group-hover:shadow-[0_0_24px_-6px_var(--glow)]">
                              <SkillIcon skillId={skill.id} className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-sans text-sm font-bold text-white">
                                {skill.name}
                              </h3>
                              <div className={cn("text-[10px] font-mono", accent.text)}>
                                {skill.category}
                              </div>
                            </div>
                          </div>

                          {skill.version && (
                            <span className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-400 shrink-0">
                              {skill.version}
                            </span>
                          )}
                        </div>

                        {/* Production Highlight */}
                        <p className="mt-3.5 text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                          {skill.highlight}
                        </p>
                      </div>

                      {/* Footer: Related Projects */}
                      {skill.relatedProjects.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-800/60">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                            Production Platforms
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {skill.relatedProjects.map((p, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedProject(p)}
                                className={cn(
                                  "rounded px-1.5 py-0.5 font-mono text-[9px] transition-colors cursor-pointer",
                                  selectedProject === p
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                                    : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                )}
                                title={`Filter by ${p}`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TiltGlowCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <p className="font-mono text-sm text-slate-400">
              No tools found matching &quot;{searchQuery}&quot; in category &quot;{activeCategory}&quot;.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
