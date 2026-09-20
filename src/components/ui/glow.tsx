import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const intensityClass = {
  soft: "bg-[radial-gradient(circle,rgba(53,212,130,0.16),rgba(53,212,130,0)_70%)] blur-[60px]",
  medium:
    "bg-[radial-gradient(circle,rgba(53,212,130,0.22),rgba(53,212,130,0)_70%)] blur-[70px]",
  strong:
    "bg-[radial-gradient(circle,rgba(53,212,130,0.28),rgba(53,212,130,0)_70%)] blur-[70px]",
} as const;

type GlowProps = ComponentProps<"div"> & {
  intensity?: keyof typeof intensityClass;
  pulse?: boolean;
};

export function Glow({
  intensity = "medium",
  pulse,
  className,
  ...props
}: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full",
        intensityClass[intensity],
        pulse && "animate-glow-pulse",
        className,
      )}
      {...props}
    />
  );
}
