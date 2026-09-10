import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = ComponentProps<"section"> & {
  /** Hairline divider along the top edge (canvas default). */
  divider?: boolean;
  /** Constrain and pad the children with <Container>. Set false to bleed full-width. */
  contained?: boolean;
  containerClassName?: string;
};

/**
 * Vertical page section with the canvas rhythm (~100px block padding) and an
 * optional hairline top border separating it from the section above.
 */
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
