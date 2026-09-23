import { useTranslations } from "next-intl";
import {
  ArrowLink,
  Badge,
  BracketCard,
  Button,
  Container,
  Reveal,
  Text,
  Title,
} from "@/components/ui";
import type { ProjectItem } from "../../../data/projects";
import { ProjectImage } from "../home/project-image";

type CaseStudyHeaderProps = {
  project: ProjectItem;
};

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  const t = useTranslations("caseStudy.header");
  const tp = useTranslations("projects");
  const ti = useTranslations(`caseStudy.items.${project.key}`);

  const meta = [
    { key: "role", value: ti("meta.role") },
    { key: "timeline", value: ti("meta.timeline") },
    { key: "year", value: project.year },
  ];

  return (
    <Reveal>
      <Container className="pt-10 pb-14 lg:pt-14">
        <ArrowLink href="/projects" direction="back" className="mb-7">
          {t("back")}
        </ArrowLink>

        <div className="flex max-w-190 flex-col items-start gap-4.5">
          <div className="flex items-center gap-3">
            <Text
              as="span"
              font="mono"
              size="2xs"
              tone="faint"
              className="tracking-wider uppercase"
            >
              {tp(`categories.${project.category}`)}
            </Text>
            <Badge
              size="sm"
              tone={project.status === "live" ? "primary" : "muted"}
            >
              {tp(`status.${project.status}`)}
            </Badge>
            <Text as="span" font="mono" size="2xs" tone="faint">
              {project.year}
            </Text>
          </div>
          <Title as="h1" size="xl">
            {project.name}
          </Title>
          <Text size="lg" tone="muted" className="max-w-150">
            {tp(`items.${project.key}.outcome`)}
          </Text>
          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <Button
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("liveDemo")}
            </Button>
            <Button
              href={project.repoUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("source")}
            </Button>
          </div>
        </div>

        <dl className="border-hairline mt-14 grid border-y md:grid-cols-3">
          {meta.map((item) => (
            <div
              key={item.key}
              className="border-hairline px-0 py-6 not-first:border-t md:not-first:border-s md:not-first:border-t-0 md:not-first:ps-7"
            >
              <Text
                as="dt"
                font="mono"
                size="2xs"
                tone="faint"
                className="mb-2 tracking-wider uppercase"
              >
                {t(item.key)}
              </Text>
              <Text as="dd" tone="default">
                {item.value}
              </Text>
            </div>
          ))}
        </dl>

        <BracketCard cornerSize="lg" className="mt-14 p-5">
          <ProjectImage
            image={project.image}
            alt={project.name}
            className="h-64 sm:h-96 lg:h-130"
          />
        </BracketCard>
      </Container>
    </Reveal>
  );
}
