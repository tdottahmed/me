"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectModal } from "./ProjectModal";
import {
  ExternalLink,
  FolderGit2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Database,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const flagshipProjects = PORTFOLIO_DATA.projects.filter((p) => p.featured);
  const commercialProjects = PORTFOLIO_DATA.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-medium text-blue-400">
          <FolderGit2 className="h-3.5 w-3.5" />
          <span>PRODUCTION SYSTEMS & CASE STUDIES</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Featured Engineering Platforms
        </h2>

        <p className="mt-4 max-w-2xl text-base text-slate-400">
          End-to-end commercial solutions shipped to real users in Bangladesh and Canada,
          validated by 847+ automated test suites, idempotent pipelines, and high-uptime VPS hosting.
        </p>
      </div>

      {/* Flagship Projects: Full-width interactive showcase cards with BorderBeam */}
      <div className="mt-16 space-y-10">
        {flagshipProjects.map((project, index) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-3xl border border-slate-800/90 bg-[#0c1222]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all hover:border-slate-700"
          >
            {/* BorderBeam effect for Flagship platforms */}
            <BorderBeam
              size={320}
              duration={12 + index * 2}
              colorFrom={index === 0 ? "#3b82f6" : index === 1 ? "#10b981" : "#f43f5e"}
              colorTo={index === 0 ? "#10b981" : index === 1 ? "#3b82f6" : "#f59e0b"}
            />

            <div className="relative z-10 flex flex-col justify-between">
              {/* Header: Period, Badge, Live Links */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400 border border-emerald-500/20">
                      {project.metricsBadge}
                    </span>
                    <span>•</span>
                    <span>{project.period}</span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-extrabold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-sm font-medium text-slate-400 mt-1">
                    {project.subtitle}
                  </div>
                </div>

                {/* Action Links & Modal Trigger */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-all"
                    >
                      <span>Visit Live Platform</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {project.secondaryUrl && (
                    <a
                      href={project.secondaryUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all"
                    >
                      <span>{project.secondaryUrl.label}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs font-medium text-blue-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
                  >
                    <span>Inspect Architecture</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-slate-800/80 bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights 2-column Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 transition-colors hover:border-slate-700/80 hover:bg-slate-900/70"
                  >
                    <div className="flex items-center gap-2 font-sans text-xs font-bold text-slate-100">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{h.label}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed font-normal">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Commercial Platforms (3-Column Grid) */}
      <div className="mt-16">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
          <div>
            <h3 className="font-sans text-xl font-bold text-white">
              Additional Commercial Platforms & CodeCanyon Suite
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Cross-border e-commerce, Canadian B2B wholesale, and commercially approved Envato solutions.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {commercialProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="flex flex-col justify-between border-slate-800/90 bg-[#0c1222]/80 p-6 hover:border-blue-500/40 transition-all group"
            >
              <div>
                {/* Badge & Period */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-400 font-semibold border border-blue-500/20">
                    {project.metricsBadge}
                  </span>
                  <span>{project.period}</span>
                </div>

                <h4 className="mt-4 font-sans text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h4>
                <div className="text-xs font-medium text-slate-400 mt-0.5">
                  {project.subtitle}
                </div>

                {/* Tech Badges */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mt-4 space-y-2.5">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="text-xs text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-200">{h.label}:</span>{" "}
                      {h.description}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-blue-400 hover:text-blue-300"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-400 hover:text-white"
                    >
                      <GithubIcon className="h-3 w-3" />
                      <span>Repo</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Architecture ↗
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
