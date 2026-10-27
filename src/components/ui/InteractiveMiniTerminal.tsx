"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function InteractiveMiniTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <span className="text-slate-400">
          Type <span className="text-blue-400 font-bold">help</span>,{" "}
          <span className="text-emerald-400 font-bold">skills</span>,{" "}
          <span className="text-amber-400 font-bold">projects</span>, or{" "}
          <span className="text-rose-400 font-bold">test</span>.
        </span>
      ),
    },
  ]);
  const logRef = useRef<HTMLDivElement>(null);

  // Scroll only the log box; scrollIntoView would also yank the whole page
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res: string | React.ReactNode = "";

    switch (trimmed) {
      case "help":
        res = (
          <div className="space-y-1 text-slate-300">
            <div>Available commands:</div>
            <div>• <span className="text-blue-400 font-semibold">skills</span>: View core language & backend expertise</div>
            <div>• <span className="text-emerald-400 font-semibold">projects</span>: Inspect live production platforms</div>
            <div>• <span className="text-amber-400 font-semibold">contact</span>: Reach Tanbir directly</div>
            <div>• <span className="text-rose-400 font-semibold">test</span>: Run the 847-suite test runner simulation</div>
            <div>• <span className="text-cyan-400 font-semibold">clear</span>: Clear terminal console</div>
          </div>
        );
        break;

      case "skills":
        res = (
          <div className="text-slate-300">
            Laravel 13, Next.js 16, React 19, Django REST, Celery, Reverb WebSockets, PostgreSQL, Redis, Docker, Linux VPS.
          </div>
        );
        break;

      case "projects":
        res = (
          <div className="space-y-1 text-slate-300">
            <div>1. <span className="text-blue-400">Sultan Big Bazaar</span> (847 tests, 20 modules)</div>
            <div>2. <span className="text-emerald-400">Fur & Feather BD</span> (3-repo SSO, double-entry ledger)</div>
            <div>3. <span className="text-rose-400">TradingChart.org</span> (Live LMS, JaaS video, React Native)</div>
            <div>4. <span className="text-cyan-400">Zamzam Wholesale</span> (B2B Canada, Inertia SPA)</div>
          </div>
        );
        break;

      case "contact":
        res = (
          <div className="text-slate-300">
            Email: {PORTFOLIO_DATA.personal.email} | Phone: {PORTFOLIO_DATA.personal.phoneFormatted} | Location: Dhaka, BD
          </div>
        );
        break;

      case "test":
        res = (
          <div className="space-y-0.5 text-emerald-400">
            <div>[PASS] test_pessimistic_row_level_stock_lock ... 0.012s</div>
            <div>[PASS] test_signature_verified_idempotent_webhook ... 0.015s</div>
            <div>[PASS] test_append_only_double_entry_balance ... 0.008s</div>
            <div className="text-white font-bold mt-1">✔ 847 / 847 Automated Tests Passed (100% Money-Safe)</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        res = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col font-mono text-xs">
      <div ref={logRef} data-lenis-prevent className="flex-1 space-y-2 overflow-y-auto overscroll-contain max-h-[220px] p-2 scrollbar-thin">
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-emerald-400">tanbir@dev:~$</span>
              <span className="text-slate-200">{item.command}</span>
            </div>
            <div className="text-slate-300 pl-4">{item.output}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2 border-t border-slate-800 pt-2">
        <span className="text-emerald-400 shrink-0 text-xs">tanbir@dev:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help'..."
          className="w-full bg-transparent text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded p-1 text-slate-500 hover:text-slate-200"
          aria-label="Send command"
        >
          <CornerDownLeft className="h-3 w-3" />
        </button>
      </form>
    </div>
  );
}
