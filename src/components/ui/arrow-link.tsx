import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Text } from "./text";

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, "as"> & {
  size?: "xs" | "sm";
};

export function ArrowLink({
  size = "sm",
  className,
  children,
  ...props
}: ArrowLinkProps) {
  return (
    <Text
      as={Link}
      font="mono"
      size={size}
      tone="link"
      className={cn(
        "hover:text-foreground inline-flex items-center gap-1.5 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight
        className="text-primary size-3.5 rtl:-scale-x-100"
        aria-hidden="true"
      />
    </Text>
  );
}
