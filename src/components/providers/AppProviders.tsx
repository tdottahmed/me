"use client";

import React, { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { ToastProvider } from "@/components/ui/Toast";
import { CommandMenuProvider } from "@/components/layout/CommandMenuContext";
import { TerminalPreloader } from "@/components/preloader/TerminalPreloader";
import { Navbar } from "@/components/layout/Navbar";
import { CommandMenu } from "@/components/layout/CommandMenu";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <ToastProvider>
        <CommandMenuProvider>
          <TerminalPreloader />
          <Navbar />
          <CommandMenu />
          {children}
        </CommandMenuProvider>
      </ToastProvider>
    </SmoothScroll>
  );
}
