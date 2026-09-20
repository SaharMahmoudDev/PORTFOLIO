import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

const sizeClass = {
  xs: "text-sm",
  sm: "text-base sm:text-lg",
  md: "text-xl sm:text-2xl",
  lg: "text-3xl sm:text-[34px]",
  xl: "text-3xl sm:text-4xl lg:text-[40px]",
  display: "text-4xl sm:text-5xl lg:text-6xl",
} as const;

const toneClass = {
  default: "text-heading",
  inverted: "text-inverted-foreground",
} as const;

type TitleProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizeClass;
  tone?: keyof typeof toneClass;
} & Omit<ComponentProps<T>, "as">;

export function Title<T extends ElementType = "h2">({
  as,
  size = "lg",
  tone = "default",
  className,
  ...props
}: TitleProps<T>) {
  const Component = as ?? "h2";
  return (
    <Component
      className={cn(
        "font-display font-semibold",
        toneClass[tone],
        sizeClass[size],
        "leading-[1.08]",
        className,
      )}
      {...props}
    />
  );
}
