"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CredentialsCarousel } from "@/components/ui/CredentialsCarousel";
import {
  GraduationCap,
  Award,
  Languages,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function EducationBento() {
  const { education, certifications, languages } = PORTFOLIO_DATA;
  const edu = education[0];
  const cert = certifications[0];

  return (
    <section id="education" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3.5 py-1 text-[11px] font-mono font-medium text-[var(--text-secondary)] shadow-sm uppercase tracking-wider">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>ACADEMIC FOUNDATION & CREDENTIALS</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
          Education, Certification & Languages
        </h2>

        <p className="mt-4 max-w-2xl text-base text-[var(--text-secondary)]">
          Rooted in formal computer science engineering, certified by industry-standard programs,
          and capable of seamless bilingual technical communication.
        </p>
      </div>

      {/* Interactive Credentials & Honors Animated Carousel */}
      <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
        <CredentialsCarousel />
      </div>

      {/* 3-Card Bento Grid */}
      <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Academic Degree (7 cols) */}
        <div className="lg:col-span-7">
          <SpotlightCard className="h-full flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--card-bg)] rounded-3xl p-6 sm:p-8 hover:border-[var(--card-border-hover)] transition-all">
            <div>
              {/* Badge & Period */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <span className="rounded-full bg-[var(--glass-pill-bg)] px-3 py-1 font-semibold text-[var(--foreground)] border border-[var(--border-subtle)]">
                  B.Sc. Engineering Degree
                </span>
                <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Title & Institution */}
              <h3 className="mt-4 font-sans text-xl sm:text-2xl font-extrabold text-[var(--foreground)]">
                {edu.degree}
              </h3>
              <div className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                {edu.institution}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-mono text-[var(--text-muted)]">
                <MapPin className="h-3 w-3" />
                <span>{edu.location}</span>
                <span className="mx-1">•</span>
                <span className="text-[var(--foreground)] font-semibold">CGPA: {edu.gpa}</span>
              </div>

              {/* Coursework Badges */}
              <div className="mt-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Key Computer Science Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Academic Projects */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Academic Engineering Capstones
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                  {edu.projects}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column (5 cols): Certification + Languages stacked */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 2: Professional Certification */}
          <SpotlightCard className="flex-1 flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--card-bg)] rounded-3xl p-6 sm:p-7 hover:border-[var(--card-border-hover)] transition-all">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span className="rounded-full bg-[var(--glass-pill-bg)] px-3 py-1 font-semibold text-[var(--foreground)] border border-[var(--border-subtle)] flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  <span>Industry Certification</span>
                </span>
                <span className="text-[var(--text-muted)]">{cert.period}</span>
              </div>

              <h4 className="mt-3 font-sans text-lg font-bold text-[var(--foreground)]">
                {cert.title}
              </h4>
              <div className="text-xs font-medium text-[var(--text-secondary)] mt-0.5">
                {cert.issuer}
              </div>

              <ul className="mt-4 space-y-2 text-xs text-[var(--text-secondary)] font-normal">
                {cert.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-live)] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          {/* Card 3: Spoken Languages */}
          <SpotlightCard className="border border-[var(--border-subtle)] bg-[var(--card-bg)] rounded-3xl p-6 hover:border-[var(--card-border-hover)] transition-all">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              <Languages className="h-4 w-4" />
              <span>Language Proficiencies</span>
            </div>

            <div className="space-y-2.5">
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-3"
                >
                  <span className="font-sans text-sm font-bold text-[var(--foreground)]">
                    {lang.language}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
