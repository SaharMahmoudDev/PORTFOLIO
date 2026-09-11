import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

const sizeClass = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
  xl: "text-4xl sm:text-5xl lg:text-6xl",
} as const;

type TitleSize = keyof typeof sizeClass;

type TitleProps<T extends ElementType> = {
  as?: T;
  size?: TitleSize;
} & Omit<ComponentProps<T>, "as">;

export function Title<T extends ElementType = "h2">({
  as,
  size = "lg",
  className,
  ...props
}: TitleProps<T>) {
  const Component = as ?? "h2";
  return (
    <Component
      className={cn(
        "font-display text-heading leading-[1.08] font-semibold",
        sizeClass[size],
        className,
      )}
      {...props}
    />
  );
}
