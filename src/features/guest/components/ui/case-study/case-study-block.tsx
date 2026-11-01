import type { ReactNode } from "react";
import { Eyebrow, Reveal, Title } from "@/components/ui";

type CaseStudyBlockProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function CaseStudyBlock({
  eyebrow,
  title,
  children,
}: CaseStudyBlockProps) {
  return (
    <Reveal>
      <div className="border-hairline border-t py-14">
        <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
        <Title as="h2" size="md" className="mb-6">
          {title}
        </Title>
        {children}
      </div>
    </Reveal>
  );
}
