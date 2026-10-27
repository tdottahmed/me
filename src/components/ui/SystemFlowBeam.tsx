"use client";

import React from "react";
import { motion } from "motion/react";
import { Layout, Server, Cpu, Database, ShieldCheck, Zap } from "lucide-react";

export function SystemFlowBeam() {
  const nodes = [
    {
      id: "client",
      title: "Storefront & UI",
      subtitle: "Next.js 16 • React 19",
      icon: Layout,
      color: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    },
    {
      id: "api",
      title: "Core Service Layer",
      subtitle: "Laravel 13 • Django DRF",
      icon: Server,
      color: "border-rose-500/40 bg-rose-500/10 text-rose-400",
    },
    {
      id: "queue",
      title: "Concurrency & Events",
      subtitle: "Reverb • Horizon • Celery",
      icon: Cpu,
      color: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    },
    {
      id: "db",
      title: "ACID Ledger & DB",
      subtitle: "PostgreSQL • Row-Level Lock",
      icon: Database,
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-between py-2 space-y-3 font-mono">
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <div key={node.id} className="w-full">
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${node.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">{node.title}</div>
                  <div className="text-[10px] text-slate-400">{node.subtitle}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Connecting animated beam */}
            {i < nodes.length - 1 && (
              <div className="relative mx-auto h-5 w-0.5 bg-slate-800">
                <motion.div
                  className="absolute left-0 top-0 h-2 w-full bg-gradient-to-b from-blue-400 via-emerald-400 to-rose-400"
                  animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <div className="w-full rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-center text-[11px] text-emerald-400 flex items-center justify-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>Idempotency Key & Row-Lock Verified</span>
      </div>
    </div>
  );
}
