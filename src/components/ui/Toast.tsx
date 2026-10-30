"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type?: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-24 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] px-5 py-2.5 shadow-2xl backdrop-blur-xl text-[var(--foreground)]"
            >
              {toast.type === "success" && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
              )}
              {toast.type === "info" && (
                <Info className="h-4 w-4 text-blue-500 shrink-0" />
              )}
              <span className="font-mono text-xs text-[var(--foreground)]">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                aria-label="Close notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
