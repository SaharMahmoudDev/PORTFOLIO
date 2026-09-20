"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function subscribe() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

type ThemeToggleProps = {
  lightLabel?: string;
  darkLabel?: string;
  className?: string;
};

export function ThemeToggle({
  lightLabel = "Switch to light theme",
  darkLabel = "Switch to dark theme",
  className,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const base = cn(
    "inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent",
    className,
  );

  if (!mounted) {
    return <span className={base} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? lightLabel : darkLabel}
      className={base}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
