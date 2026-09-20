import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "text-foreground placeholder:text-fg-faint min-w-0 bg-transparent font-mono text-[13px] focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
