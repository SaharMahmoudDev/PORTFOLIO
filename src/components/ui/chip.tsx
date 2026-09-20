import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ChipProps = ComponentProps<"button"> & {
  active?: boolean;
  count?: number;
};

export function Chip({
  active,
  count,
  className,
  children,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.25 font-mono text-[12.5px] transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground font-medium"
          : "border-border text-link hover:border-primary hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn("text-[11px]", active ? "opacity-70" : "text-fg-faint")}
        >
          {count}
        </span>
      )}
    </button>
  );
}
