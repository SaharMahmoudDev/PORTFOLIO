import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = ComponentProps<"section"> & {
  divider?: boolean;
  contained?: boolean;
  containerClassName?: string;
};

export function Section({
  divider = true,
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-24 lg:py-28",
        divider && "border-hairline border-t",
        className,
      )}
      {...props}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
