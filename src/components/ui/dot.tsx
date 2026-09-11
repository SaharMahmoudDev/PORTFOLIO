import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "term-red" | "term-amber" | "term-grey";
type Variant = "filled" | "ring";
type Size = "sm" | "md";

const fillClass: Record<Tone, string> = {
  primary: "bg-primary",
  "term-red": "bg-term-red",
  "term-amber": "bg-term-amber",
  "term-grey": "bg-term-grey",
};

const ringClass: Record<Tone, string> = {
  primary: "border-primary",
  "term-red": "border-term-red",
  "term-amber": "border-term-amber",
  "term-grey": "border-term-grey",
};

const sizeClass: Record<Size, string> = {
  sm: "size-2.5",
  md: "size-3",
};

type DotProps = ComponentProps<"span"> & {
  tone?: Tone;
  variant?: Variant;
  size?: Size;
};

export function Dot({
  tone = "primary",
  variant = "filled",
  size = "sm",
  className,
  ...props
}: DotProps) {
  return (
    <span
      className={cn(
        "inline-block shrink-0 rounded-full",
        sizeClass[size],
        variant === "filled"
          ? fillClass[tone]
          : cn("border-2 bg-transparent", ringClass[tone]),
        className,
      )}
      {...props}
    />
  );
}
