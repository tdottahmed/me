"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { ProjectItem } from "@/data/portfolio";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const lenis = useLenis();

  // Freeze the page behind the modal (Lenis ignores body overflow)
  useEffect(() => {
    if (!project || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [project, lenis]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border border-slate-800 bg-[#0c1222] p-6 sm:p-8 shadow-2xl text-slate-200 scrollbar-thin"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Eyebrow & Period */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <span className="rounded bg-blue-500/10 px-2.5 py-1 text-blue-400 border border-blue-500/20 font-semibold">
              {project.metricsBadge}
            </span>
            <span>•</span>
            <span>{project.period}</span>
          </div>

          {/* Title & Subtitle */}
          <h2 className="mt-4 font-sans text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-slate-400 font-medium">
            {project.subtitle}
          </p>

          {/* Live Action Links */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110 transition-all"
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
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-600 hover:text-white transition-all"
              >
                <span>{project.secondaryUrl.label}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-600 hover:text-white transition-all"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
              Technology Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architectural Highlights */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-400" />
              <span>Production Architecture Deep-Dive</span>
            </div>

            <div className="space-y-4">
              {project.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 transition-colors"
                >
                  <div className="flex items-center gap-2 font-sans text-sm font-semibold text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{h.label}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal pl-6">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
