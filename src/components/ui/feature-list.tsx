import { cn } from "@/lib/utils";
import { Text } from "./text";

const markerChar = { dash: "—", check: "✓" } as const;

type FeatureListProps = {
  items: string[];
  marker?: keyof typeof markerChar;
  tone?: "primary" | "faint";
  className?: string;
};

export function FeatureList({
  items,
  marker = "dash",
  tone = "primary",
  className,
}: FeatureListProps) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2.5">
          <Text as="span" size="xs" tone={tone} aria-hidden="true">
            {markerChar[marker]}
          </Text>
          <Text as="span" font="mono" size="xs" tone="subtle">
            {item}
          </Text>
        </li>
      ))}
    </ul>
  );
}
