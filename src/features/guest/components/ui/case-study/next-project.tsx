import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container, Reveal, Text, Title } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import type { ProjectItem } from "../../../data/projects";

type NextProjectProps = {
  project: ProjectItem;
};

export function NextProject({ project }: NextProjectProps) {
  const t = useTranslations("caseStudy.next");

  return (
    <Reveal>
      <Container className="pb-20 lg:pb-28">
        <Link
          href={`/projects/${project.key}`}
          className="border-hairline hover:border-primary group flex items-center justify-between gap-6 rounded-[10px] border px-6 py-8 transition-colors sm:px-10 sm:py-9"
        >
          <div>
            <Text
              font="mono"
              size="2xs"
              tone="faint"
              className="mb-2 tracking-wider uppercase"
            >
              {t("label")}
            </Text>
            <Title as="p" size="md">
              {project.name}
            </Title>
          </div>
          <ArrowRight
            className="text-primary size-6 shrink-0 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </Container>
    </Reveal>
  );
}
