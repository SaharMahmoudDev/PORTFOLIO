import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Section } from "@/components/ui";
import { projects } from "../../../data/projects";
import { ProjectShowcase } from "./project-showcase";

const featuredKeys = ["real-estate-hub", "user-dashboard", "dolistix"] as const;

export function SelectedWork() {
  const t = useTranslations("home.selectedWork");
  const tp = useTranslations("projects");

  const featured = featuredKeys
    .map((key) => projects.find((project) => project.key === key))
    .filter((project) => project !== undefined);

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        className="mb-14"
      />

      <ProjectShowcase
        projects={featured.map((project) => ({
          key: project.key,
          url: project.url,
          name: project.name,
          outcome: tp(`items.${project.key}.outcome`),
          selectLabel: t("select", { name: project.name }),
          href: `/projects/${project.key}`,
          tags: project.tags,
          image: project.image,
        }))}
        screenshotLabel={t("screenshot")}
        ctaLabel={t("viewCaseStudy")}
      />
    </Section>
  );
}
