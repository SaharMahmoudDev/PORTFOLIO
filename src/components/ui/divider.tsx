import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Divider({ className, ...props }: ComponentProps<"hr">) {
  return (
    <hr
      className={cn("bg-hairline h-px w-full border-0", className)}
      {...props}
    />
  );
}
