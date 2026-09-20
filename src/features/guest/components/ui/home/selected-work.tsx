import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Section } from "@/components/ui";
import { ProjectShowcase } from "./project-showcase";

const projects = [
  { key: "featured", tags: ["Next.js", "TypeScript"] },
  { key: "leads" },
  { key: "booking" },
] as const;

export function SelectedWork() {
  const t = useTranslations("home.selectedWork");

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        className="mb-14"
      />

      <ProjectShowcase
        projects={projects.map((project) => ({
          key: project.key,
          url: t(`projects.${project.key}.url`),
          name: t("projectName"),
          outcome: t(`projects.${project.key}.outcome`),
          selectLabel: t("select", { name: t(`projects.${project.key}.url`) }),
          tags: "tags" in project ? [...project.tags] : undefined,
        }))}
        screenshotLabel={t("screenshot")}
        ctaLabel={t("viewCaseStudy")}
        href="/projects"
      />
    </Section>
  );
}
