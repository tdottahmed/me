"use client";

import React, { useState } from "react";
import { Globe } from "@/components/ui/Globe";
import { SystemFlowBeam } from "@/components/ui/SystemFlowBeam";
import { InteractiveMiniTerminal } from "@/components/ui/InteractiveMiniTerminal";
import { Cpu, Globe2, Terminal as TerminalIcon } from "lucide-react";

export function TelemetryWidget() {
  const [activeTab, setActiveTab] = useState<"flow" | "globe" | "terminal">("flow");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4 sm:p-5 shadow-xl transition-colors duration-250">
      {/* Top Header & Tab Controls */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
        {/* Left: Status Badge Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] px-3 py-1.5 shadow-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-bold text-[var(--foreground)] tracking-tight whitespace-nowrap">
              Telemetry
            </span>
          </div>
        </div>

        {/* Right: Segmented Mode Switcher */}
        <div className="flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-1 font-mono text-[11px] shrink-0">
          <button
            onClick={() => setActiveTab("flow")}
            className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "flow"
                ? "bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] font-bold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)] font-medium"
            }`}
          >
            <Cpu className="h-3 w-3 shrink-0" />
            <span className="hidden min-[440px]:inline">Architecture</span>
            <span className="min-[440px]:hidden">Arch</span>
          </button>
          <button
            onClick={() => setActiveTab("globe")}
            className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "globe"
                ? "bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] font-bold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)] font-medium"
            }`}
          >
            <Globe2 className="h-3 w-3 shrink-0" />
            <span className="hidden min-[440px]:inline">Deployments</span>
            <span className="min-[440px]:hidden">Edge</span>
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "terminal"
                ? "bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] font-bold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)] font-medium"
            }`}
          >
            <TerminalIcon className="h-3 w-3 shrink-0" />
            <span>CLI</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="mt-4 min-h-[380px] flex items-start justify-center">
        {activeTab === "flow" && (
          <div className="w-full">
            <SystemFlowBeam />
          </div>
        )}

        {activeTab === "globe" && (
          <div className="flex flex-col items-center justify-center w-full py-4">
            <Globe className="h-[270px] w-full" />
            <div className="mt-4 flex items-center justify-between w-full px-2 font-mono text-[10px] text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-3">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--status-live)]" />
                Toronto, Canada
              </span>
            </div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="w-full h-full pt-1">
            <InteractiveMiniTerminal />
          </div>
        )}
      </div>
    </div>
  );
}
