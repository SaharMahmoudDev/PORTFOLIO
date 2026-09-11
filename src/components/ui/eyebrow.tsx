import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";

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
    <Text
      as="div"
      font="mono"
      size="xs"
      tone="faint"
      className={cn("tracking-tight", className)}
      {...props}
    >
      {marker && <span className="text-primary">{"// "}</span>}
      {children}
    </Text>
  );
}
