import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const toneClass = {
  default: "border-border",
  highlighted: "border-primary",
} as const;

type CardProps = ComponentProps<"div"> & {
  tone?: keyof typeof toneClass;
};

export function Card({ tone = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-[10px] border",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}
