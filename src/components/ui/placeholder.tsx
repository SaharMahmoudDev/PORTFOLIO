import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";

type PlaceholderProps = ComponentProps<"div"> & {
  label: string;
};

export function Placeholder({ label, className, ...props }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[repeating-linear-gradient(135deg,var(--secondary)_0_10px,var(--card)_10px_20px)]",
        className,
      )}
      {...props}
    >
      <Text as="span" font="mono" size="xs" tone="faint">
        {label}
      </Text>
    </div>
  );
}
