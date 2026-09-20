import type { Ref } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLink,
  BracketCard,
  Dot,
  Placeholder,
  Tag,
  Text,
  Title,
} from "@/components/ui";

type ProjectCardProps = {
  ref?: Ref<HTMLDivElement>;
  variant: "featured" | "compact";
  url: string;
  name: string;
  outcome: string;
  screenshotLabel: string;
  ctaLabel: string;
  href: string;
  tags?: string[];
  onSelect?: () => void;
  selectLabel?: string;
};

export function ProjectCard({
  ref,
  variant,
  url,
  name,
  outcome,
  screenshotLabel,
  ctaLabel,
  href,
  tags,
  onSelect,
  selectLabel,
}: ProjectCardProps) {
  const featured = variant === "featured";
  const selectable = !featured && Boolean(onSelect);

  return (
    <BracketCard
      ref={ref}
      cornerSize={featured ? "lg" : "sm"}
      interactive={selectable}
      className={cn(featured ? "p-6 lg:row-span-2" : "p-4.5")}
    >
      {selectable && (
        <button
          type="button"
          onClick={onSelect}
          aria-label={selectLabel}
          className="focus-visible:outline-primary absolute inset-0 cursor-pointer rounded-sm focus-visible:outline-2"
        />
      )}

      <div className={cn(selectable && "pointer-events-none relative")}>
        <div
          className={cn(
            "flex items-center gap-2",
            featured ? "mb-3.5" : "mb-3",
          )}
        >
          <Dot tone="term-red" size={featured ? "sm" : "xs"} />
          <Dot tone="term-amber" size={featured ? "sm" : "xs"} />
          <Dot tone="term-grey" size={featured ? "sm" : "xs"} />
          <Text
            as="span"
            font="mono"
            size="2xs"
            tone="faint"
            className="ms-1.5 truncate"
          >
            {url}
          </Text>
        </div>

        <Placeholder
          label={screenshotLabel}
          className={featured ? "mb-5 h-56 sm:h-80" : "mb-3.5 h-32"}
        />

        <Title as="h3" size={featured ? "md" : "sm"} className="mb-2.5">
          {name}
        </Title>
        <Text
          size={featured ? "sm" : "xs"}
          tone="muted"
          className={cn("mb-3.5", featured && "max-w-115")}
        >
          {outcome}
        </Text>

        {tags && (
          <div className="mb-3.5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <ArrowLink
          href={href}
          size={featured ? "sm" : "xs"}
          className={cn(selectable && "pointer-events-auto")}
        >
          {ctaLabel}
        </ArrowLink>
      </div>
    </BracketCard>
  );
}
