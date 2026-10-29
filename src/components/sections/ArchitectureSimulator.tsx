"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Zap,
  Server,
  CheckCircle2,
  Play,
  RotateCcw,
} from "lucide-react";

export function ArchitectureSimulator() {
  const [activeTab, setActiveTab] = useState<"checkout" | "websockets" | "vps">("checkout");

  // Money-Safe Checkout Simulation State
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const startCheckoutSimulation = () => {
    setSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => setSimStep(4), 2100);
    setTimeout(() => setSimStep(5), 2800);
    setTimeout(() => setSimulating(false), 3200);
  };

  const resetCheckoutSimulation = () => {
    setSimulating(false);
    setSimStep(0);
  };

  // WebSockets simulation
  const [wsPings, setWsPings] = useState<string[]>([]);
  const triggerWsBroadcast = () => {
    const time = new Date().toLocaleTimeString();
    const id = Math.random().toString(36).substring(2, 6);
    setWsPings((prev) => [
      `[${time}] Event 'OrderPlaced': Dispatched to private-channel.store.1 (Latency: 18ms, ID: ${id})`,
      ...prev.slice(0, 3),
    ]);
  };

  return (
    <section id="architecture" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-medium text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>PRODUCTION VERIFICATION SIMULATOR</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Engineering Deep-Dive Architecture
        </h2>

        <p className="mt-4 max-w-2xl text-base text-slate-400">
          Interactive visual simulators illustrating how financial correctness, real-time concurrency,
          and hardened VPS infrastructure work under high load.
        </p>
      </div>

      {/* Main Glass Panel Simulator */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-800 bg-[#0c1222]/90 shadow-2xl">
        {/* Tab Controls */}
        <div className="flex flex-wrap items-center border-b border-slate-800/80 bg-slate-900/40 p-2 gap-2">
          <button
            onClick={() => setActiveTab("checkout")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-medium transition-all cursor-pointer ${
              activeTab === "checkout"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>1. Money-Safe Checkout & Row Locks</span>
          </button>

          <button
            onClick={() => setActiveTab("websockets")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-medium transition-all cursor-pointer ${
              activeTab === "websockets"
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span>2. Reverb WebSockets & Real-Time Events</span>
          </button>

          <button
            onClick={() => setActiveTab("vps")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-medium transition-all cursor-pointer ${
              activeTab === "vps"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Server className="h-3.5 w-3.5 text-purple-400" />
            <span>3. Hardened Linux VPS & CI/CD Pipeline</span>
          </button>
        </div>

        {/* Tab 1: Money-Safe Checkout Simulator */}
        {activeTab === "checkout" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <h3 className="font-sans text-lg font-bold text-white flex items-center gap-2">
                  <span>Pessimistic Row-Level Lock & Idempotent Ledger Pipeline</span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                    ACID Guaranteed
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  How Sultan Big Bazaar & Fur & Feather BD prevent overselling when 2 customers purchase the final stock unit at the same millisecond.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={startCheckoutSimulation}
                  disabled={simulating}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 hover:brightness-110 disabled:opacity-50 cursor-pointer transition-all"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{simulating ? "Executing Locks..." : "Simulate Concurrent Order"}</span>
                </button>
                {simStep > 0 && !simulating && (
                  <button
                    onClick={resetCheckoutSimulation}
                    className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white transition-colors"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Step-by-Step Flow Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
              {/* Step 1 */}
              <div
                className={`rounded-xl border p-4 transition-all ${
                  simStep >= 1
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 bg-slate-900/40 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-bold text-slate-500">STAGE 1</div>
                <div className="font-semibold text-white mt-1">UUID Idempotency</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Client sends header <code className="text-emerald-400">Idempotency-Key</code>. Redis checks for duplicates.
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`rounded-xl border p-4 transition-all ${
                  simStep >= 2
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 bg-slate-900/40 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-bold text-slate-500">STAGE 2</div>
                <div className="font-semibold text-white mt-1">HMAC Signature</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Payment webhook signature verified using shared secret to block payload tampering.
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`rounded-xl border p-4 transition-all ${
                  simStep >= 3
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/10"
                    : "border-slate-800 bg-slate-900/40 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-bold text-slate-500">STAGE 3</div>
                <div className="font-semibold text-white mt-1">SELECT FOR UPDATE</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Pessimistic lock held on product stock row. Concurrent checkout wait-queued by DB engine.
                </div>
              </div>

              {/* Step 4 */}
              <div
                className={`rounded-xl border p-4 transition-all ${
                  simStep >= 4
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 bg-slate-900/40 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-bold text-slate-500">STAGE 4</div>
                <div className="font-semibold text-white mt-1">Decimal Ledger</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  No floating point rounding errors. Append-only ledger debits & credits balance exactly.
                </div>
              </div>

              {/* Step 5 */}
              <div
                className={`rounded-xl border p-4 transition-all ${
                  simStep >= 5
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 bg-slate-900/40 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-bold text-slate-500">STAGE 5</div>
                <div className="font-semibold text-white mt-1">Order Committed</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Immutable invoice snapshot created. Row-lock released. Competing order receives OutOfStock.
                </div>
              </div>
            </div>

            {/* Real-time simulation feedback terminal */}
            <div className="rounded-xl border border-slate-800 bg-black/60 p-4 font-mono text-xs">
              <div className="text-slate-500">{"// Live Transaction Trace Log"}</div>
              {simStep === 0 && (
                <div className="text-slate-400 mt-1">
                  Click &quot;Simulate Concurrent Order&quot; above to watch the database lock engine handle concurrency.
                </div>
              )}
              {simStep >= 1 && (
                <div className="text-slate-300 mt-1">
                  [13:42:01.002] User A & User B issue concurrent checkout for Product #42 (Stock: 1).
                </div>
              )}
              {simStep >= 2 && (
                <div className="text-blue-400 mt-1">
                  [13:42:01.018] Both requests pass HMAC-SHA256 signature verification & Redis idempotency check.
                </div>
              )}
              {simStep >= 3 && (
                <div className="text-amber-400 mt-1">
                  [13:42:01.025] User A acquires SELECT ... FOR UPDATE. User B put in waiting lock state.
                </div>
              )}
              {simStep >= 4 && (
                <div className="text-emerald-400 mt-1">
                  [13:42:01.039] Stock decremented (1 -&gt; 0). Ledger: Credit Merchant Payable ৳1,400, Credit Platform Commission ৳99.
                </div>
              )}
              {simStep >= 5 && (
                <div className="text-emerald-300 font-bold mt-1">
                  ✔ [13:42:01.048] User A order complete. User B resumes lock -&gt; Reads stock 0 -&gt; Clean OutOfStockException. Overselling PREVENTED!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Reverb WebSockets Architecture */}
        {activeTab === "websockets" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <h3 className="font-sans text-lg font-bold text-white flex items-center gap-2">
                  <span>Laravel Reverb + Horizon + Redis Broadcast Mesh</span>
                  <span className="rounded bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-400 border border-blue-500/20">
                    &lt; 25ms Broadcast Latency
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Powers real-time doctor chats in Fur & Feather BD and live student desks in TradingChart.org.
                </p>
              </div>

              <button
                onClick={triggerWsBroadcast}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 cursor-pointer transition-all"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>Broadcast Event to Channel</span>
              </button>
            </div>

            {/* Architecture Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-blue-400 font-bold">1. Event Dispatch</div>
                <div className="mt-1 text-slate-300 font-semibold">User Triggers Action</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Laravel dispatches <code className="text-slate-200">event(new OrderPlaced())</code> implementing <code className="text-blue-400">ShouldBroadcast</code>.
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-rose-400 font-bold">2. Redis Queue</div>
                <div className="mt-1 text-slate-300 font-semibold">Horizon Orchestration</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Serialized event pushed to Redis queue. Horizon monitors throughput and prevents queue backpressure.
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-amber-400 font-bold">3. Reverb Server</div>
                <div className="mt-1 text-slate-300 font-semibold">High-Concurrency WS</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Pure PHP WebSocket server running on port 8080 under Supervisor, handling thousands of concurrent sockets.
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-emerald-400 font-bold">4. Next.js / React Client</div>
                <div className="mt-1 text-slate-300 font-semibold">Private Channel Push</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Echo listens on <code className="text-emerald-400">private-user.{`{id}`}</code> with JWT authorization. UI updates reactively.
                </div>
              </div>
            </div>

            {/* Live Broadcast Ping Monitor */}
            <div className="rounded-xl border border-slate-800 bg-black/60 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800/60">
                <span>{"// Live Reverb WebSocket Socket Stream"}</span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  CONNECTED (wss://reverb.production:443)
                </span>
              </div>
              <div className="space-y-1.5 mt-2">
                {wsPings.length === 0 ? (
                  <div className="text-slate-500">
                    Click &quot;Broadcast Event to Channel&quot; above to simulate a live event delivery.
                  </div>
                ) : (
                  wsPings.map((ping, idx) => (
                    <div key={idx} className="text-blue-400">
                      {ping}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Hardened Linux VPS & CI/CD Pipeline */}
        {activeTab === "vps" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800/80 pb-5">
              <h3 className="font-sans text-lg font-bold text-white flex items-center gap-2">
                <span>Hardened Ubuntu VPS & Automated CI/CD Lifecycle</span>
                <span className="rounded bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-400 border border-purple-500/20">
                  847 Automated Tests
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero-downtime deployment architecture managed on production Ubuntu VPS with strict security controls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-indigo-400 font-bold">1. GitHub Actions</div>
                <div className="mt-1 text-slate-200 font-semibold">Automated Test Matrix</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Runs 847 Django / PHPUnit tests, linting, and smoke checks. Deployment halts immediately on test failure.
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-orange-400 font-bold">2. Cloudflare Strict TLS</div>
                <div className="mt-1 text-slate-200 font-semibold">Edge WAF & DNS</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Strict full encryption, DDoS protection, edge caching, and DNS automation via Cloudflare API.
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-rose-400 font-bold">3. Fail2ban & Hardening</div>
                <div className="mt-1 text-slate-200 font-semibold">VPS Intrusion Defense</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Automated IP banning for brute-force SSH / HTTP probes, restricted sudo, and non-root service execution.
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-emerald-400 font-bold">4. Nginx & Supervisor</div>
                <div className="mt-1 text-slate-200 font-semibold">Zero-Downtime Daemon</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Reverse proxy with gzip/Brotli, rate-limiting, and systemd/Supervisor daemons auto-restarting workers.
                </div>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-mono text-xs">
              <div className="font-semibold text-slate-200 mb-2">Production Security & Reliability Checklist:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Let&apos;s Encrypt wildcard certs renewed via Cloudflare DNS-01 challenge</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Automated daily offsite MySQL / PostgreSQL database backups</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Horizon & Celery workers supervised with memory ceiling restarts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Cloudflare authenticated origin pulls (enforcing edge-only traffic)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
