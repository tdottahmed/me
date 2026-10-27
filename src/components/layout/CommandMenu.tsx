"use client";

import React, { useEffect } from "react";
import { Command } from "cmdk";
import { useCommandMenu } from "./CommandMenuContext";
import { useToast } from "@/components/ui/Toast";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import confetti from "canvas-confetti";
import {
  Code,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Mail,
  FileDown,
  Phone,
  Terminal,
  Compass,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function CommandMenu() {
  const { isOpen, closeMenu, toggleMenu } = useCommandMenu();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMenu]);

  const handleNavigate = (hash: string) => {
    closeMenu();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = hash;
    }
  };

  const handleCopyEmail = () => {
    closeMenu();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#3b82f6", "#10b981", "#60a5fa"],
    });
    showToast(`Email copied: ${PORTFOLIO_DATA.personal.email}`, "success");
  };

  const handleCopyPhone = () => {
    closeMenu();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    showToast(`Phone copied: ${PORTFOLIO_DATA.personal.phoneFormatted}`, "success");
  };

  const handleReplayPreloader = () => {
    closeMenu();
    sessionStorage.removeItem("tanbir_portfolio_booted");
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={closeMenu}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0b101d] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="Command Palette"
          className="w-full text-slate-200"
        >
          <div className="flex items-center border-b border-slate-800/80 px-4">
            <Terminal className="h-4 w-4 text-blue-400 shrink-0 mr-3" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search sections..."
              className="w-full bg-transparent py-4 font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <kbd className="hidden sm:inline-block rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-6 text-center text-xs font-mono text-slate-500">
              No matching command found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500">
              <Command.Item
                onSelect={() => handleNavigate("#overview")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Compass className="h-4 w-4 text-blue-400" />
                <span>Jump to Overview & Metrics</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("#projects")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <FolderGit2 className="h-4 w-4 text-rose-400" />
                <span>Explore Featured Production Projects</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("#skills")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Code className="h-4 w-4 text-emerald-400" />
                <span>Interactive Skills & Tools Matrix</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("#architecture")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>Inspect Architecture Deep-Dive Simulator</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("#experience")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Briefcase className="h-4 w-4 text-amber-400" />
                <span>Work Experience & Engineering Timeline</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("#education")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <GraduationCap className="h-4 w-4 text-purple-400" />
                <span>Education, Degree & Certifications</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("#contact")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>Contact & Direct Inquiries</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="my-2 h-[1px] bg-slate-800" />

            <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500">
              <Command.Item
                onSelect={handleCopyEmail}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                <div className="flex flex-col">
                  <span>Copy Direct Email</span>
                  <span className="font-mono text-[10px] text-slate-400">{PORTFOLIO_DATA.personal.email}</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={handleCopyPhone}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <div className="flex flex-col">
                  <span>Copy Phone / WhatsApp</span>
                  <span className="font-mono text-[10px] text-slate-400">{PORTFOLIO_DATA.personal.phoneFormatted}</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  closeMenu();
                  window.open(PORTFOLIO_DATA.personal.resumeUrl, "_blank");
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <FileDown className="h-4 w-4 text-amber-400" />
                <span>View ATS Resume (Google Docs)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  closeMenu();
                  window.open(PORTFOLIO_DATA.personal.githubUrl, "_blank");
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <GithubIcon className="h-4 w-4 text-slate-300" />
                <span>Open GitHub Profile (tdottahmed)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  closeMenu();
                  window.open(PORTFOLIO_DATA.personal.linkedinUrl, "_blank");
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <LinkedinIcon className="h-4 w-4 text-sky-400" />
                <span>Open LinkedIn Profile (tanbir-ahmed07)</span>
              </Command.Item>
              <Command.Item
                onSelect={handleReplayPreloader}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white cursor-pointer transition-colors"
              >
                <Sparkles className="h-4 w-4 text-rose-400" />
                <span>Replay Server Boot Preloader</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-slate-800/80 px-4 py-2.5 font-mono text-[10px] text-slate-500">
            <span>Navigation: ↑ ↓ • Select: ↵</span>
            <span>tanbir.nixsoftware.net</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
