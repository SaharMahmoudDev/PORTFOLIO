import { useTranslations } from "next-intl";
import {
  BracketCard,
  Container,
  FeatureList,
  Reveal,
  Tag,
  Text,
} from "@/components/ui";
import type { PublicProject } from "../../../data/projects";
import { ProjectImage } from "../home/project-image";
import { CaseStudyBlock } from "./case-study-block";
import { CaseStudyPoint } from "./case-study-point";

type CaseStudyBodyProps = {
  project: PublicProject;
};

export function CaseStudyBody({ project }: CaseStudyBodyProps) {
  const t = useTranslations("caseStudy.body");
  const { goals, approach, features, implementation } = project;

  return (
    <Container className="pb-20 lg:pb-28">
      <div className="max-w-205">
        <CaseStudyBlock
          eyebrow={t("overview.eyebrow")}
          title={t("overview.title")}
        >
          <Text className="leading-8">{project.overview}</Text>
        </CaseStudyBlock>

        <CaseStudyBlock
          eyebrow={t("problem.eyebrow")}
          title={t("problem.title")}
        >
          <Text className="leading-8">{project.problem}</Text>
        </CaseStudyBlock>

        <CaseStudyBlock eyebrow={t("goals.eyebrow")} title={t("goals.title")}>
          <FeatureList items={goals} marker="check" />
        </CaseStudyBlock>

        <CaseStudyBlock
          eyebrow={t("approach.eyebrow")}
          title={t("approach.title")}
        >
          <div className="flex flex-col gap-6.5">
            {approach.map((step) => (
              <CaseStudyPoint key={step.title} tone="muted" {...step} />
            ))}
          </div>
        </CaseStudyBlock>

        <CaseStudyBlock
          eyebrow={t("features.eyebrow")}
          title={t("features.title")}
        >
          <ol className="border-hairline border-y">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                className="border-hairline flex items-start gap-6 py-6.5 not-first:border-t"
              >
                <Text
                  as="span"
                  font="mono"
                  size="xs"
                  tone="faint"
                  className="w-6 shrink-0 pt-0.5"
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <CaseStudyPoint tone="muted" {...feature} />
              </li>
            ))}
          </ol>
        </CaseStudyBlock>

        <CaseStudyBlock eyebrow={t("design.eyebrow")} title={t("design.title")}>
          <CaseStudyPoint
            title={project.design.pointTitle}
            text={project.design.pointText}
          />
        </CaseStudyBlock>

        <CaseStudyBlock
          eyebrow={t("implementation.eyebrow")}
          title={t("implementation.title")}
        >
          <div className="mb-7 flex flex-col gap-6.5">
            {implementation.map((step) => (
              <CaseStudyPoint key={step.title} tone="muted" {...step} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        </CaseStudyBlock>

        <CaseStudyBlock
          eyebrow={t("challenges.eyebrow")}
          title={t("challenges.title")}
        >
          <CaseStudyPoint
            title={project.challenges.pointTitle}
            text={project.challenges.pointText}
          />
        </CaseStudyBlock>

        <Reveal>
          <div className="border-hairline border-t pt-14">
            <BracketCard cornerSize="md" className="p-4">
              <ProjectImage
                image={project.image}
                alt={project.name}
                className="h-56 sm:h-85"
              />
            </BracketCard>
            <Text font="mono" size="2xs" tone="faint" className="mt-3.5">
              {project.detail.caption}
            </Text>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
