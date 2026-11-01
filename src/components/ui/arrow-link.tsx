import type { ComponentProps } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Text } from "./text";

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, "as"> & {
  size?: "xs" | "sm";
  direction?: "forward" | "back";
};

export function ArrowLink({
  size = "sm",
  direction = "forward",
  className,
  children,
  ...props
}: ArrowLinkProps) {
  const back = direction === "back";
  const arrow = "text-primary size-3.5 rtl:-scale-x-100";
  const Icon = back ? ArrowLeft : ArrowRight;

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
      {back && <Icon className={arrow} aria-hidden="true" />}
      {children}
      {!back && <Icon className={arrow} aria-hidden="true" />}
    </Text>
  );
}
