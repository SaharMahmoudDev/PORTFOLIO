import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";

const toneClass = {
  default: "",
  inverted: "bg-inverted",
} as const;

type SectionProps = ComponentProps<"section"> & {
  tone?: keyof typeof toneClass;
  divider?: boolean;
  contained?: boolean;
  reveal?: boolean;
  containerClassName?: string;
};

export function Section({
  tone = "default",
  divider = true,
  contained = true,
  reveal = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const content = contained ? (
    <Container className={containerClassName}>{children}</Container>
  ) : (
    children
  );

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
      {reveal ? <Reveal>{content}</Reveal> : content}
    </section>
  );
}
