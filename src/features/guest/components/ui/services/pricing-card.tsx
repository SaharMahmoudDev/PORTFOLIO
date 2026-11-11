import { cn } from "@/lib/utils";
import { Badge, Button, Card, FeatureList, Text, Title } from "@/components/ui";

type PricingCardProps = {
  label: string;
  price: string;
  priceHint: string;
  description: string;
  points: string[];
  cta: string;
  href: string;
  highlight?: boolean;
  badge?: string;
};

export function PricingCard({
  label,
  price,
  priceHint,
  description,
  points,
  cta,
  href,
  highlight,
  badge,
}: PricingCardProps) {
  return (
    <Card
      tone={highlight ? "highlighted" : "default"}
      className={cn("relative flex flex-col p-8")}
    >
      {badge && (
        <Badge
          variant="solid"
          dot={false}
          className="absolute inset-s-8 -top-3"
        >
          {badge}
        </Badge>
      )}

      <Text
        as="span"
        font="mono"
        size="xs"
        tone={highlight ? "muted" : "faint"}
        className="mb-3.5 tracking-wide"
      >
        {label}
      </Text>

      <div className="mb-3.5 flex items-baseline gap-1.5">
        <Title as="span" size="lg">
          {price}
        </Title>
        <Text as="span" font="mono" size="xs" tone="faint">
          {priceHint}
        </Text>
      </div>

      <Text size="sm" tone="muted" className="mb-6">
        {description}
      </Text>

      <FeatureList
        items={points}
        marker="check"
        tone={highlight ? "primary" : "faint"}
        className="mb-7"
      />

      <Button
        href={href}
        variant={highlight ? "primary" : "secondary"}
        className="mt-auto w-full"
      >
        {cta}
      </Button>
    </Card>
  );
}
