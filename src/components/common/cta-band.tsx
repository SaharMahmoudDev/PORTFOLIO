import { Button, Section, Text, Title } from "@/components/ui";

type CtaBandProps = {
  title: string;
  description: string;
  cta: string;
  email: string;
  href?: string;
};

export function CtaBand({
  title,
  description,
  cta,
  email,
  href = "/contact",
}: CtaBandProps) {
  return (
    <Section
      tone="inverted"
      divider={false}
      containerClassName="flex flex-col items-start gap-7"
    >
      <Title as="h2" size="xl" tone="inverted" className="max-w-160">
        {title}
      </Title>
      <Text size="lg" tone="inverted-muted" className="max-w-130">
        {description}
      </Text>
      <div className="flex flex-wrap items-center gap-4">
        <Button href={href} variant="inverted">
          {cta}
        </Button>
        <Text as="span" font="mono" size="sm" tone="inverted-muted">
          {email}
        </Text>
      </div>
    </Section>
  );
}
