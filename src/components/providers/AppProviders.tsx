"use client";

import React, { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { CommandMenuProvider } from "@/components/layout/CommandMenuContext";
import { TerminalPreloader } from "@/components/preloader/TerminalPreloader";
import { Navbar } from "@/components/layout/Navbar";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <SmoothScroll>
          <ToastProvider>
            <CommandMenuProvider>
              <TerminalPreloader />
              <ScrollProgress />
              <Navbar />
              <CommandMenu />
              {children}
              <FloatingChatWidget />
            </CommandMenuProvider>
          </ToastProvider>
        </SmoothScroll>
      </ThemeProvider>
    </MotionConfig>
  );
}
