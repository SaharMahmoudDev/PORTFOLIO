import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type TagProps = ComponentProps<"span"> & {
  active?: boolean;
};

export function Tag({ active, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "rounded-[5px] border px-3 py-1.5 font-mono text-xs",
        active
          ? "border-primary text-primary"
          : "border-border text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
