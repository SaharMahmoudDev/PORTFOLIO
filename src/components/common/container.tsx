import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentProps<T>;

/**
 * Horizontal layout frame. Caps content at the 1440px artboard width and
 * applies the canvas side padding (96px at desktop), scaled down on smaller
 * viewports.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16 xl:px-24",
        className,
      )}
      {...props}
    />
  );
}
