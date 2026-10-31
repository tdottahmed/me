"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Mail,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useToast } from "@/components/ui/Toast";
import { useLenis } from "lenis/react";
import confetti from "canvas-confetti";

// Official SVG Icons for Brand Accuracy
function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function MessengerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.056-3.26-5.963 3.26 6.559-6.963 3.13 3.26 5.889-3.26-6.559 6.963z" />
    </svg>
  );
}

function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { showToast } = useToast();

  const { personal } = PORTFOLIO_DATA;

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.85, x: 0.85 },
    });
    showToast(`Email copied: ${personal.email}`, "success");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;

    // Send via WhatsApp with pre-filled message
    const encoded = encodeURIComponent(quickMessage);
    window.open(`https://wa.me/8801876525073?text=${encoded}`, "_blank");
    setQuickMessage("");
    setIsOpen(false);
  };

  const scrollToContact = () => {
    setIsOpen(false);
    const el = document.getElementById("contact");
    if (el) {
      lenis?.scrollTo(el, { offset: -60, duration: 1.4 });
    }
  };

  const chatChannels = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      subtitle: "+880 1876-525073 • Instant",
      badge: "Fastest",
      icon: WhatsAppIcon,
      accent: "text-emerald-500",
      bgHover: "hover:border-emerald-500/40 hover:bg-emerald-500/5",
      href: "https://wa.me/8801876525073?text=Hi%20Tanbir%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!",
      isExternal: true,
    },
    {
      id: "messenger",
      name: "Messenger",
      subtitle: "Facebook Chat",
      badge: "Online",
      icon: MessengerIcon,
      accent: "text-blue-500",
      bgHover: "hover:border-blue-500/40 hover:bg-blue-500/5",
      href: "https://m.me/tanbir.ahmed07",
      isExternal: true,
    },
    {
      id: "telegram",
      name: "Telegram",
      subtitle: "@tdottahmed • Direct Wire",
      badge: "Direct",
      icon: TelegramIcon,
      accent: "text-sky-500",
      bgHover: "hover:border-sky-500/40 hover:bg-sky-500/5",
      href: "https://t.me/tdottahmed",
      isExternal: true,
    },
    {
      id: "email",
      name: "Direct Email",
      subtitle: personal.email,
      badge: copiedEmail ? "Copied!" : "1-Click Copy",
      icon: Mail,
      accent: "text-amber-500",
      bgHover: "hover:border-amber-500/40 hover:bg-amber-500/5",
      onClick: handleCopyEmail,
    },
    {
      id: "phone",
      name: "Direct Call",
      subtitle: personal.phoneFormatted,
      badge: "Voice",
      icon: Phone,
      accent: "text-purple-500",
      bgHover: "hover:border-purple-500/40 hover:bg-purple-500/5",
      href: `tel:${personal.phone}`,
      isExternal: false,
    },
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-[80] select-none font-sans">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute bottom-16 right-0 w-[330px] sm:w-[370px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--foreground)] shadow-2xl backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar with Status Pulse */}
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] font-black text-sm tracking-tight shadow-md">
                    TA
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[var(--card-bg)]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-[var(--foreground)] leading-none">
                      <span>Tanbir Ahmed</span>
                      <Sparkles className="h-3 w-3 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-[var(--muted-foreground)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Online • Replies within minutes</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  aria-label="Close chat menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-3 text-xs text-[var(--muted-foreground)] font-medium leading-relaxed">
                Connect directly for contract architecture, full-stack hiring, or fast consultations:
              </p>
            </div>

            {/* Channels List */}
            <div className="p-3 space-y-1.5 max-h-[300px] overflow-y-auto overscroll-contain">
              {chatChannels.map((channel) => {
                const Icon = channel.icon;
                const Content = (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] ${channel.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[var(--foreground)] truncate">
                            {channel.name}
                          </span>
                          <span className="rounded-full bg-[var(--glass-pill-bg)] px-2 py-0.5 font-mono text-[9px] text-[var(--muted-foreground)] border border-[var(--border-subtle)]">
                            {channel.badge}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-[var(--muted-foreground)] truncate mt-0.5">
                          {channel.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[var(--muted-foreground)] shrink-0 ml-2 group-hover:text-[var(--foreground)] transition-colors" />
                  </div>
                );

                if (channel.onClick) {
                  return (
                    <button
                      key={channel.id}
                      onClick={channel.onClick}
                      className={`w-full flex items-center rounded-2xl border border-transparent p-2.5 transition-all text-left cursor-pointer group ${channel.bgHover}`}
                    >
                      {Content}
                    </button>
                  );
                }

                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={channel.isExternal ? "_blank" : undefined}
                    rel={channel.isExternal ? "noopener noreferrer" : undefined}
                    className={`flex items-center rounded-2xl border border-transparent p-2.5 transition-all group cursor-pointer ${channel.bgHover}`}
                  >
                    {Content}
                  </a>
                );
              })}
            </div>

            {/* Quick Note Input Form */}
            <div className="border-t border-[var(--border-subtle)] bg-[var(--glass-pill-bg)] p-3">
              <form onSubmit={handleQuickSend} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  placeholder="Type a message & chat..."
                  className="flex-1 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] px-3.5 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Send via WhatsApp"
                  title="Send via WhatsApp"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>

              <div className="mt-2 text-center">
                <button
                  onClick={scrollToContact}
                  className="text-[11px] font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Or fill out the direct inquiry form ↓
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close quick chat" : "Open quick chat"}
        className="flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--card-contrast-bg)] text-[var(--card-contrast-fg)] px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xl transition-all cursor-pointer group"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <div className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--card-contrast-bg)] animate-pulse" />
            </div>
            <span className="hidden sm:inline font-sans text-xs font-bold tracking-tight">
              Chat with Tanbir
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
