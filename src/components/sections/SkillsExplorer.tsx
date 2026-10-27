"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_DATA, SkillItem } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SkillIcon } from "@/components/ui/Icons";
import { Search, X, Filter, Sparkles, Check, ArrowRight } from "lucide-react";

type CategoryFilter =
  | "All"
  | "Languages"
  | "Backend & APIs"
  | "Frontend & Mobile"
  | "Databases & Concurrency"
  | "DevOps & VPS"
  | "Testing & Workflow";

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: "All Tools", value: "All" },
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

export function SkillsExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  const allSkills = PORTFOLIO_DATA.skills;

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

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-medium text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>TECHNICAL MATRIX & PRODUCTION STACK</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Individualized Tools & Concurrency Engines
        </h2>

        <p className="mt-4 max-w-2xl text-base text-slate-400">
          Every single technology below is backed by battle-tested commercial deployments,
          pessimistic row-level stock locks, double-entry financial ledgers, and 847+ automated tests.
        </p>
      </div>

      {/* Controls Container */}
      <div className="mt-12 space-y-6">
        {/* Category Tabs with Animated Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            const count = categoryCounts[cat.value] || 0;

            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative rounded-xl px-4 py-2 text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-white font-semibold shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-400/40 -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-70 text-[10px]">({count})</span>
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
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all ${
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                      : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                  }`}
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
            onClick={() => {
              setActiveCategory("All");
              setSelectedProject("All Projects");
              setSearchQuery("");
            }}
            className="text-blue-400 hover:text-blue-300 transition-colors underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <SpotlightCard className="h-full flex flex-col justify-between border-slate-800/90 bg-[#0c1220]/70 p-5 hover:border-blue-500/40 transition-all group">
                <div>
                  {/* Top Bar: Icon + Category + Version */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-2 shadow-inner group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-colors">
                        <SkillIcon skillId={skill.id} className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-sans text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                          {skill.name}
                        </h3>
                        <div className="text-[10px] font-mono text-slate-400">
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
                          className={`rounded px-1.5 py-0.5 font-mono text-[9px] transition-colors cursor-pointer ${
                            selectedProject === p
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                              : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                          }`}
                          title={`Filter by ${p}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <p className="font-mono text-sm text-slate-400">
            No tools found matching &quot;{searchQuery}&quot; in category &quot;{activeCategory}&quot;.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSelectedProject("All Projects");
              setSearchQuery("");
            }}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
}
