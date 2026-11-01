import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variantClass = {
  bare: "",
  field:
    "border-border bg-card hover:border-border-strong focus:border-primary aria-invalid:border-term-amber w-full rounded-md border px-4 py-3 transition-colors",
} as const;

type InputProps = ComponentProps<"input"> & {
  variant?: keyof typeof variantClass;
};

export const fieldBase =
  "text-foreground placeholder:text-fg-faint min-w-0 bg-transparent font-mono text-[13px] focus:outline-none";

export function Input({ variant = "bare", className, ...props }: InputProps) {
  return (
    <input
      className={cn(fieldBase, variantClass[variant], className)}
      {...props}
    />
  );
}
