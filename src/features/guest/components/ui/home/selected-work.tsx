import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Section } from "@/components/ui";
import { ProjectCard } from "./project-card";

const projects = [
  { key: "featured", variant: "featured", tags: ["Next.js", "TypeScript"] },
  { key: "leads", variant: "compact" },
  { key: "booking", variant: "compact" },
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

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.key}
            variant={project.variant}
            url={t(`projects.${project.key}.url`)}
            name={t("projectName")}
            outcome={t(`projects.${project.key}.outcome`)}
            screenshotLabel={t("screenshot")}
            ctaLabel={t("viewCaseStudy")}
            href="/projects"
            tags={"tags" in project ? [...project.tags] : undefined}
          />
        ))}
      </div>
    </Section>
  );
}
