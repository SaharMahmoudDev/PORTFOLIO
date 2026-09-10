import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = ComponentProps<"div"> & {
  marker?: boolean;
};

export function Eyebrow({
  marker = true,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "text-fg-faint font-mono text-[13px] tracking-tight",
        className,
      )}
      {...props}
    >
      {marker && <span className="text-primary">{"// "}</span>}
      {children}
    </div>
  );
}
