import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type MonogramProps = ComponentProps<"div"> & {
  initials: string;
  label: string;
};

export function Monogram({
  initials,
  label,
  className,
  ...props
}: MonogramProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[var(--card)]",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--border-strong)_70%,transparent)_1px,transparent_1px)] [background-size:20px_20px] opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute size-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_26%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="border-primary/35 relative flex size-36 items-center justify-center rounded-full border bg-[color-mix(in_oklab,var(--card)_88%,var(--primary)_12%)] sm:size-44">
        <span
          aria-hidden="true"
          className="border-border-strong/50 absolute inset-2.5 rounded-full border border-dashed"
        />
        <span
          aria-hidden="true"
          dir="ltr"
          className="font-display text-primary text-5xl font-semibold tracking-tight sm:text-6xl"
        >
          {initials}
        </span>
        <span
          aria-hidden="true"
          className="bg-primary ring-card absolute end-1.5 bottom-1.5 size-4 rounded-full ring-4"
        />
      </div>
    </div>
  );
}
