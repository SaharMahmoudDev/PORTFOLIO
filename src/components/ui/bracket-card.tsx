import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type BracketCardProps = ComponentProps<"div"> & {
  cornerSize?: "sm" | "md" | "lg";
  interactive?: boolean;
};

const cornerSizeMap = {
  sm: "size-5",
  md: "size-6",
  lg: "size-[26px]",
} as const;

export function BracketCard({
  cornerSize = "md",
  interactive,
  className,
  children,
  ...props
}: BracketCardProps) {
  const corner = cornerSizeMap[cornerSize];
  const base = cn(
    "pointer-events-none absolute border-border-strong",
    interactive &&
      "transition-colors duration-300 group-hover/bracket:border-primary",
  );

  return (
    <div
      className={cn("relative", interactive && "group/bracket", className)}
      {...props}
    >
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
