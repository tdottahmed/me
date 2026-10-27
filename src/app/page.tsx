import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Terminal, ShieldCheck, Cpu, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { personal, metrics } = PORTFOLIO_DATA;

  return (
    <main className="relative min-h-screen bg-[#070a12] text-[#f8fafc] bg-grid-technical overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.18),rgba(7,10,18,0))]" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Phase 1 Verification Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-mono font-medium text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Phase 1 Initialized • Design System & Architecture Ready
          </div>

          <h1 className="mt-8 max-w-4xl font-sans text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
            {personal.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            {personal.summary}
          </p>

          {/* Quick Metrics preview from typed data */}
          <div className="mt-12 grid w-full grid-cols-2 gap-4 sm:grid-cols-5">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-xl p-4 text-center transition-all"
              >
                <div className="font-mono text-2xl font-bold text-blue-400 sm:text-3xl">
                  {m.value}
                  {m.suffix}
                </div>
                <div className="mt-1 text-xs text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Foundation checklist */}
          <div className="mt-16 w-full max-w-xl rounded-2xl glass-panel p-6 text-left">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <Terminal className="h-5 w-5 text-emerald-400" />
              <h3 className="font-mono text-sm font-semibold text-slate-200">
                Phase 1 Scaffolding & System Status
              </h3>
            </div>
            <ul className="mt-4 space-y-3 font-mono text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Next.js 16 (App Router) + React 19 + TypeScript 5.x</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Tailwind CSS v4 + Obsidian Dark Theme Tokens</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Lenis Smooth Scroll Engine + Inter & JetBrains Mono Fonts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Motion + GSAP + cmdk + Cobe 3D Globe + Lucide Icons</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Portfolio Data Store loaded ({PORTFOLIO_DATA.skills.length} skills, {PORTFOLIO_DATA.projects.length} projects)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
