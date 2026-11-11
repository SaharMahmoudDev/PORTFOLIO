import type { Ref } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLink,
  Badge,
  BracketCard,
  Dot,
  Placeholder,
  Tag,
  Text,
  Title,
} from "@/components/ui";
import type { ProjectImage as ProjectImageType } from "../../../data/projects";
import { ProjectImage } from "./project-image";

type ProjectCardProps = {
  ref?: Ref<HTMLDivElement>;
  variant: "featured" | "compact" | "grid";
  url: string;
  name: string;
  outcome: string;
  screenshotLabel: string;
  ctaLabel: string;
  href: string;
  tags?: string[];
  category?: string;
  status?: { label: string; tone: "primary" | "muted" };
  onSelect?: () => void;
  selectLabel?: string;
  image?: ProjectImageType;
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
  category,
  status,
  onSelect,
  selectLabel,
  image,
}: ProjectCardProps) {
  const featured = variant === "featured";
  const large = featured || variant === "grid";
  const selectable = variant === "compact" && Boolean(onSelect);

  return (
    <BracketCard
      ref={ref}
      cornerSize={featured ? "lg" : variant === "grid" ? "md" : "sm"}
      interactive={selectable}
      className={cn(
        "min-w-0",
        featured && "p-6 lg:row-span-2",
        variant === "grid" && "p-6",
        variant === "compact" && "p-4.5",
      )}
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
          className={cn("flex items-center gap-2", large ? "mb-3.5" : "mb-3")}
        >
          <Dot tone="term-red" size={large ? "sm" : "xs"} />
          <Dot tone="term-amber" size={large ? "sm" : "xs"} />
          <Dot tone="term-grey" size={large ? "sm" : "xs"} />
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

        {image ? (
          <ProjectImage
            image={image}
            alt={name}
            className={cn(
              large ? "mb-5" : "mb-3.5",
              featured && "h-56 sm:h-80",
              variant === "grid" && "h-44 sm:h-55",
              variant === "compact" && "h-32",
            )}
          />
        ) : (
          <Placeholder
            label={screenshotLabel}
            className={cn(
              large ? "mb-5" : "mb-3.5",
              featured && "h-56 sm:h-80",
              variant === "grid" && "h-44 sm:h-55",
              variant === "compact" && "h-32",
            )}
          />
        )}

        {category && status && (
          <div className="mb-3 flex items-center gap-2.5">
            <Text
              as="span"
              font="mono"
              size="2xs"
              tone="faint"
              className="tracking-wider uppercase"
            >
              {category}
            </Text>
            <Badge size="sm" tone={status.tone}>
              {status.label}
            </Badge>
          </div>
        )}

        <Title as="h3" size={large ? "md" : "sm"} className="mb-2.5">
          {name}
        </Title>
        <Text
          size={large ? "sm" : "xs"}
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
          size={large ? "sm" : "xs"}
          className={cn(selectable && "pointer-events-auto")}
        >
          {ctaLabel}
        </ArrowLink>
      </div>
    </BracketCard>
  );
}
