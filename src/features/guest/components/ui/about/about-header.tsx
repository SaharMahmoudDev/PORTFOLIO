import { useTranslations } from "next-intl";
import {
  BracketCard,
  Container,
  Glow,
  Monogram,
  Reveal,
  Text,
  Title,
} from "@/components/ui";

export function AboutHeader() {
  const t = useTranslations("about.header");

  return (
    <Reveal>
      <Container className="grid gap-12 pt-12 pb-16 md:pt-16 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:pt-24 lg:pb-24">
        <div className="flex flex-col items-start gap-5.5">
          <Text font="mono" size="xs" tone="primary">
            {t("eyebrow")}
          </Text>

          <Title as="h1" size="display">
            {t("title")}
          </Title>

          <Text size="lg" className="max-w-130">
            {t("description")}
          </Text>

          <Text
            as="div"
            font="mono"
            size="xs"
            tone="muted"
            className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1"
          >
            <span>{t("location")}</span>
            <Text as="span" size="xs" tone="faint">
              ·
            </Text>
            <span>{t("experience")}</span>
            <Text as="span" size="xs" tone="faint">
              ·
            </Text>
            <Text as="span" font="mono" size="xs" tone="primary">
              {t("availability")}
            </Text>
          </Text>
        </div>

        <div className="relative self-start">
          <Glow intensity="medium" pulse className="-end-10 -top-8 size-85" />
          <BracketCard cornerSize="lg" className="p-5">
            <Monogram
              initials={t("initials")}
              label={t("title")}
              className="h-72 sm:h-96 lg:h-110"
            />
            <Text font="mono" size="xs" tone="faint" className="mt-3.5">
              {t("caption")}
            </Text>
          </BracketCard>
        </div>
      </Container>
    </Reveal>
  );
}
