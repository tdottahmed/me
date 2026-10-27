import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Terminal, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { personal, metrics } = PORTFOLIO_DATA;

  return (
    <main className="relative min-h-screen bg-[#070a12] text-[#f8fafc] bg-grid-technical overflow-hidden pt-20">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.18),rgba(7,10,18,0))]" />

      <section id="overview" className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Verification & Welcome */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-mono font-medium text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Phase 2 Complete • Terminal Preloader, Navbar & Cmd + K Active
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

          {/* Status logs */}
          <div className="mt-16 w-full max-w-xl rounded-2xl glass-panel p-6 text-left">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <Terminal className="h-5 w-5 text-emerald-400" />
              <h3 className="font-mono text-sm font-semibold text-slate-200">
                Phase 2 Navigation & Interactive System Status
              </h3>
            </div>
            <ul className="mt-4 space-y-3 font-mono text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Production Server Boot Preloader (3-step test verification, 0-100% counter)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Sticky Glassmorphic Navbar with animated active indicator and live status pill</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Command Palette (Cmd+K / Ctrl+K) with 1-click email copy & confetti trigger</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Toast Notification Provider & ATS Resume download integration</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Placeholder anchors for upcoming sections */}
      <div id="skills" className="py-2" />
      <div id="projects" className="py-2" />
      <div id="architecture" className="py-2" />
      <div id="experience" className="py-2" />
      <div id="education" className="py-2" />
      <div id="contact" className="py-2" />
    </main>
  );
}
