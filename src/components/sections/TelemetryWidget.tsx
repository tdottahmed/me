"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Globe } from "@/components/ui/Globe";
import { SystemFlowBeam } from "@/components/ui/SystemFlowBeam";
import { InteractiveMiniTerminal } from "@/components/ui/InteractiveMiniTerminal";
import { Cpu, Globe2, Terminal as TerminalIcon } from "lucide-react";

export function TelemetryWidget() {
  const [activeTab, setActiveTab] = useState<"flow" | "globe" | "terminal">("flow");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0c1222]/90 p-5 shadow-2xl">
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            System Telemetry
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/60 p-0.5 font-mono text-[11px]">
          <button
            onClick={() => setActiveTab("flow")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
              activeTab === "flow"
                ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="h-3 w-3" />
            <span>Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab("globe")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
              activeTab === "globe"
                ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe2 className="h-3 w-3" />
            <span>Global</span>
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
              activeTab === "terminal"
                ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <TerminalIcon className="h-3 w-3" />
            <span>CLI</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="mt-4 min-h-[310px] flex items-center justify-center">
        {activeTab === "flow" && (
          <div className="w-full">
            <SystemFlowBeam />
          </div>
        )}

        {activeTab === "globe" && (
          <div className="flex flex-col items-center justify-center w-full py-2">
            <Globe className="h-[250px] w-full" />
            <div className="mt-2 flex items-center justify-between w-full px-2 font-mono text-[10px] text-slate-400 border-t border-slate-800 pt-2">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Toronto, Canada
              </span>
            </div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="w-full h-full">
            <InteractiveMiniTerminal />
          </div>
        )}
      </div>
    </div>
  );
}
