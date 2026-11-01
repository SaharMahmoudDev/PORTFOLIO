import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Dot } from "./dot";

const variantClass = {
  pill: "gap-2 rounded-full px-3 py-1.5 text-link",
  card: "gap-2.5 rounded-lg bg-card px-4 py-3 text-foreground",
  solid:
    "rounded-full border-primary bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground",
} as const;

const sizeClass = {
  md: "",
  sm: "gap-1.5 px-2.5 py-0.5 text-[10.5px]",
} as const;

const toneClass = {
  default: "",
  primary: "border-primary text-primary",
  muted: "border-term-grey text-muted-foreground",
} as const;

type BadgeProps = ComponentProps<"span"> & {
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
  tone?: keyof typeof toneClass;
  dot?: boolean;
};

export function Badge({
  variant = "pill",
  size = "md",
  tone = "default",
  dot = true,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "border-border inline-flex items-center border font-mono text-xs",
        variantClass[variant],
        sizeClass[size],
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <Dot
          size={variant === "card" ? "sm" : "xs"}
          tone={tone === "muted" ? "term-grey" : "primary"}
        />
      )}
      {children}
    </span>
  );
}
