import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = ComponentProps<"div"> & {
  /** The `//` prefix marker from the canvas. Set false to drop it. */
  marker?: boolean;
};

/**
 * Mono section label, e.g. `// selected-work`, with an accent-coloured marker.
 */
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
