import { useTranslations } from "next-intl";
import { Button, Container, Tag, Text, Title } from "@/components/ui";
import { HeroBackdrop } from "./hero-backdrop";
import { PipelineCard } from "./pipeline-card";

const chips = ["React", "Next.js", "TypeScript", "Tailwind"];

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative -mt-16 overflow-hidden md:-mt-22">
      <HeroBackdrop />

      <Container className="relative z-10 grid gap-14 pt-28 pb-20 md:pt-33 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 lg:pt-42 lg:pb-28">
        <div className="flex flex-col items-start gap-6">
          <Text font="mono" size="xs" tone="primary">
            {t("eyebrow")}
          </Text>

          <Title as="h1" size="display" className="max-w-xl">
            {t("title")}
          </Title>

          <Text size="lg" className="max-w-130">
            {t("description")}
          </Text>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="/projects" variant="primary" size="md">
              {t("primaryCta")}
            </Button>
            <Button href="/contact" variant="secondary" size="md">
              {t("secondaryCta")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-6">
            {chips.map((chip) => (
              <Tag key={chip}>{chip}</Tag>
            ))}
            <Tag active>AI Automation</Tag>
          </div>
        </div>

        <PipelineCard />
      </Container>
    </section>
  );
}
