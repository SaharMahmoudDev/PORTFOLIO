import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const toneClass = {
  default: "border-border-strong",
  primary: "border-primary",
} as const;

type IconBoxProps = ComponentProps<"span"> & {
  tone?: keyof typeof toneClass;
};

export function IconBox({
  tone = "default",
  className,
  children,
  ...props
}: IconBoxProps) {
  return (
    <span
      className={cn(
        "bg-card text-primary flex size-11.5 items-center justify-center rounded-[10px] border",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
