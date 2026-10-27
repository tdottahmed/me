"use client";

import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { TracingBeam } from "@/components/ui/TracingBeam";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Users,
  Shield,
  Layers,
} from "lucide-react";

export function ExperienceTimeline() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-medium text-amber-400">
          <Briefcase className="h-3.5 w-3.5" />
          <span>PRODUCTION WORK HISTORY & LEADERSHIP</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Work Experience & Engineering Timeline
        </h2>

        <p className="mt-4 max-w-2xl text-base text-slate-400">
          Over 3.5 years architecting enterprise Laravel and Django platforms, mentoring engineers,
          securing military defense inventories, and shipping commercial software.
        </p>
      </div>

      {/* Tracing Beam Career Timeline */}
      <div className="mt-16 pl-6 sm:pl-10">
        <TracingBeam>
          <div className="space-y-16">
            {experience.map((item, index) => (
              <div
                key={item.id}
                className="relative rounded-3xl border border-slate-800/90 bg-[#0c1222]/90 p-6 sm:p-8 md:p-10 shadow-2xl"
              >
                {/* Header: Role, Company, Period, Location */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-blue-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-blue-400 border border-blue-500/20">
                        {item.role}
                      </span>
                    </div>

                    <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-extrabold text-white">
                      {item.company}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="mt-8 space-y-4">
                  {item.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4 transition-colors hover:border-slate-700/80 hover:bg-slate-900/60"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-sm font-semibold text-slate-100">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>{h.label}</span>
                        </div>
                        {h.link && (
                          <a
                            href={h.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <span>{h.link.text}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal pl-6">
                        {h.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
