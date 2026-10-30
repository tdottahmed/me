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
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="rounded-full bg-neutral-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--foreground)] border border-[var(--border-subtle)]">
            LIVE VERIFIED
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-1 font-mono text-[11px]">
          <button
            onClick={() => setActiveTab("flow")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-all cursor-pointer ${
              activeTab === "flow"
                ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            <Cpu className="h-3 w-3" />
            <span>Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab("globe")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-all cursor-pointer ${
              activeTab === "globe"
                ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            <Globe2 className="h-3 w-3" />
            <span>Deployments</span>
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-all cursor-pointer ${
              activeTab === "terminal"
                ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            <TerminalIcon className="h-3 w-3" />
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
