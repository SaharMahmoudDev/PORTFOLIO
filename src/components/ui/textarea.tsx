import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./input";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        fieldBase,
        "border-border bg-card hover:border-border-strong focus:border-primary aria-invalid:border-term-amber min-h-40 w-full resize-y rounded-md border px-4 py-3 transition-colors",
        className,
      )}
      {...props}
    />
  );
}
