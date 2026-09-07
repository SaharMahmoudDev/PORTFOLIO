"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

/**
 * Single client-side provider tree mounted once in the root layout.
 * Add new global providers here rather than nesting them in layout.tsx.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
      <Toaster />
    </ThemeProvider>
  );
}
