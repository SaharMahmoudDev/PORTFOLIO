import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

const toneClass = {
  default: "text-foreground",
  subtle: "text-fg-subtle",
  muted: "text-muted-foreground",
  faint: "text-fg-faint",
  link: "text-link",
  primary: "text-primary",
  "term-amber": "text-term-amber",
  inverted: "text-inverted-foreground",
  "inverted-muted": "text-inverted-muted",
} as const;

const sizeClass = {
  "2xs": "text-[11px]",
  xs: "text-[13px]",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
} as const;

const fontClass = {
  sans: "font-sans",
  mono: "font-mono",
} as const;

type TextProps<T extends ElementType> = {
  as?: T;
  tone?: keyof typeof toneClass;
  size?: keyof typeof sizeClass;
  font?: keyof typeof fontClass;
} & Omit<ComponentProps<T>, "as">;

export function Text<T extends ElementType = "p">({
  as,
  tone = "subtle",
  size = "base",
  font = "sans",
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? "p";
  return (
    <Component
      className={cn(
        "leading-relaxed",
        toneClass[tone],
        sizeClass[size],
        fontClass[font],
        className,
      )}
      {...props}
    />
  );
}
