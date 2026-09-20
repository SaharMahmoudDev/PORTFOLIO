import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

const toneClass = {
  default: "",
  inverted: "bg-inverted",
} as const;

type SectionProps = ComponentProps<"section"> & {
  tone?: keyof typeof toneClass;
  divider?: boolean;
  contained?: boolean;
  containerClassName?: string;
};

export function Section({
  tone = "default",
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
        toneClass[tone],
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
