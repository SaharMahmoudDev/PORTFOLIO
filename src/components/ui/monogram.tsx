import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type MonogramProps = ComponentProps<"div"> & {
  initials: string;
  label: string;
  orbitText: string;
};

export function Monogram({
  initials,
  label,
  orbitText,
  className,
  ...props
}: MonogramProps) {
  const loop = Array.from({ length: 3 }, () => orbitText).join("   •   ");

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-(--card)",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--border-strong)_70%,transparent)_1px,transparent_1px)] bg-size-[20px_20px] opacity-60"
      />
      <div
        aria-hidden="true"
        className="md:animate-glow-pulse absolute size-44 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_26%,transparent),transparent_70%)] blur-2xl motion-reduce:animate-none sm:size-52"
      />

      <div className="relative size-40 sm:size-48">
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          direction="ltr"
          className="animate-orbit absolute inset-0 size-full motion-reduce:animate-none"
          style={{ transformOrigin: "100px 100px" }}
        >
          <path
            id="monogram-orbit-path"
            fill="none"
            d="M 100,12 a 88,88 0 1,1 0,176 a 88,88 0 1,1 0,-176"
          />
          <text
            className="fill-primary/70 font-mono"
            fontSize="9.5"
            letterSpacing="1.5"
          >
            <textPath href="#monogram-orbit-path" startOffset="0%">
              {loop}
            </textPath>
          </text>
        </svg>

        <div
          aria-hidden="true"
          className="animate-orbit-reverse absolute inset-0 motion-reduce:animate-none"
        >
          <span className="bg-primary absolute inset-s-1/2 top-1 size-2 -translate-x-1/2 rounded-full shadow-[0_0_10px_2px_rgba(53,212,130,0.55)]" />
        </div>

        <div className="border-primary/35 absolute inset-8 flex items-center justify-center rounded-full border bg-[color-mix(in_oklab,var(--card)_88%,var(--primary)_12%)] sm:inset-9">
          <span
            dir="ltr"
            className="font-display text-primary flex items-baseline text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {initials}
            <span
              aria-hidden="true"
              className="animate-caret ms-0.5 motion-reduce:animate-none"
            >
              _
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
