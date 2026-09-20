import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const sizeClass = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3 py-1.5 text-xs",
} as const;

const shapeClass = {
  square: "rounded-[5px]",
  pill: "rounded-full",
} as const;

type TagProps = ComponentProps<"span"> & {
  active?: boolean;
  size?: keyof typeof sizeClass;
  shape?: keyof typeof shapeClass;
};

export function Tag({
  active,
  size = "md",
  shape = "square",
  className,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "border font-mono",
        sizeClass[size],
        shapeClass[shape],
        active
          ? "border-primary text-primary"
          : "border-border text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
