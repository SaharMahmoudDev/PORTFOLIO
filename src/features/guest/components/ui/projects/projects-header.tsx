import { useTranslations } from "next-intl";
import { Container, Reveal, Text, Title } from "@/components/ui";

export function ProjectsHeader() {
  const t = useTranslations("projects.header");

  return (
    <Reveal>
      <Container className="pt-12 pb-10 md:pt-16 lg:pt-24 lg:pb-16">
        <div className="flex max-w-190 flex-col items-start gap-5.5">
          <Text font="mono" size="xs" tone="primary">
            {t("eyebrow")}
          </Text>
          <Title as="h1" size="display">
            {t("title")}
          </Title>
          <Text size="lg" className="max-w-140">
            {t("description")}
          </Text>
        </div>
      </Container>
    </Reveal>
  );
}
