"use client";

import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  GraduationCap,
  Award,
  Languages,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from "lucide-react";

export function EducationBento() {
  const { education, certifications, languages } = PORTFOLIO_DATA;
  const edu = education[0];
  const cert = certifications[0];

  return (
    <section id="education" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-medium text-purple-400">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>ACADEMIC FOUNDATION & CREDENTIALS</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Education, Certification & Languages
        </h2>

        <p className="mt-4 max-w-2xl text-base text-slate-400">
          Rooted in formal computer science engineering, certified by industry-standard programs,
          and capable of seamless bilingual technical communication.
        </p>
      </div>

      {/* 3-Card Bento Grid */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Academic Degree (7 cols) */}
        <div className="lg:col-span-7">
          <SpotlightCard className="h-full flex flex-col justify-between border-slate-800/90 bg-[#0c1222]/90 p-6 sm:p-8 hover:border-purple-500/40 transition-all">
            <div>
              {/* Badge & Period */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="rounded-full bg-purple-500/10 px-3 py-1 font-semibold text-purple-400 border border-purple-500/20">
                  B.Sc. Engineering Degree
                </span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Title & Institution */}
              <h3 className="mt-4 font-sans text-xl sm:text-2xl font-extrabold text-white">
                {edu.degree}
              </h3>
              <div className="mt-1 text-sm font-medium text-slate-400">
                {edu.institution}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-mono text-slate-500">
                <MapPin className="h-3 w-3" />
                <span>{edu.location}</span>
                <span className="mx-1">•</span>
                <span className="text-purple-400 font-semibold">CGPA: {edu.gpa}</span>
              </div>

              {/* Coursework Badges */}
              <div className="mt-6">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Key Computer Science Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Academic Projects */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Academic Engineering Capstones
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {edu.projects}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column (5 cols): Certification + Languages stacked */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 2: Professional Certification */}
          <SpotlightCard className="flex-1 flex flex-col justify-between border-slate-800/90 bg-[#0c1222]/90 p-6 sm:p-7 hover:border-emerald-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  <span>Industry Certification</span>
                </span>
                <span>{cert.period}</span>
              </div>

              <h4 className="mt-3 font-sans text-lg font-bold text-white">
                {cert.title}
              </h4>
              <div className="text-xs font-medium text-emerald-400 mt-0.5">
                {cert.issuer}
              </div>

              <ul className="mt-4 space-y-2 text-xs text-slate-300 font-normal">
                {cert.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          {/* Card 3: Spoken Languages */}
          <SpotlightCard className="border-slate-800/90 bg-[#0c1222]/90 p-6 hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-3">
              <Languages className="h-4 w-4" />
              <span>Language Proficiencies</span>
            </div>

            <div className="space-y-3">
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/40 p-3"
                >
                  <span className="font-sans text-sm font-bold text-white">
                    {lang.language}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
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
