import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, Text, Title } from "@/components/ui";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  meta,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      {meta && <div className="mb-5">{meta}</div>}
      <Title as="h2" size="lg">
        {title}
      </Title>
      {description && (
        <Text className="mt-4 max-w-xl text-pretty">{description}</Text>
      )}
    </div>
  );
}
