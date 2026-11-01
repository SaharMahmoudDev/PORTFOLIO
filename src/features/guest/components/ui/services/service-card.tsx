import type { LucideIcon } from "lucide-react";
import {
  BracketCard,
  FeatureList,
  IconBox,
  Tag,
  Text,
  Title,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  icon: LucideIcon;
  index: string;
  title: string;
  description: string;
  points: string[];
  tags: string[];
  highlight?: boolean;
};

export function ServiceCard({
  icon: Icon,
  index,
  title,
  description,
  points,
  tags,
  highlight,
}: ServiceCardProps) {
  return (
    <BracketCard
      tone={highlight ? "primary" : "default"}
      className={cn(
        "p-8.5",
        highlight && "border-primary rounded-[2px] border",
      )}
    >
      <IconBox tone={highlight ? "primary" : "default"} className="mb-5.5">
        <Icon size={20} aria-hidden="true" />
      </IconBox>
      <Text
        as="span"
        font="mono"
        size="xs"
        tone={highlight ? "primary" : "faint"}
      >
        {index}
      </Text>
      <Title as="h3" size="md" className="mt-1.5 mb-2.5">
        {title}
      </Title>
      <Text size="sm" tone="muted" className="mb-5">
        {description}
      </Text>

      <FeatureList items={points} className="mb-5.5" />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Tag key={tag} size="sm" active={highlight && i === 0}>
            {tag}
          </Tag>
        ))}
      </div>
    </BracketCard>
  );
}
