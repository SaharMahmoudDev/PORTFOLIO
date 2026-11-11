"use client";

import { ArrowUp } from "lucide-react";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

type ScrollToTopProps = {
  label: string;
  className?: string;
};

export function ScrollToTop({ label, className }: ScrollToTopProps) {
  const visible = useScrolled(600);

  const scrollToTop = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label={label}
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "border-border-strong bg-card text-foreground hover:border-primary hover:text-primary fixed inset-e-5 bottom-5 z-40 inline-flex size-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
        className,
      )}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
