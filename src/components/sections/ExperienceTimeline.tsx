"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { MilestonesCarousel } from "@/components/ui/MilestonesCarousel";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export function ExperienceTimeline() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3.5 py-1 text-[11px] font-mono font-medium text-[var(--text-secondary)] shadow-sm uppercase tracking-wider">
          <Briefcase className="h-3.5 w-3.5" />
          <span>PRODUCTION WORK HISTORY & LEADERSHIP</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
          Work Experience & Engineering Timeline
        </h2>

        <p className="mt-4 max-w-2xl text-base text-[var(--text-secondary)] font-medium">
          Over 3.5 years architecting enterprise Laravel and Django platforms, mentoring engineers,
          securing military defense inventories, and shipping commercial software.
        </p>
      </div>

      {/* Featured Career Milestones & Leadership Carousel */}
      <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
        <MilestonesCarousel />
      </div>

      {/* Tracing Beam Career Timeline */}
      <div className="mt-12 sm:mt-16 pl-0 sm:pl-10">
        <TracingBeam>
          <div className="space-y-8 sm:space-y-16">
            {experience.map((item) => (
              <div
                key={item.id}
                className="relative rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-6 sm:p-8 md:p-10 shadow-2xl transition-all"
              >
                {/* Header: Role, Company, Period, Location */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[var(--border-subtle)] pb-5 sm:pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[var(--glass-pill-bg)] px-3 py-1 font-mono text-xs font-semibold text-[var(--foreground)] border border-[var(--border-subtle)]">
                        {item.role}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--foreground)]">
                      {item.company}
                    </h3>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-3 sm:gap-1 text-xs font-mono text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                      <Calendar className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
                  {item.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-4 transition-colors hover:border-[var(--text-muted)]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-sm font-semibold text-[var(--foreground)]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--status-live)] shrink-0" />
                          <span>{h.label}</span>
                        </div>
                        {h.link && (
                          <a
                            href={h.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[var(--foreground)] hover:underline transition-colors"
                          >
                            <span>{h.link.text}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-medium pl-6">
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
