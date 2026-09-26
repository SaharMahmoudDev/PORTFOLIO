import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";

type MonogramProps = ComponentProps<"div"> & {
  initials: string;
  label: string;
};

export function Monogram({
  initials,
  label,
  className,
  ...props
}: MonogramProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_65%),repeating-linear-gradient(135deg,var(--secondary)_0_10px,var(--card)_10px_20px)]",
        className,
      )}
      {...props}
    >
      <Text
        as="span"
        font="mono"
        size="xs"
        tone="faint"
        className="absolute start-4 top-4"
      >
        {"</>"}
      </Text>
      <Text
        as="span"
        font="mono"
        size="xs"
        tone="faint"
        className="absolute end-4 bottom-4"
      >
        {"_"}
      </Text>
      <span
        aria-hidden="true"
        dir="ltr"
        className="font-display text-primary text-8xl font-semibold tracking-tight sm:text-9xl"
      >
        {initials}
      </span>
    </div>
  );
}
