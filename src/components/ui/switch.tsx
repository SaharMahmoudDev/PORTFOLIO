import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type" | "role">) {
  return (
    <input
      type="checkbox"
      role="switch"
      className={cn(
        "border-border-strong bg-secondary checked:border-primary checked:bg-primary focus-visible:outline-primary relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full border transition-colors focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50",
        "before:bg-foreground before:absolute before:start-0.5 before:top-0.5 before:size-4.5 before:rounded-full before:transition-transform before:content-[''] checked:before:translate-x-5 rtl:checked:before:-translate-x-5",
        className,
      )}
      {...props}
    />
  );
}
