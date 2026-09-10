import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type BracketCardProps = ComponentProps<"div"> & {
  /** Corner bracket length. */
  cornerSize?: "sm" | "md" | "lg";
};

const cornerSizeMap = {
  sm: "size-5",
  md: "size-6",
  lg: "size-[26px]",
} as const;

/**
 * Signature canvas card: no full border, just L-shaped brackets at each corner.
 */
export function BracketCard({
  cornerSize = "md",
  className,
  children,
  ...props
}: BracketCardProps) {
  const corner = cornerSizeMap[cornerSize];
  const base = "pointer-events-none absolute border-border-strong";

  return (
    <div className={cn("relative", className)} {...props}>
      <span
        className={cn(base, corner, "start-0 top-0 border-s-2 border-t-2")}
      />
      <span className={cn(base, corner, "end-0 top-0 border-e-2 border-t-2")} />
      <span
        className={cn(base, corner, "start-0 bottom-0 border-s-2 border-b-2")}
      />
      <span
        className={cn(base, corner, "end-0 bottom-0 border-e-2 border-b-2")}
      />
      {children}
    </div>
  );
}
