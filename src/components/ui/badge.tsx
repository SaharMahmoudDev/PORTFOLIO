import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Dot } from "./dot";

const variantClass = {
  pill: "gap-2 rounded-full px-3 py-1.5 text-link",
  card: "gap-2.5 rounded-lg bg-card px-4 py-3 text-foreground",
} as const;

type BadgeProps = ComponentProps<"span"> & {
  variant?: keyof typeof variantClass;
  dot?: boolean;
};

export function Badge({
  variant = "pill",
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
        className,
      )}
      {...props}
    >
      {dot && <Dot size={variant === "card" ? "sm" : "xs"} />}
      {children}
    </span>
  );
}
