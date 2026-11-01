import { Text, Title } from "@/components/ui";

type CaseStudyPointProps = {
  title: string;
  text: string;
  tone?: "subtle" | "muted";
};

export function CaseStudyPoint({
  title,
  text,
  tone = "subtle",
}: CaseStudyPointProps) {
  return (
    <div>
      <Title as="h3" size="xs" className="mb-2">
        {title}
      </Title>
      <Text tone={tone} className="leading-8">
        {text}
      </Text>
    </div>
  );
}
