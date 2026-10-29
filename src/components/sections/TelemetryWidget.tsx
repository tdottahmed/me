"use client";

import React, { useState } from "react";
import { Globe } from "@/components/ui/Globe";
import { SystemFlowBeam } from "@/components/ui/SystemFlowBeam";
import { InteractiveMiniTerminal } from "@/components/ui/InteractiveMiniTerminal";
import { Cpu, Globe2, Terminal as TerminalIcon } from "lucide-react";

export function TelemetryWidget() {
  const [activeTab, setActiveTab] = useState<"flow" | "globe" | "terminal">("flow");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0c1222]/95 p-4 sm:p-5 shadow-2xl">
      {/* Top Header & Tab Controls */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
            LIVE VERIFIED
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/60 p-1 font-mono text-[11px]">
          <button
            onClick={() => setActiveTab("flow")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
              activeTab === "flow"
                ? "bg-blue-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="h-3 w-3" />
            <span>Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab("globe")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
              activeTab === "globe"
                ? "bg-blue-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe2 className="h-3 w-3" />
            <span>Global</span>
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
              activeTab === "terminal"
                ? "bg-blue-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
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
            <div className="mt-4 flex items-center justify-between w-full px-2 font-mono text-[10px] text-slate-400 border-t border-slate-800 pt-3">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
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

